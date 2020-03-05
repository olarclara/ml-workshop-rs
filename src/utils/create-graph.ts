import gamesJson from "../data/games.json";
import usersJson from "../data/users.json";
// // import Graph from "../lib/graph/Graph";
import GraphVertex from "../lib/GraphVertex";
import { UserInterface, GameInterface } from "../types.js";

const users: UserInterface[] = usersJson.data;
const games: GameInterface[] = gamesJson.data;

export default () => {
  //   const graph = new Graph();
  const userVertices = users.map(user => new GraphVertex(user.id));
  const gamesVertices = games.map(game => new GraphVertex(game.id));
  return { userVertices, gamesVertices };
};
