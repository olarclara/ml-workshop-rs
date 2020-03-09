import MinHeap from "./MinHeap";
import Comparator from "../helpers/Comparator";

describe("MinHeap", () => {
  it("should create an empty min heap", () => {
    const h = new MinHeap();

    expect(h).toBeDefined();
    expect(h.peek()).toBeUndefined();
    expect(h.isEmpty()).toBeTruthy();
  });

  it("should add items to the heap and heapify it up", () => {
    const h = new MinHeap();

    h.add(5);
    expect(h.isEmpty()).toBe(false);
    expect(h.peek()).toBe(5);
    expect(h.toString()).toBe("5");

    h.add(3);
    expect(h.peek()).toBe(3);
    expect(h.toString()).toBe("3,5");

    h.add(10);
    expect(h.peek()).toBe(3);
    expect(h.toString()).toBe("3,5,10");

    h.add(1);
    expect(h.peek()).toBe(1);
    expect(h.toString()).toBe("1,3,10,5");

    h.add(1);
    expect(h.peek()).toBe(1);
    expect(h.toString()).toBe("1,1,10,5,3");

    expect(h.poll()).toBe(1);
    expect(h.toString()).toBe("1,3,10,5");

    expect(h.poll()).toBe(1);
    expect(h.toString()).toBe("3,5,10");

    expect(h.poll()).toBe(3);
    expect(h.toString()).toBe("5,10");
  });

  it("should poll items from the heap and heapify it down", () => {
    const h = new MinHeap();

    h.add(5);
    h.add(3);
    h.add(10);
    h.add(11);
    h.add(1);

    expect(h.toString()).toBe("1,3,10,11,5");

    expect(h.poll()).toBe(1);
    expect(h.toString()).toBe("3,5,10,11");

    expect(h.poll()).toBe(3);
    expect(h.toString()).toBe("5,11,10");

    expect(h.poll()).toBe(5);
    expect(h.toString()).toBe("10,11");

    expect(h.poll()).toBe(10);
    expect(h.toString()).toBe("11");

    expect(h.poll()).toBe(11);
    expect(h.toString()).toBe("");

    expect(h.poll()).toBeUndefined();
    expect(h.toString()).toBe("");
  });

  it("should heapify down through the right branch as well", () => {
    const h = new MinHeap();

    h.add(3);
    h.add(12);
    h.add(10);

    expect(h.toString()).toBe("3,12,10");

    h.add(11);
    expect(h.toString()).toBe("3,11,10,12");

    expect(h.poll()).toBe(3);
    expect(h.toString()).toBe("10,11,12");
  });

  it("should be possible to find item indices in heap", () => {
    const h = new MinHeap();

    h.add(3);
    h.add(12);
    h.add(10);
    h.add(11);
    h.add(11);

    expect(h.toString()).toBe("3,11,10,12,11");

    expect(h.find(5)).toEqual([]);
    expect(h.find(3)).toEqual([0]);
    expect(h.find(11)).toEqual([1, 4]);
  });

  it("should be possible to remove items from heap with heapify down", () => {
    const h = new MinHeap();

    h.add(3);
    h.add(12);
    h.add(10);
    h.add(11);
    h.add(11);

    expect(h.toString()).toBe("3,11,10,12,11");

    expect(h.remove(3).toString()).toEqual("10,11,11,12");
    expect(h.remove(3).peek()).toEqual(10);
    expect(h.remove(11).toString()).toEqual("10,12");
    expect(h.remove(3).peek()).toEqual(10);
  });

  it("should be possible to remove items from heap with heapify up", () => {
    const h = new MinHeap();

    h.add(3);
    h.add(10);
    h.add(5);
    h.add(6);
    h.add(7);
    h.add(4);
    h.add(6);
    h.add(8);
    h.add(2);
    h.add(1);

    expect(h.toString()).toBe("1,2,4,6,3,5,6,10,8,7");
    expect(h.remove(8).toString()).toEqual("1,2,4,6,3,5,6,10,7");
    expect(h.remove(7).toString()).toEqual("1,2,4,6,3,5,6,10");
    expect(h.remove(1).toString()).toEqual("2,3,4,6,10,5,6");
    expect(h.remove(2).toString()).toEqual("3,6,4,6,10,5");
    expect(h.remove(6).toString()).toEqual("3,5,4,10");
    expect(h.remove(10).toString()).toEqual("3,5,4");
    expect(h.remove(5).toString()).toEqual("3,4");
    expect(h.remove(3).toString()).toEqual("4");
    expect(h.remove(4).toString()).toEqual("");
  });

  it("should be possible to remove items from heap with custom finding comparator", () => {
    const h = new MinHeap();
    h.add("dddd");
    h.add("ccc");
    h.add("bb");
    h.add("a");

    expect(h.toString()).toBe("a,bb,ccc,dddd");

    const comparator = new Comparator((a, b) => {
      if (a.length === b.length) {
        return 0;
      }

      return a.length < b.length ? -1 : 1;
    });

    h.remove("hey", comparator);
    expect(h.toString()).toBe("a,bb,dddd");
  });

  it("should remove values from heap and correctly re-order the tree", () => {
    const h = new MinHeap();

    h.add(1);
    h.add(2);
    h.add(3);
    h.add(4);
    h.add(5);
    h.add(6);
    h.add(7);
    h.add(8);
    h.add(9);

    expect(h.toString()).toBe("1,2,3,4,5,6,7,8,9");

    h.remove(2);
    expect(h.toString()).toBe("1,4,3,8,5,6,7,9");

    h.remove(4);
    expect(h.toString()).toBe("1,5,3,8,9,6,7");
  });
});
