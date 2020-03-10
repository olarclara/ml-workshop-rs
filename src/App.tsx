import React, { useCallback, useState, ChangeEvent, useEffect } from "react";
import Game from "./components/Game";
import { GameInterface, Options, UserInterface } from "./types";
import jsonGames from "./data/games.json";
import jsonUsers from "./data/users.json";
import randomIntFromInterval from "./utils/random-int-from-interval";
import sortHelper from "./utils/sort-helper";
import selectOptions from "./constants/select-options";
import "./App.css";

const App = () => {
  const userDB = React.useRef<UserInterface[]>(jsonUsers.data);
  const sortSelect = React.useRef<HTMLSelectElement>(null);
  const [user, setUser] = useState<UserInterface>();
  const [games, setGames] = useState<GameInterface[]>(jsonGames.data);

  useEffect(() => {
    const randomUser =
      userDB.current[randomIntFromInterval(0, userDB.current.length - 1)];
    setUser(randomUser);
  }, []);

  const sortGames = useCallback(
    (e?: ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = e
        ? (e.target.value as Options)
        : (sortSelect.current?.value as Options);
      const sortedGames =
        selectedOption === Options.POPULARITY
          ? jsonGames.data
          : sortHelper(jsonGames.data, selectedOption, user?.id);
      setGames(sortedGames);
    },
    [user]
  );

  const selectUser = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setUser(userDB.current.find(u => u.id === selectedId));
  }, []);

  useEffect(() => {
    sortGames();
  }, [sortGames, user]);

  return (
    <div className="vertical app">
      <header className="flex">
        <h1>Game Store</h1>
        <div className="horizontal app-header">
          <span className="select-user">
            <h2>Hello,&nbsp;</h2>
            <select id="change-user" onChange={selectUser} value={user?.id}>
              {userDB.current.map((user, index) => (
                <option key={index.toString()} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </span>
          <div className="select-sort">
            <label htmlFor="change-order">Order by:&nbsp;</label>
            <select id="change-order" onChange={sortGames} ref={sortSelect}>
              {selectOptions.map((option, index) => (
                <option key={index.toString()} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
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
