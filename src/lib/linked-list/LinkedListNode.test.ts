import LinkedListNode from "./LinkedListNode";

describe("LinkedListNode", () => {
  it("should create node", () => {
    const node = new LinkedListNode(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeUndefined();
  });

  it("should link two nodes", () => {
    const node2 = new LinkedListNode(2);
    const node1 = new LinkedListNode(1, node2);

    expect(node1.next).toEqual(node2);
    expect(node2.next).toBeUndefined();
  });

  it("should convert to string", () => {
    const node = new LinkedListNode("linked list node");
    expect(node.toString()).toBe("linked list node");
  });

  it("should convert to string w/ custom fn", () => {
    const value = { id: 123, content: "node content" };
    const node = new LinkedListNode(value);

    const toStringCb = (value: { id: number; content: string }) =>
      `value: ${value.id}, content: ${value.content}`;
    expect(node.toString(toStringCb)).toBe("value: 123, content: node content");
  });
});
