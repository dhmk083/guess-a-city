export const random = (upper) => ~~(Math.random() * upper);

export const randomUniq = (count, arr) => {
  if (count > arr.length) return [];

  const indices: number[] = [];

  while (count) {
    const next = random(arr.length);
    if (!indices.includes(next)) {
      indices.push(next);
      count--;
    }
  }

  return indices.map((i) => arr[i]);
};
