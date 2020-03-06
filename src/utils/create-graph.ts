import gamesJson from "../data/games.json";
import usersJson from "../data/users.json";
import Graph from "../lib/graph/Graph";
import GraphVertex from "../lib/graph/GraphVertex";
import { UserInterface, GameInterface } from "../types.js";

const users: UserInterface[] = usersJson.data;
const games: GameInterface[] = gamesJson.data;

export default () => {
  const graph = new Graph();
  const vertices = [...users, ...games].map(item => new GraphVertex(item.id));
  vertices.forEach(v => graph.addVertex(v));
  return graph;
};
