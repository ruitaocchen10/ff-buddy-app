import React from "react";
import PlayerRow from "../components/PlayerRow";
import dummyPlayers from "../components/data/dummyPlayers";

function CreateARanking() {
  return (
    <>
      <div>
        <h1>Create a ranking page</h1>
        {dummyPlayers.map((player) => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </div>
    </>
  );
}

export default CreateARanking;
