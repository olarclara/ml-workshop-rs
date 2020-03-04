import React from "react";
import "./Game.css";

interface GameInterface {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  releaseDateOrder: string;
  currentPrice: number;
}

const Game = ({ game }: { game: GameInterface }) => (
  <div className="flex game">
    <img className="game-image" src={game.imageUrl} alt="" />
    <h3>{game.title}</h3>
    <label>{`USD ${game.currentPrice}`}</label>
  </div>
);

export default Game;
