import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="dashboard">
        <Link to="/create-ranking">
          <button>Create a Ranking</button>
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
