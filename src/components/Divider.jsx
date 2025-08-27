import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Divider.css";

export default function Divider({ divider, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: divider.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent drag from starting
    e.preventDefault(); // Prevent any default behavior

    if (onDelete) {
      onDelete(divider.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="divider-row"
    >
      <div className="divider-line"></div>
      <button
        className="divider-delete-btn"
        onClick={handleDelete}
        type="button"
      >
        ×
      </button>
    </div>
  );
}
