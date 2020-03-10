import GraphVertex from "./GraphVertex";
import GraphEdge from "./GraphEdge";

export default class Graph {
  public vertices: { [key: string]: GraphVertex } = {};
  public edges: { [key: string]: GraphEdge } = {};

  constructor(public isDirected: boolean = false) {
    this.isDirected = isDirected;
  }

  addVertex(vertex: GraphVertex) {
    this.vertices[vertex.getKey()] = vertex;
    return this;
  }

  addEdge(edge: GraphEdge) {
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    if (this.edges[edge.getKey()]) {
      throw new Error("Edge has already been added");
    } else {
      this.edges[edge.getKey()] = edge;
    }

    startVertex.addEdge(edge);
    if (!this.isDirected) {
      endVertex.addEdge(edge);
    }

    return this;
  }

  deleteEdge(edge: GraphEdge) {
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()];
    } else {
      throw new Error("Edge not found in graph");
    }

    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);

    return this;
  }

  findEdge(startVertex: GraphVertex, endVertex: GraphVertex) {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex) {
      return undefined;
    }

    return vertex.findEdge(endVertex);
  }

  getWeight() {
    return this.getAllEdges().reduce((weight, graphEdge) => {
      return weight + graphEdge.weight;
    }, 0);
  }

  reverse() {
    this.getAllEdges().forEach(edge => {
      this.deleteEdge(edge);
      edge.reverse();
      this.addEdge(edge);
    });

    return this;
  }

  getNeighbors(vertex: GraphVertex) {
    return vertex.getNeighbors();
  }

  getVerticesIndices() {
    const verticesIndices: { [key: string]: number } = {};
    this.getAllVertices().forEach((vertex, index) => {
      verticesIndices[vertex.getKey()] = index;
    });

    return verticesIndices;
  }

  getVertexByKey(vertexKey: string) {
    return this.vertices[vertexKey];
  }

  getVertexNeighbors(vertex: GraphVertex) {
    return vertex.getNeighbors();
  }

  getAllVertices() {
    return Object.values(this.vertices);
  }

  getAllEdges() {
    return Object.values(this.edges);
  }

  getAdjacencyMatrix() {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();

    const adjacencyMatrix = Array(vertices.length)
      .fill(null)
      .map(() => {
        return Array(vertices.length).fill(Infinity);
      });

    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach(neighbor => {
        const neighborIndex = verticesIndices[neighbor.getKey()];
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(
          vertex,
          neighbor
        )?.weight;
      });
    });

    return adjacencyMatrix;
  }

  toString() {
    return Object.keys(this.vertices).toString();
  }
}
