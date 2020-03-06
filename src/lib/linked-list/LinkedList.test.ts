import LinkedList from "./LinkedList";

describe("LinkedList", () => {
  it("should create empty linked list", () => {
    const linkedList = new LinkedList();
    expect(linkedList.toString()).toBe("");
  });

  it("should append a node to the linked list", () => {
    const linkedList = new LinkedList();
    expect(linkedList.head).toBeUndefined();
    expect(linkedList.tail).toBeUndefined();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.toString()).toBe("1,2");
    expect(linkedList.tail?.next).toBeUndefined();
  });

  it("should prepend a value to the linked list", () => {
    const linkedList = new LinkedList();

    linkedList.prepend(2);
    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("2");

    linkedList.append(1);
    linkedList.prepend(3);

    expect(linkedList.toString()).toBe("3,2,1");
  });

  it("should delete a node by its value", () => {
    const linkedList = new LinkedList();
    expect(linkedList.delete(5)).toBeUndefined();

    linkedList.fromArray([1, 2, 3, 4, 5]);

    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("5");

    let deletedNode = linkedList.delete(3);
    expect(deletedNode?.value).toBe(3);
    expect(linkedList.toString()).toBe("1,2,4,5");

    deletedNode = linkedList.delete(3);
    expect(deletedNode?.value).toBeUndefined();

    linkedList.delete(1);
    linkedList.delete(2);
    linkedList.delete(5);
    expect(linkedList.toString()).toBe("4");

    linkedList.delete(4);
    expect(linkedList.toString()).toBe("");
  });

  it("should find a node by its value", () => {
    const linkedList = new LinkedList();
    linkedList.fromArray([1, 2, 3, 4, 5]);

    const node = linkedList.find({ value: 5 });
    expect(node?.value).toBe(5);
  });

  it("should find a node w/ custom cb", () => {
    const linkedList = new LinkedList();
    linkedList.fromArray([
      { id: 1, content: "node 1" },
      { id: 2, content: "node 2" },
      { id: 3, content: "node 3" },
      { id: 4, content: "node 4" },
      { id: 5, content: "node 5" }
    ]);

    const node = linkedList.find({
      cb: (value: { id: number; content: string }) => value.id === 3
    });
    expect(node?.value).toEqual({ id: 3, content: "node 3" });
  });

  it("should reverse linked list", () => {
    const linkedList = new LinkedList();

    linkedList.fromArray([1, 2, 3, 4, 5]);
    expect(linkedList.toString()).toBe("1,2,3,4,5");

    linkedList.reverse();
    expect(linkedList.toString()).toBe("5,4,3,2,1");
  });
});
