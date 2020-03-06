import LinkedListNode from "./LinkedListNode";
import Comparator from "../helpers/Comparator";

export default class LinkedList {
  public head?: LinkedListNode;
  public tail?: LinkedListNode;
  public compare: Comparator;

  constructor(comparatorFunction?: (a: any, b: any) => number) {
    this.head = undefined;
    this.tail = undefined;
    this.compare = new Comparator(comparatorFunction);
  }

  fromArray(values: any[]) {
    values.forEach(value => this.append(value));

    return this;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(cb?: any) {
    return this.toArray()
      .map(node => node.toString(cb))
      .toString();
  }

  append(value: any) {
    const newNode = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  prepend(value: any) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  delete(value: any) {
    if (!this.head) {
      return undefined;
    }

    let deletedNode = undefined;
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;
    if (currentNode !== undefined) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.compare.equal(this.tail?.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  find({ value, cb }: { value?: any; cb?: Function }) {
    if (!this.head) {
      return undefined;
    }

    let currentNode: LinkedListNode | undefined = this.head;
    while (currentNode) {
      if (cb && cb(currentNode.value)) {
        return currentNode;
      } else if (
        value !== undefined &&
        this.compare.equal(currentNode.value, value)
      ) {
        return currentNode;
      } else {
        currentNode = currentNode.next;
      }
    }

    return undefined;
  }

  reverse() {
    let currNode = this.head;
    let prevNode = undefined;
    let nextNode = undefined;

    while (currNode) {
      nextNode = currNode.next;
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
