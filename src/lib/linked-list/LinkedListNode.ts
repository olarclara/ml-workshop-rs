export default class LinkedListNode<T> {
  constructor(public value: T, public next?: LinkedListNode<T>) {
    this.value = value;
    this.next = next;
  }

  toString(cb?: (value: any) => string) {
    return cb ? cb(this.value) : `${this.value}`;
  }
}
