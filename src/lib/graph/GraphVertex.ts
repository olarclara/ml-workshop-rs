import LinkedList from "../linked-list/LinkedList";
import GraphEdge from "./GraphEdge";
import LinkedListNode from "../linked-list/LinkedListNode";

export default class GraphVertex {
  public edges: LinkedList<GraphEdge>;

  constructor(public value: string) {
    if (!value) {
      throw new Error("Vertex must be initialized with a value.");
    }

    const edgeComparator = (edgeA: GraphEdge, edgeB: GraphEdge) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    };

    this.value = value;
    this.edges = new LinkedList(edgeComparator);
  }

  getKey() {
    return this.value;
  }

  addEdge(edge: GraphEdge) {
    this.edges.append(edge);
    return this;
  }

  deleteEdge(edge: GraphEdge) {
    this.edges.delete(edge);
    return this;
  }

  hasEdge(edge: GraphEdge) {
    const node = this.edges.find({ cb: (e: GraphEdge) => e === edge });
    return !!node;
  }

  getEdges() {
    return this.edges.toArray().map(node => node.value);
  }

  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge));

    return this;
  }

  getNeighbors() {
    const edges = this.edges.toArray();
    const neighborsConverter = (node: LinkedListNode<GraphEdge>) => {
      return node.value.startVertex === this
        ? node.value.endVertex
        : node.value.startVertex;
    };

    return edges.map(neighborsConverter);
  }

  hasNeighbor(vertex: GraphVertex) {
    const vertexNode = this.edges.find({
      cb: (edge: GraphEdge) =>
        edge.startVertex === vertex || edge.endVertex === vertex
    });

    return !!vertexNode;
  }

  findEdge(vertex: GraphVertex) {
    const edgeFinder = (edge: GraphEdge) => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    };

    const edge = this.edges.find({ cb: edgeFinder });
    return edge?.value;
  }

  getDegree() {
    return this.edges.toArray().length;
  }
}
