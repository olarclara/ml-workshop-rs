import { GameInterface, Options } from "../types";
import groupReviewsByUser from "./group-reviews-by-user";
import createGraph from "./create-graph";
import dijkstra from "../lib/djikstra/Djikstra";

export default (
  games: GameInterface[],
  sortType: Options,
  userId?: string
): GameInterface[] => {
  switch (sortType) {
    case Options.PRICE_ASCENDING:
      return games.sort((g1, g2) => g1.currentPrice - g2.currentPrice);
    case Options.RATING:
      return games.sort((g1, g2) => (g2.avgRating || 0) - (g1.avgRating || 0));
    case Options.RECOMMENDED:
      if (!userId) return games;

      const reviewsByUser = groupReviewsByUser();
      const userReviewedGamesId = reviewsByUser
        .find(r => r.userId === userId)
        ?.reviews.map(r => r.gameId);
      const reviewsGraph = createGraph(reviewsByUser);
      const shortestPaths = dijkstra(
        reviewsGraph,
        reviewsGraph.vertices[userId]
      ).distances;
      const distances = Object.keys(shortestPaths)
        .map(id => ({
          id,
          distance: shortestPaths[id]
        }))
        .sort((d1, d2) => d2.distance - d1.distance);
      const sortedGames = distances
        .map(d => {
          const game = games.find(g => g.id === d.id);
          return !userReviewedGamesId?.includes(d.id) ? game : undefined;
        })
        .filter(Boolean);

      // @ts-ignore
      return sortedGames;
    default:
      return games;
  }
};
