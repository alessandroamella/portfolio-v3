export function sumArrays(...arrays: [number, number][]): [number, number] {
  return arrays.reduce<[number, number]>(
    ([sumA, sumB], [a, b]) => [sumA + a, sumB + b],
    [0, 0],
  );
}
