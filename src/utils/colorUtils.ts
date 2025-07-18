// A curated set of beautiful, accessible colors for the quote cards
export const QUOTE_COLORS = [
    // Blue family
    '#99D5FF', // Blue
    '#E3F2FC', // Blue Light
    '#1A5580', // Blue Dark
    '#3DADFF', // Blue Strong

    // Green family
    '#B8FF99', // Green
    '#EBFCE3', // Green Light
    '#38801A', // Green Dark

    // Yellow family
    '#FFF59A', // Yellow
    '#FCFAE3', // Yellow Light
    '#80751A', // Yellow Dark

    // Mint family
    '#99FFE7', // Mint
    '#E3FCF7', // Mint Light
    '#1A8068', // Mint Dark
];

// Get a random color from the palette
export function getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * QUOTE_COLORS.length);
    return QUOTE_COLORS[randomIndex];
}

// Get a color by index (useful for consistent colors based on quote ID)
export function getColorByIndex(index: number): string {
    return QUOTE_COLORS[index % QUOTE_COLORS.length];
}

// Get a color by string hash (useful for consistent colors based on quote ID)
export function getColorByHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    const index = Math.abs(hash) % QUOTE_COLORS.length;
    return QUOTE_COLORS[index];
} 