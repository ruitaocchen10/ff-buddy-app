import React from "react";

function TemplateCard({ template }) {
  // Format the date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="template-card">
      <h3>{template.name}</h3>
      <p>Created: {formatDate(template.createdAt)}</p>
      <p>{template.players.length} players</p>
    </div>
  );
}

export default TemplateCard;
