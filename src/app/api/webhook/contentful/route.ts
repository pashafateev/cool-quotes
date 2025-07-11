import { NextRequest, NextResponse } from 'next/server';
import { processContentfulWebhook } from '@/utils/contentfulWebhook';

export async function POST(request: NextRequest) {
    try {
        console.log('🔔 Webhook received!');
        console.log('Headers:', Object.fromEntries(request.headers.entries()));

        const body = await request.json();
        console.log('�� Webhook payload:', JSON.stringify(body, null, 2));

        // Process the webhook
        const result = await processContentfulWebhook(body);

        console.log('✅ Webhook processed:', result);

        return NextResponse.json({
            success: true,
            processed: result.processed,
            errors: result.errors
        });

    } catch (error) {
        console.error('❌ Webhook processing error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'Contentful webhook endpoint is running',
        timestamp: new Date().toISOString()
    });
}
