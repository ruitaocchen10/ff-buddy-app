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
      <span>{player.name}</span>
      <span>{player.position}</span>
      <span>{player.team}</span>
    </div>
  );
}

export default PlayerRow;
