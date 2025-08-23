import React from "react";
import "./PlayerRow.css";

function PlayerRow({ player }) {
  return (
    <div className="PlayerRow">
      <span>{player.name}</span>
      <span>{player.position}</span>
      <span>{player.team}</span>
    </div>
  );
}

export default PlayerRow;
