export function generatorFrom<T extends unknown[]>(
  generator: (...args: T) => AsyncGenerator<string>
): (...args: T) => Promise<string> {
  return async (...args: T) => {
    const parts = [];

    for await (const part of generator(...args)) {
      parts.push(part);
    }

    return parts.join("");
  };
}
