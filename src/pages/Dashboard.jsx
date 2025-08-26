import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleEdit = (template) => {
    navigate("/create-ranking", {
      state: { templateData: template },
    });
  };

  const handleDelete = (templateToDelete) => {
    // Confirm deletion
    if (
      window.confirm(
        `Are you sure you want to delete "${templateToDelete.name}"?`
      )
    ) {
      // Remove from localStorage
      const existingTemplates = JSON.parse(
        localStorage.getItem("rankingTemplates") || "[]"
      );

      const updatedTemplates = existingTemplates.filter(
        (template) => template.createdAt !== templateToDelete.createdAt
      );

      localStorage.setItem(
        "rankingTemplates",
        JSON.stringify(updatedTemplates)
      );

      // Update local state to reflect the deletion
      setTemplates(updatedTemplates);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="dashboard">
        <Link to="/create-ranking">
          <button>Create a Ranking</button>
        </Link>

        {templates.map((template, index) => (
          <TemplateCard
            key={index}
            template={template}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
