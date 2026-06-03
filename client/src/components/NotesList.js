// Component to display all notes in a list

import React from 'react';
import './NotesList.css';

function NotesList({ notes, loading, onCreateNew, onViewNote, onDeleteNote }) {
  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  return (
    <div className="notes-list-container">
      <div className="notes-list-header">
        <h2>All Notes</h2>
        <button className="btn-primary" onClick={onCreateNew}>
          ➕ Create New Note
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="empty-state">
          <p>No notes yet! Create your first note.</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p className="note-preview">{note.content.substring(0, 100)}...</p>
              <p className="note-date">{note.createdAt}</p>
              <div className="note-actions">
                <button
                  className="btn-secondary"
                  onClick={() => onViewNote(note)}
                >
                  👁️ View
                </button>
                <button
                  className="btn-danger"
                  onClick={() => onDeleteNote(note.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesList;
