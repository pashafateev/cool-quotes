const isDebugMode = () => {
    return process.env.NEXT_PUBLIC_DEBUG_MODE === 'true' || process.env.NODE_ENV === 'development';
};

export const debugLog = (...args: unknown[]) => {
    if (isDebugMode()) {
        console.log(...args);
    }
};

export const debugError = (...args: unknown[]) => {
    if (isDebugMode()) {
        console.error(...args);
    }
};
