import Heap from "./Heap";

describe("Heap", () => {
  it("should not allow heap to be created directly", () => {
    const heapInstance = () => {
      new Heap();
    };

    expect(heapInstance).toThrowError();
  });
});
