import React from "react";
import "./PlayerRow.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function PlayerRow({ player }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: player.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="PlayerRow"
    >
      <div className="PlayerInfo">
        <span className="PlayerName">{player.name}</span>
        <span className="PlayerTeam">{player.team}</span>
      </div>
      <span>{player.position}</span>
    </div>
  );
}

export default PlayerRow;
