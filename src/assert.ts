export function never(
  message = 'Unexpected condition',
): never {
  throw new Error(message);
}

export function assert(
  condition: unknown,
  message = 'Assertion failed',
): asserts condition {
  if (!condition) {
    never(message);
  }
}
