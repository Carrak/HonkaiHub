export const getNum = (prev: number | null, input: string, min?: number, max?: number): number | null => {
    if (input === "" || input === "-")
        return null;

    if (input.includes("-", 1) && prev) {
        const newVal = prev * -1;
        return typeof min !== 'undefined' && newVal < min ? prev : newVal;
    }

    let num: number = parseInt(input);
    if (isNaN(num)) {
        return prev;
    }

    if (typeof min !== 'undefined' && num < min)
        return min;

    if (typeof max !== 'undefined' && num > max)
        return max;

    return num;
}