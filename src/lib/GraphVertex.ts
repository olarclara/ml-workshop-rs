export default class GraphVertex {
  public value: any;
  public edges: [];

  constructor(value: any) {
    if (value === undefined) {
      throw new Error("Graph vertex must have a value");
    }

    this.value = value;
    this.edges = [];
  }
}
