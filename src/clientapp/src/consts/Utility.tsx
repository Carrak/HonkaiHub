export const getNum = (prev: number | null, input: string, min?: number, max?: number): number | null => {
    if (input === "")
        return null;

    let num: number = parseInt(input);
    if (isNaN(num) || typeof min === 'undefined' || num < min) {
        console.log("returned prev " + prev)
        return prev;
    }

    if (typeof max !== 'undefined' && num > max)
        return max;

    return num;
}