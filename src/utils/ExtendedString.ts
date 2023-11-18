/* The ExtendedString class in TypeScript allows you to repeat a given string a specified number of
times. */
export class ExtendedString {
  private value = '';

  constructor(value: string) {
    this.value = value;
  }

  /**
   * The function repeats the value of a variable a specified number of times and returns the result.
   * @param [n=1] - The parameter `n` represents the number of times the value should be repeated.
   * @returns The value that is being returned is the result of adding the value of `this.value` to
   * itself `n` times.
   */
  repeat(n = 1) {
    let value = this.value;

    for (let i = 0; i < n; i++) {
      value += this.value;
    }

    return value;
  }
}
