import gamesJson from "../data/games.json";
import usersJson from "../data/users.json";
import {
  UserInterface,
  GameInterface,
  ReviewsByUserInterface,
  UserReviewInterface
} from "../types.js";

const users: UserInterface[] = usersJson.data;
const games: GameInterface[] = gamesJson.data;

export default (): ReviewsByUserInterface[] =>
  users.map(user => {
    const userId = user.id;
    const reviews = games.reduce((acc, game) => {
      const review = game.reviews.find(r => r.userId === userId);
      if (!review) return acc;
      return [...acc, { gameId: game.id, rating: review?.rating }];
    }, [] as UserReviewInterface[]);

    return { userId, reviews };
  });
