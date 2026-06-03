// Component to display full details of one note

import React from 'react';
import './NoteDetail.css';

function NoteDetail({ note, onEdit, onDelete, onBack }) {
  return (
    <div className="note-detail-container">
      <button className="btn-back" onClick={onBack}>
        ← Back to List
      </button>

      <div className="note-detail">
        <div className="note-detail-header">
          <h2>{note.title}</h2>
          <p className="note-date">Created: {note.createdAt}</p>
        </div>

        <div className="note-detail-content">
          <p>{note.content}</p>
        </div>

        <div className="note-detail-actions">
          <button className="btn-primary" onClick={onEdit}>
            ✏️ Edit
          </button>
          <button className="btn-danger" onClick={onDelete}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteDetail;
