import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './styles.css';

const App = () => {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (note) => {
    setNotes([...notes, note]);
  };

  const handleToggleTask = (noteId, taskIndex) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        const updatedContent = note.content.map((task, index) => {
          if (index === taskIndex) {
            return { ...task, completed: !task.completed };
          }
          return task;
        }).sort((a, b) => a.completed - b.completed);
        return { ...note, content: updatedContent };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const handleEditNote = (noteId, newTitle, newContent) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return { ...note, title: newTitle, content: newContent };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const handleReorderNotes = (newOrder) => {
    setNotes(newOrder);
  };

  return (
    <div className="app">
      <h1>Google Keep Clone</h1>
      <NoteForm onAddNote={handleAddNote} />
      <NoteList
        notes={notes}
        onToggleTask={handleToggleTask}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
        onReorderNotes={handleReorderNotes}
      />
    </div>
  );
};

export default App;
