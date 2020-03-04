import React from "react";
import Game from "./components/Game";
import "./App.css";
import games from "./data/games.json";

function App() {
  return (
    <div className="vertical app">
      <div className="select">
        <label htmlFor="change-order">Order by:&nbsp;</label>
        <select id="change-order">
          <option>Popularity</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
        </select>
      </div>
      <ul className="games">
        {games.data.map(game => (
          <li key={game.id}>
            <Game game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
