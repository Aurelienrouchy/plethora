export const getRandomBetween = (min: number, max: number): number  => Math.floor(Math.random() * (max - min) + min);

export const selectXNumberInArray = (numbers, max): number[] => {
    let arr = Array(numbers).fill(0).map((n, index) => index);
    let selected = [];
    for (let i = 0; i < max; i++) {
        const randomIndex = getRandomBetween(0, arr.length);
        selected = [...selected, arr[randomIndex]];
        arr = [...arr.filter(n => n !== arr[randomIndex])]
    }
    return selected
}