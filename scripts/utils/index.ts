/**
 * Reduces the args from command line into an object
 */
export const reduceArgs = <T>(): T => process.argv.reduce(
  (a, c) => {
    const p = c.split(/:(.+)/);

    if (p.length > 1) {
      a[p[0]] = p[1]; // eslint-disable-line
    }

    return a;
  },
  {},
) as T;
