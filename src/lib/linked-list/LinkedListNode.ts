export default class LinkedListNode {
  constructor(public value: any, public next?: LinkedListNode) {
    this.value = value;
    this.next = next;
  }

  toString(cb?: (value: any) => string) {
    return cb ? cb(this.value) : `${this.value}`;
  }
}
