export const add = (a: number, b: number) => a + b
export const sum = (...arg: number[]) => arg.reduce(add)