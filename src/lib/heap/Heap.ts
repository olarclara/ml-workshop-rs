import Comparator from "../helpers/Comparator";
import { LeftOrRight } from "../helpers/types";

export default class Heap {
  public compare: Comparator;
  public heapContainer: any[] = [];

  constructor(comparatorFunction?: (a: any, b: any) => number) {
    if (new.target === Heap) {
      throw new Error("Cannot construct Heap instance directly");
    }

    this.compare = new Comparator(comparatorFunction);
  }

  getChildIndex(parentIndex: number, pos: LeftOrRight) {
    const childPos = pos === "left" ? 1 : 2;
    return 2 * parentIndex + childPos;
  }

  getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex: number) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasChild(parentIndex: number, pos: LeftOrRight) {
    return this.getChildIndex(parentIndex, pos) < this.heapContainer.length;
  }

  getChild(parentIndex: number, pos: LeftOrRight) {
    return this.heapContainer[this.getChildIndex(parentIndex, pos)];
  }

  getParent(childIndex: number) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne: number, indexTwo: number) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  peek() {
    return this.heapContainer.length ? this.heapContainer[0] : undefined;
  }

  poll() {
    if (!this.heapContainer.length) return undefined;
    if (this.heapContainer.length === 1) return this.heapContainer.pop();

    const item = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop();
    return item;
  }

  add(item: any) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  remove(item: any, comparator = this.compare) {
    const numberOfItemsToRemove = this.find(item, comparator).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      const indexToRemove = this.find(item, comparator).pop();
      if (!indexToRemove) break;

      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();
        const parentItem = this.getParent(indexToRemove);
        if (
          this.hasChild(indexToRemove, "left") &&
          (!parentItem ||
            this.pairIsInCorrectOrder(
              parentItem,
              this.heapContainer[indexToRemove]
            ))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }

  find(item: any, comparator = this.compare) {
    const foundItemIndices = [];

    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex += 1
    ) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }

    return foundItemIndices;
  }

  heapifyDown(startIndex?: number) {
    let currentIndex = startIndex || 0;
    let nextIndex = undefined;

    while (this.hasChild(currentIndex, "left")) {
      if (
        this.hasChild(currentIndex, "right") &&
        this.pairIsInCorrectOrder(
          this.getChild(currentIndex, "right"),
          this.getChild(currentIndex, "left")
        )
      ) {
        nextIndex = this.getChildIndex(currentIndex, "right");
      } else {
        nextIndex = this.getChildIndex(currentIndex, "left");
      }

      if (
        // @ts-ignore
        this.pairIsInCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex]
        )
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  heapifyUp(startIndex?: number) {
    let currentIndex = startIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex) &&
      // @ts-ignore
      !this.pairIsInCorrectOrder(
        this.getParent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  pairIsInCorrectOrder(firstElement: number, secondElement: number) {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
  }
}
