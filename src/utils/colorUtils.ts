// A curated set of beautiful, accessible colors for the quote cards
export const QUOTE_COLORS = [
    '#1A5580', // Blue Dark

    '#B8FF99', // Green
    '#EBFCE3', // Green Light
    '#38801A', // Green Dark

    '#FFF59A', // Yellow
    '#FCFAE3', // Yellow Light

    '#99FFE7', // Mint
    '#E3FCF7', // Mint Light
    '#1A8068', // Mint Dark
];

export function getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * QUOTE_COLORS.length);
    return QUOTE_COLORS[randomIndex];
}

export function getRandomColorAvoiding(avoidColor?: string): string {
    if (!avoidColor || QUOTE_COLORS.length <= 1) {
        return getRandomColor();
    }

    const availableColors = QUOTE_COLORS.filter(color => color !== avoidColor);
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
}