import React, { useCallback, useState, ChangeEvent } from "react";
import Game from "./components/Game";
import { GameInterface, GameReviewInterface, Options } from "./types";
import jsonGames from "./data/games.json";
import jsonReviews from "./data/reviews.json";
import "./App.css";

const getGameReviews = (gameId: string): GameReviewInterface | undefined => {
  const reviews = jsonReviews.data.find(reviewObj => reviewObj.id === gameId)
    ?.reviews;
  if (!reviews || !reviews.length) return undefined;

  const avgRating = (
    reviews.reduce((acc, curr) => {
      acc += curr.rating;
      return acc;
    }, 0) / reviews.length
  ).toFixed(2);

  return {
    id: gameId,
    avgRating,
    reviews
  };
};

const selectOptions = [
  {
    label: "Popularity",
    value: Options.POPULARITY
  },
  {
    label: "Price: low to high",
    value: Options.PRICE_ASCENDING
  }
];

const App = () => {
  const [games, setGames] = useState<GameInterface[]>(jsonGames.data);

  const updateGames = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const gamesData = games.slice(0);
      const selectedOption = e.target.value;
      const sortedGames =
        selectedOption === Options.POPULARITY
          ? jsonGames.data
          : gamesData.sort((g1, g2) => g1.currentPrice - g2.currentPrice);
      setGames(sortedGames);
    },
    [games]
  );

  return (
    <div className="vertical app">
      <div className="select">
        <label htmlFor="change-order">Order by:&nbsp;</label>
        <select id="change-order" onChange={updateGames}>
          {selectOptions.map((option, index) => (
            <option key={index.toString()} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <ul className="games">
        {games.map(game => (
          <li key={game.id}>
            <Game game={game} gameReviews={getGameReviews(game.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
