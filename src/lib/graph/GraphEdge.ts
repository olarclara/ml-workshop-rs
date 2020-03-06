import GraphVertex from "./GraphVertex";

export default class GraphEdge {
  constructor(
    public startVertex: GraphVertex,
    public endVertex: GraphVertex,
    public weight: number = 0
  ) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  getKey() {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();
    return `${startVertexKey}_${endVertexKey}`;
  }

  reverse() {
    const tmpVertex = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmpVertex;

    return this;
  }

  toString() {
    return this.getKey();
  }

  updateWeight(weight: number) {
    this.weight = weight;
  }
}
