export const getNum = (prev: number | null, input: string, min?: number, max?: number): number | null => {
    if (input === "" || input === "-")
        return null;

    if (input.includes("-", 1) && prev) 
            return prev * -1;

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