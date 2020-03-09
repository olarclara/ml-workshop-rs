import MinHeap from "../heap/MinHeap";
import Comparator from "../helpers/Comparator";

export default class PriorityQueue extends MinHeap {
  public priorities = new Map();
  public compare: Comparator;

  constructor() {
    super();

    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  add(item: any, priority?: number) {
    this.priorities.set(item, priority || 0);
    super.add(item);
    return this;
  }

  remove(item: any, customComparator: Comparator) {
    super.remove(item, customComparator);
    this.priorities.delete(item);
    return this;
  }

  comparePriority(a: any, b: any) {
    const priorityA = this.priorities.get(a);
    const priorityB = this.priorities.get(b);

    return priorityA === priorityB ? 0 : priorityA < priorityB ? -1 : 1;
  }

  changePriority(item: any, priority: number) {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);
    return this;
  }

  findByValue(item: any) {
    return this.find(item, new Comparator(this.compareValue));
  }

  hasValue(item: any) {
    return this.findByValue(item).length > 0;
  }

  compareValue(a: any, b: any) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }
}
