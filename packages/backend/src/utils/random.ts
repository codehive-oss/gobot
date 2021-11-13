export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomChoice(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}
