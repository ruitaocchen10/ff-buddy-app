import React from "react";
import PlayerRow from "../components/PlayerRow";
import { useState } from "react";
import dummyPlayers from "../components/data/dummyPlayers.js";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function CreateARanking() {
  const [players, setPlayers] = useState(dummyPlayers);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [templateName, setTemplateName] = useState("");

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPlayers((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function saveTemplate() {
    if (!templateName.trim()) {
      alert("Please enter a template name");
      return;
    }

    const template = {
      name: templateName,
      players: players,
      createdAt: new Date().toISOString(),
    };

    // Get existing templates from localStorage
    const existingTemplates = JSON.parse(
      localStorage.getItem("rankingTemplates") || "[]"
    );

    // Add new template
    const updatedTemplates = [...existingTemplates, template];

    // Save back to localStorage
    localStorage.setItem("rankingTemplates", JSON.stringify(updatedTemplates));

    alert(`Template "${templateName}" saved!`);
    setTemplateName(""); // Clear the input
    console.log(
      "All saved templates:",
      JSON.parse(localStorage.getItem("rankingTemplates") || "[]")
    );
  }

  return (
    <>
      <div>
        <h1>Create A Ranking</h1>
        <input
          type="text"
          placeholder="Enter template name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <button onClick={saveTemplate}>Save Template</button>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext
            items={players}
            strategy={verticalListSortingStrategy}
          >
            {players.map((player) => (
              <PlayerRow key={player.id} player={player} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}

export default CreateARanking;
