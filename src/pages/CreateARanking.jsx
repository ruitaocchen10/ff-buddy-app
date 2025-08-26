import React from "react";
import PlayerRow from "../components/PlayerRow";
import { useState } from "react";
import dummyPlayers from "../components/data/dummyPlayers.js";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const templateData = location.state?.templateData;
  const [playersByPosition, setPlayersByPosition] = useState(
    templateData ? templateData.positions : dummyPlayers
  );

  const [templateName, setTemplateName] = useState(
    templateData ? templateData.name : ""
  );
  const [activeTab, setActiveTab] = useState("QB");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPlayersByPosition((prevPositions) => {
        const currentPlayers = prevPositions[activeTab];
        const oldIndex = currentPlayers.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = currentPlayers.findIndex(
          (item) => item.id === over.id
        );

        return {
          ...prevPositions,
          [activeTab]: arrayMove(currentPlayers, oldIndex, newIndex),
        };
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
      positions: playersByPosition,
      createdAt: new Date().toISOString(),
    };

    const existingTemplates = JSON.parse(
      localStorage.getItem("rankingTemplates") || "[]"
    );

    const updatedTemplates = [...existingTemplates, template];
    localStorage.setItem("rankingTemplates", JSON.stringify(updatedTemplates));

    alert(`Template "${templateName}" saved!`);
    setTemplateName("");
  }

  return (
    <>
      <div className="CreateARanking">
        <h1>Create A Ranking</h1>
        <input
          type="text"
          placeholder="Enter template name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <button onClick={saveTemplate}>Save Template</button>
        {/* Tab Navigation */}
        <div className="tab-navigation">
          {Object.keys(playersByPosition).map((position) => (
            <button
              key={position}
              onClick={() => setActiveTab(position)}
              className={activeTab === position ? "tab active" : "tab"}
            >
              {position} ({playersByPosition[position].length})
            </button>
          ))}
        </div>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext
            items={playersByPosition[activeTab]}
            strategy={verticalListSortingStrategy}
          >
            {playersByPosition[activeTab].map((player) => (
              <PlayerRow key={player.id} player={player} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}

export default CreateARanking;
