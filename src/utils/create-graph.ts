import gamesJson from "../data/games.json";
import usersJson from "../data/users.json";
import Graph from "../lib/graph/Graph";
import GraphVertex from "../lib/graph/GraphVertex";
import GraphEdge from "../lib/graph/GraphEdge";
import {
  UserInterface,
  GameInterface,
  ReviewsByUserInterface
} from "../types.js";

const users: UserInterface[] = usersJson.data;
const games: GameInterface[] = gamesJson.data;

export default (edgeMap: ReviewsByUserInterface[]) => {
  const graph = new Graph();

  const vertices = [...users, ...games].map(item => new GraphVertex(item.id));

  const edges = edgeMap.reduce((acc, curr) => {
    const userVertix = vertices.find(v => v.getKey() === curr.userId);
    if (!userVertix) return acc;

    const reviewEdges = curr.reviews
      .map(r => {
        const movieVertix = vertices.find(v => v.getKey() === r.gameId);
        if (!movieVertix) {
          return undefined;
        }

        return new GraphEdge(userVertix, movieVertix, r.rating);
      })
      .filter(Boolean);

    acc = [...acc, ...reviewEdges];
    return acc;
  }, [] as any[]);

  edges.forEach(e => graph.addEdge(e));

  return graph;
};
