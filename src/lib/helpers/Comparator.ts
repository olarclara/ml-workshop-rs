import { ComparatorFn } from "./types";

export default class Comparator {
  private compare: ComparatorFn;

  constructor(public compareFunction?: ComparatorFn) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction(a: any, b: any) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  equal(a: any, b: any) {
    return this.compare(a, b) === 0;
  }

  lessThan(a: any, b: any) {
    return this.compare(a, b) < 0;
  }

  greaterThan(a: any, b: any) {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a: any, b: any) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a: any, b: any) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a: any, b: any) => compareOriginal(b, a);
  }
}
