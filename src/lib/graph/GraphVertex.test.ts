import GraphVertex from "./GraphVertex";
import GraphEdge from "./GraphEdge";

describe("GraphVertex", () => {
  it("should initialize vertex", () => {
    const vertex = new GraphVertex("vertex");

    expect(vertex.value).toBe("vertex");
    expect(vertex.edges.toString()).toBe("");
  });

  it("should get a vertex value", () => {
    const uuid = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";
    const vertex = new GraphVertex(uuid);

    expect(vertex.getKey()).toBe(uuid);
  });

  it("should create edge", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.hasEdge(edgeAB)).toBeTruthy();
    expect(vertexA.getEdges().length).toBe(1);
    expect(vertexA.getEdges()[0].toString()).toBe("A_B");
  });

  it("should delete edges from vertex", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA.addEdge(edgeAB).addEdge(edgeAC);

    expect(vertexA.hasEdge(edgeAB)).toBe(true);
    expect(vertexB.hasEdge(edgeAB)).toBe(false);

    expect(vertexA.hasEdge(edgeAC)).toBe(true);
    expect(vertexC.hasEdge(edgeAC)).toBe(false);

    expect(vertexA.getEdges().length).toBe(2);

    expect(vertexA.getEdges()[0].toString()).toBe("A_B");
    expect(vertexA.getEdges()[1].toString()).toBe("A_C");

    vertexA.deleteEdge(edgeAB);
    expect(vertexA.hasEdge(edgeAB)).toBe(false);
    expect(vertexA.hasEdge(edgeAC)).toBe(true);
    expect(vertexA.getEdges()[0].toString()).toBe("A_C");

    vertexA.deleteEdge(edgeAC);
    expect(vertexA.hasEdge(edgeAB)).toBe(false);
    expect(vertexA.hasEdge(edgeAC)).toBe(false);
    expect(vertexA.getEdges().length).toBe(0);
  });

  it("should delete all edges from vertex", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA.addEdge(edgeAB).addEdge(edgeAC);

    expect(vertexA.hasEdge(edgeAB)).toBe(true);
    expect(vertexB.hasEdge(edgeAB)).toBe(false);

    expect(vertexA.hasEdge(edgeAC)).toBe(true);
    expect(vertexC.hasEdge(edgeAC)).toBe(false);

    expect(vertexA.getEdges().length).toBe(2);

    vertexA.deleteAllEdges();

    expect(vertexA.hasEdge(edgeAB)).toBe(false);
    expect(vertexB.hasEdge(edgeAB)).toBe(false);

    expect(vertexA.hasEdge(edgeAC)).toBe(false);
    expect(vertexC.hasEdge(edgeAC)).toBe(false);

    expect(vertexA.getEdges().length).toBe(0);
  });

  it("should return vertex neighbors in case if current node is start one", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA.addEdge(edgeAB).addEdge(edgeAC);

    expect(vertexB.getNeighbors()).toEqual([]);

    const neighbors = vertexA.getNeighbors();

    expect(neighbors.length).toBe(2);
    expect(neighbors[0]).toEqual(vertexB);
    expect(neighbors[1]).toEqual(vertexC);
  });

  it("should return vertex neighbors in case if current node is end one", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");

    const edgeBA = new GraphEdge(vertexB, vertexA);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    vertexA.addEdge(edgeBA).addEdge(edgeCA);

    expect(vertexB.getNeighbors()).toEqual([]);

    const neighbors = vertexA.getNeighbors();

    expect(neighbors.length).toBe(2);
    expect(neighbors[0]).toEqual(vertexB);
    expect(neighbors[1]).toEqual(vertexC);
  });

  it("should check if vertex has specific neighbor", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.hasNeighbor(vertexB)).toBe(true);
    expect(vertexA.hasNeighbor(vertexC)).toBe(false);
  });

  it("should add edge by vertex", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.findEdge(vertexB)).toEqual(edgeAB);
    expect(vertexA.findEdge(vertexC)).toBeUndefined();
  });

  it("should calculate vertex degree", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");

    expect(vertexA.getDegree()).toBe(0);

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.getDegree()).toBe(1);

    const edgeBA = new GraphEdge(vertexB, vertexA);
    vertexA.addEdge(edgeBA);

    expect(vertexA.getDegree()).toBe(2);

    vertexA.addEdge(edgeAB);
    expect(vertexA.getDegree()).toBe(3);

    expect(vertexA.getEdges().length).toEqual(3);
  });
});
