export function run<T = any>(promise: Promise<T>): Promise<[null, T] | [any, null?]> {
    return promise
      .then((data) => [null, data] as [null, T])
      .catch((err) => [err] as [any]);
  }