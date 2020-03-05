import { StringOrNumber, ComparatorFn } from "./types";

export default class Comparator {
  private compare: ComparatorFn;

  constructor(public compareFunction?: ComparatorFn) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction(a: StringOrNumber, b: StringOrNumber) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  equal(a: StringOrNumber, b: StringOrNumber) {
    return this.compare(a, b) === 0;
  }

  lessThan(a: StringOrNumber, b: StringOrNumber) {
    return this.compare(a, b) < 0;
  }

  greaterThan(a: StringOrNumber, b: StringOrNumber) {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a: StringOrNumber, b: StringOrNumber) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a: StringOrNumber, b: StringOrNumber) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a: StringOrNumber, b: StringOrNumber) =>
      compareOriginal(b, a);
  }
}
