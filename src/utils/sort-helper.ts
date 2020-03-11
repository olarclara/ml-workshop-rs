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
      return games.slice().sort((g1, g2) => g1.currentPrice - g2.currentPrice);
    case Options.RATING:
      return games
        .slice()
        .sort((g1, g2) => (g2.avgRating || 0) - (g1.avgRating || 0));
    case Options.RECOMMENDED:
      if (!userId) return games;

      const reviewsByUser = groupReviewsByUser();
      const userReviewedGamesId = reviewsByUser
        .slice()
        .find(r => r.userId === userId)
        ?.reviews.map(r => r.gameId);

      // Start by removing games that the user already reviewed.
      let recommendedGames = games.filter(
        g => !userReviewedGamesId?.includes(g.id)
      );

      // Create a graph that represent games, users and reviews.
      const reviewsGraph = createGraph(reviewsByUser);

      // Apply Djikstra algorithm with current user's vertex as initial one.
      const shortestPaths = dijkstra(
        reviewsGraph,
        reviewsGraph.vertices[userId]
      ).distances;

      return recommendedGames.sort(
        (g1, g2) => shortestPaths[g2.id] - shortestPaths[g1.id]
      );
    case Options.POPULARITY:
    default:
      return games;
  }
};
