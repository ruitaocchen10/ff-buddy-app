import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import TemplateCard from "../components/TemplateCard";

function Dashboard() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Load templates from localStorage when component mounts
    const savedTemplates = JSON.parse(
      localStorage.getItem("rankingTemplates") || "[]"
    );
    setTemplates(savedTemplates);
  }, []);

  return (
    <>
      <Sidebar />
      <div className="dashboard">
        <Link to="/create-ranking">
          <button>Create a Ranking</button>
        </Link>

        {templates.map((template, index) => (
          <TemplateCard key={index} template={template} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
