// Component for creating and editing notes

import React, { useState } from 'react';
import './NoteForm.css';

function NoteForm({ initialNote = null, onSave, onCancel, title }) {
  // Set initial state based on whether we're creating or editing
  const [formData, setFormData] = useState({
    title: initialNote?.title || '',
    content: initialNote?.content || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="note-form-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter note title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Enter note content"
            rows="10"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            💾 Save
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
