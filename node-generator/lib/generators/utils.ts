import all from "it-all";

export function generatorFrom<T extends unknown[]>(
  generator: (...args: T) => AsyncGenerator<string>
): (...args: T) => Promise<string> {
  return async (...args: T) => {
    return (await all(generator(...args))).join();
  };
}
