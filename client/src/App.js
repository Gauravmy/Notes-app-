// Main App Component
// This is the root component for our Notes App

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Placeholder components (will create these in Stage 6)
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import NoteDetail from './components/NoteDetail';

function App() {
  // =====================
  // STATE VARIABLES
  // =====================
  
  // All notes from API
  const [notes, setNotes] = useState([]);
  
  // Controls which view to show
  // 'list' = show all notes
  // 'create' = show create form
  // 'detail' = show single note
  const [currentView, setCurrentView] = useState('list');
  
  // Current note being viewed/edited
  const [selectedNote, setSelectedNote] = useState(null);
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Error state
  const [error, setError] = useState(null);

  // =====================
  // FETCH NOTES FROM API
  // =====================
  
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call backend API
      const response = await axios.get('/api/notes');
      setNotes(response.data);
      console.log('✅ Notes fetched:', response.data);
    } catch (err) {
      setError('Failed to load notes');
      console.error('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // RUN ON MOUNT
  // =====================
  
  // useEffect runs when component first mounts
  // Empty dependency array [] means run only once
  useEffect(() => {
    fetchNotes();
  }, []);

  // =====================
  // CREATE NOTE
  // =====================
  
  const handleCreateNote = async (noteData) => {
    try {
      // Send POST request to create note
      const response = await axios.post('/api/notes', noteData);
      
      // Add new note to list
      setNotes([...notes, response.data]);
      
      // Go back to list view
      setCurrentView('list');
      console.log('✅ Note created:', response.data);
    } catch (err) {
      setError('Failed to create note');
      console.error('❌ Error:', err);
    }
  };

  // =====================
  // UPDATE NOTE
  // =====================
  
  const handleUpdateNote = async (noteData) => {
    try {
      // Send PUT request to update note
      const response = await axios.put(`/api/notes/${selectedNote.id}`, noteData);
      
      // Update note in list
      const updatedNotes = notes.map(n => 
        n.id === response.data.id ? response.data : n
      );
      setNotes(updatedNotes);
      
      // Update selected note
      setSelectedNote(response.data);
      
      console.log('✅ Note updated:', response.data);
    } catch (err) {
      setError('Failed to update note');
      console.error('❌ Error:', err);
    }
  };

  // =====================
  // DELETE NOTE
  // =====================
  
  const handleDeleteNote = async (id) => {
    try {
      // Send DELETE request
      await axios.delete(`/api/notes/${id}`);
      
      // Remove from list
      setNotes(notes.filter(n => n.id !== id));
      
      // Go back to list
      setCurrentView('list');
      console.log('✅ Note deleted');
    } catch (err) {
      setError('Failed to delete note');
      console.error('❌ Error:', err);
    }
  };

  // =====================
  // VIEW NOTE DETAILS
  // =====================
  
  const handleViewNote = (note) => {
    setSelectedNote(note);
    setCurrentView('detail');
  };

  // =====================
  // RENDER LOGIC
  // =====================
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 My Notes</h1>
      </header>

      <main className="app-main">
        {/* Show error if any */}
        {error && <div className="error-message">{error}</div>}

        {/* Render different views based on currentView state */}
        {currentView === 'list' && (
          <NotesList
            notes={notes}
            loading={loading}
            onCreateNew={() => setCurrentView('create')}
            onViewNote={handleViewNote}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {currentView === 'create' && (
          <NoteForm
            onSave={handleCreateNote}
            onCancel={() => setCurrentView('list')}
            title="Create New Note"
          />
        )}

        {currentView === 'detail' && selectedNote && (
          <NoteDetail
            note={selectedNote}
            onEdit={() => setCurrentView('edit')}
            onDelete={() => handleDeleteNote(selectedNote.id)}
            onBack={() => setCurrentView('list')}
          />
        )}

        {currentView === 'edit' && selectedNote && (
          <NoteForm
            initialNote={selectedNote}
            onSave={handleUpdateNote}
            onCancel={() => {
              setCurrentView('detail');
              setSelectedNote(selectedNote);
            }}
            title="Edit Note"
          />
        )}
      </main>
    </div>
  );
}

export default App;
