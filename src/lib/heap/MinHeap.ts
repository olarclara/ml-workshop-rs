import Heap from "./Heap";

export default class MinHeap extends Heap {
  pairIsInCorrectOrder(firstElement: any, secondElement: any) {
    return this.compare.lessThanOrEqual(firstElement, secondElement);
  }
}
