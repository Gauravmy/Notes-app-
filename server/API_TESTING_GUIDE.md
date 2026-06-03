# API Testing Guide

This file explains how to test all API endpoints using curl.

## Quick Test Commands

Open a new terminal and run these commands to test your API:

### 1. GET All Notes
```bash
curl http://localhost:5000/api/notes
```
- Returns: Array of all notes
- Status: 200 OK

### 2. GET One Note
```bash
curl http://localhost:5000/api/notes/1
```
- Returns: Single note with ID 1
- Status: 200 OK (or 404 if not found)

### 3. CREATE New Note
```bash
curl -X POST http://localhost:5000/api/notes ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"My Note\",\"content\":\"Note content\"}"
```
- Returns: Created note with new ID
- Status: 201 Created

### 4. UPDATE Note
```bash
curl -X PUT http://localhost:5000/api/notes/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Updated\",\"content\":\"Updated content\"}"
```
- Returns: Updated note
- Status: 200 OK (or 404 if not found)

### 5. DELETE Note
```bash
curl -X DELETE http://localhost:5000/api/notes/1
```
- Returns: Deleted note details
- Status: 200 OK (or 404 if not found)

## Notes for Windows PowerShell

- Use backtick ` instead of \ for line continuation
- For multiline commands, the curl command looks like:

```bash
curl -X POST http://localhost:5000/api/notes `
  -H "Content-Type: application/json" `
  -d '{"title":"My Note","content":"Content"}'
```

## Test Sequence

1. Get all notes (should show Welcome + Learn React)
2. Create new note (should get ID 3)
3. Get that new note by ID
4. Update it
5. Delete it
6. Get all notes (should be back to 2)

## Status Code Reference

- 200 OK - Request successful
- 201 Created - New resource created
- 400 Bad Request - Missing required fields
- 404 Not Found - Note ID doesn't exist
- 500 Server Error - Something went wrong
