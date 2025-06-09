import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getRandomQuote, Quote } from "@/lib/quote";

export default async function Home() {
  const quote: Quote = await getRandomQuote();

  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-2xl mb-8">
        <Image
          src="/fake-logo.png"
          alt="Quote background"
          width={600}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="w-full max-w-2xl flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <p className="text-xl text-center italic">
            "{quote.quote}"
          </p>
          {quote.author && (
            <p className="text-sm text-center mt-2 text-gray-600">
              — {quote.author}
            </p>
          )}
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </main>
  );
}
