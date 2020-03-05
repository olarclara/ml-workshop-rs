import React, { useCallback, useState, ChangeEvent } from "react";
import Game from "./components/Game";
import { GameInterface, Options } from "./types";
import jsonGames from "./data/games.json";
import "./App.css";

const selectOptions = [
  {
    label: "Popularity",
    value: Options.POPULARITY
  },
  {
    label: "Price: low to high",
    value: Options.PRICE_ASCENDING
  },
  {
    label: "Rating",
    value: Options.RATING
  }
];

const sortHelper = (games: GameInterface[], sortType: Options) => {
  return sortType === Options.PRICE_ASCENDING
    ? games.sort((g1, g2) => g1.currentPrice - g2.currentPrice)
    : games.sort((g1, g2) => (g2.avgRating || 0) - (g1.avgRating || 0));
};

const App = () => {
  const [games, setGames] = useState<GameInterface[]>(jsonGames.data);

  const updateGames = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const gamesData = games.slice(0);
      const selectedOption = e.target.value as Options;
      const sortedGames =
        selectedOption === Options.POPULARITY
          ? jsonGames.data
          : sortHelper(gamesData, selectedOption);
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
            <Game game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
