import React from "react";
import { GameInterface } from "../types";
import "./Game.css";

const Game = ({ game }: { game: GameInterface }) => (
  <div className="flex game">
    <img className="game-image" src={game.imageUrl} alt="" />
    <h3>{game.title}</h3>
    <p className="game-price">{`USD ${game.currentPrice}`}</p>
    <p>{`${game.avgRating || 'N/A'} / 5 (${game.reviews.length} reviews)`}</p>
  </div>
);

export default Game;
