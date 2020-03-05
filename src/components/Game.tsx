import React from "react";
import { GameInterface, GameReviewInterface } from "../types";
import "./Game.css";

const Game = ({
  game,
  gameReviews
}: {
  game: GameInterface;
  gameReviews?: GameReviewInterface;
}) => (
  <div className="flex game">
    <img className="game-image" src={game.imageUrl} alt="" />
    <h3>{game.title}</h3>
    <p className="game-price">{`USD ${game.currentPrice}`}</p>
    <p>{`${gameReviews?.avgRating || 0} / 5`}</p>
  </div>
);

export default Game;
