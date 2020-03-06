import GraphVertex from "./GraphVertex";
import GraphEdge from "./GraphEdge";

describe("GraphEdge", () => {
  const vertexA = new GraphVertex("A");
  const vertexB = new GraphVertex("B");

  it("should create GraphEdge", () => {
    const edgeAB = new GraphEdge(vertexA, vertexB);

    expect(edgeAB.startVertex).toEqual(vertexA);
    expect(edgeAB.endVertex).toEqual(vertexB);
    expect(edgeAB.weight).toBe(0);

    edgeAB.updateWeight(0.1);
    expect(edgeAB.weight).toBe(0.1);
  });

  it("should get GraphEdge's key", () => {
    const edgeAB = new GraphEdge(vertexA, vertexB);

    expect(edgeAB.getKey()).toBe("A_B");
  });

  it("should reverse GraphEdge", () => {
    const edgeAB = new GraphEdge(vertexA, vertexB);
    edgeAB.reverse();

    expect(edgeAB.startVertex).toEqual(vertexB);
    expect(edgeAB.endVertex).toEqual(vertexA);
  });
});
