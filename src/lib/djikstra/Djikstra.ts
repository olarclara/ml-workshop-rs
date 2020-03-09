import Graph from "../graph/Graph";
import GraphVertex from "../graph/GraphVertex";
import PriorityQueue from "../priority-queue/PriorityQueue";

export default function dijkstra(graph: Graph, startVertex: GraphVertex) {
  const distances: { [key: string]: number } = {};
  const visitedVertices: { [key: string]: GraphVertex | undefined } = {};
  const previousVertices: { [key: string]: GraphVertex | undefined } = {};
  const queue = new PriorityQueue();

  graph.getAllVertices().forEach(vertex => {
    distances[vertex.getKey()] = Infinity;
    previousVertices[vertex.getKey()] = undefined;
  });

  distances[startVertex.getKey()] = 0;
  queue.add(startVertex, distances[startVertex.getKey()]);

  while (!queue.isEmpty()) {
    const currentVertex: GraphVertex = queue.poll();

    currentVertex.getNeighbors().forEach(neighbor => {
      if (!visitedVertices[neighbor.getKey()]) {
        const edge = graph.findEdge(currentVertex, neighbor);

        const existingDistanceToNeighbor = distances[neighbor.getKey()];
        const distanceToNeighborFromCurrent =
          distances[currentVertex.getKey()] + (edge?.weight || 0);

        if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
          distances[neighbor.getKey()] = distanceToNeighborFromCurrent;

          if (queue.hasValue(neighbor)) {
            queue.changePriority(neighbor, distances[neighbor.getKey()]);
          }

          previousVertices[neighbor.getKey()] = currentVertex;
        }

        if (!queue.hasValue(neighbor)) {
          queue.add(neighbor, distances[neighbor.getKey()]);
        }
      }
    });

    visitedVertices[currentVertex.getKey()] = currentVertex;
  }

  return {
    distances,
    previousVertices
  };
}
