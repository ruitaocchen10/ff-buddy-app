import React from "react";

function TemplateCard({ template, onEdit, onDelete }) {
  const handleEditClick = () => {
    onEdit(template);
  };

  const handleDeleteClick = () => {
    onDelete(template);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="template-card">
      <h3>{template.name}</h3>
      <p>Created: {formatDate(template.createdAt)}</p>
      <p>{Object.keys(template.positions).length} positions</p>
      <div className="template-actions">
        <button onClick={handleEditClick} className="edit-btn">
          Edit
        </button>
        <button onClick={handleDeleteClick} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TemplateCard;
