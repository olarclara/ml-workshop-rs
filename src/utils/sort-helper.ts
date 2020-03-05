import { GameInterface, Options } from "../types";
import groupReviewsByUser from "./group-reviews-by-user";

export default (games: GameInterface[], sortType: Options) => {
  switch (sortType) {
    case Options.PRICE_ASCENDING:
      return games.sort((g1, g2) => g1.currentPrice - g2.currentPrice);
    case Options.RATING:
      return games.sort((g1, g2) => (g2.avgRating || 0) - (g1.avgRating || 0));
    case Options.RECOMMENDED:
      console.log(groupReviewsByUser());
      return games;
    default:
      return games;
  }
};
