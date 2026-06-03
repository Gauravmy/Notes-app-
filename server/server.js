// STAGE 2 & 3: Express Server + CRUD API Routes
// This file creates our web server and all API endpoints

// Step 1: Import packages
const express = require('express');
const cors = require('cors');

// Step 2: Create Express app
const app = express();

// Step 3: Setup Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// STEP 4: In-Memory Database (Array)
// ==========================================
// In real apps, we'd use MongoDB or MySQL
// For learning, we use an array that stores everything in RAM
// Note: Data disappears when server restarts (that's okay for learning!)

let notes = [
  {
    id: 1,
    title: 'Welcome',
    content: 'This is your first note! You can edit, delete, or create new ones.',
    createdAt: '2025-05-25'
  },
  {
    id: 2,
    title: 'Learn React',
    content: 'Building a Notes App with React and Express',
    createdAt: '2025-05-26'
  }
];

// Helper: Generate unique IDs
// This finds the highest ID and adds 1
let nextId = 3;
function getNextId() {
  return nextId++;
}

// Helper: Get current date as string (YYYY-MM-DD)
function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

// ==========================================
// ROUTE 1: GET /api/notes
// ==========================================
// Purpose: Get ALL notes
// Returns: Array of all notes
// Status Code: 200 (OK)

app.get('/api/notes', (req, res) => {
  console.log('📤 GET /api/notes - Fetching all notes');
  // Just return all notes in the array
  res.json(notes);
});

// ==========================================
// ROUTE 2: GET /api/notes/:id
// ==========================================
// Purpose: Get ONE specific note by ID
// :id = Dynamic parameter (example: /api/notes/1)
// Returns: Single note object or error
// Status Codes: 200 (Found), 404 (Not Found)

app.get('/api/notes/:id', (req, res) => {
  console.log(`📤 GET /api/notes/:id - Fetching note ${req.params.id}`);
  
  const id = parseInt(req.params.id);  // Convert string to number
  const note = notes.find(n => n.id === id);  // Search for note with matching ID
  
  if (!note) {
    // Note not found
    return res.status(404).json({ error: 'Note not found' });
  }
  
  res.json(note);
});

// ==========================================
// ROUTE 3: POST /api/notes
// ==========================================
// Purpose: CREATE a new note
// Body Required: { title, content }
// Returns: The created note (with ID and date added)
// Status Code: 201 (Created)

app.post('/api/notes', (req, res) => {
  console.log('📥 POST /api/notes - Creating new note');
  
  const { title, content } = req.body;  // Extract from request body
  
  // Validation: Check if title and content exist
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  // Create new note object
  const newNote = {
    id: getNextId(),           // Generate unique ID
    title: title.trim(),       // Remove extra spaces
    content: content.trim(),
    createdAt: getCurrentDate()
  };
  
  // Add to notes array
  notes.push(newNote);
  
  // Return created note with 201 status
  res.status(201).json(newNote);
});

// ==========================================
// ROUTE 4: PUT /api/notes/:id
// ==========================================
// Purpose: UPDATE an existing note
// Body Required: { title, content }
// Returns: The updated note
// Status Codes: 200 (Success), 404 (Not Found), 400 (Bad Request)

app.put('/api/notes/:id', (req, res) => {
  console.log(`📝 PUT /api/notes/:id - Updating note ${req.params.id}`);
  
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  
  // Validation: Check if title and content exist
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  // Find the note to update
  const note = notes.find(n => n.id === id);
  
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  // Update the note
  note.title = title.trim();
  note.content = content.trim();
  // Don't change createdAt - keep original date
  
  res.json(note);
});

// ==========================================
// ROUTE 5: DELETE /api/notes/:id
// ==========================================
// Purpose: DELETE a note
// Returns: Success message or error
// Status Codes: 200 (Success), 404 (Not Found)

app.delete('/api/notes/:id', (req, res) => {
  console.log(`🗑️  DELETE /api/notes/:id - Deleting note ${req.params.id}`);
  
  const id = parseInt(req.params.id);
  
  // Find index of note to delete
  const index = notes.findIndex(n => n.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  // Remove note from array
  // splice(index, 1) removes 1 item at the index position
  const deletedNote = notes.splice(index, 1);
  
  res.json({ message: 'Note deleted', note: deletedNote[0] });
});

// ==========================================
// TEST ROUTE (optional)
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// ==========================================
// START SERVER
// ==========================================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`\n📚 API Routes:`);
  console.log(`   GET    /api/notes         - Get all notes`);
  console.log(`   GET    /api/notes/:id     - Get one note`);
  console.log(`   POST   /api/notes         - Create note`);
  console.log(`   PUT    /api/notes/:id     - Update note`);
  console.log(`   DELETE /api/notes/:id     - Delete note`);
});
