import React, { useCallback, useState, ChangeEvent, useEffect } from "react";
import Game from "./components/Game";
import { GameInterface, Options, UserInterface } from "./types";
import jsonGames from "./data/games.json";
import jsonUsers from "./data/users.json";
import randomIntFromInterval from "./utils/random-int-from-interval";
import sortHelper from "./utils/sort-helper";
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
  },
  {
    label: "Recommended",
    value: Options.RECOMMENDED
  }
];

const App = () => {
  const [user, setUser] = useState<UserInterface>();
  const [games, setGames] = useState<GameInterface[]>(jsonGames.data);

  useEffect(() => {
    const userDB = jsonUsers.data;
    const randomUser = userDB[randomIntFromInterval(0, userDB.length)];
    setUser(randomUser);
  }, []);

  const sortGames = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = e.target.value as Options;
      const gamesData = games.slice(0);
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
      <header className="horizontal app-header">
        <h2>{`Hello, ${user?.name || "gamer"}`}</h2>
        <div className="select">
          <label htmlFor="change-order">Order by:&nbsp;</label>
          <select id="change-order" onChange={sortGames}>
            {selectOptions.map((option, index) => (
              <option key={index.toString()} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </header>
      <main>
        <ul className="games">
          {games.map(game => (
            <li key={game.id}>
              <Game game={game} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
