import React, { useState } from 'react';
import Note from './Note';

const NoteList = ({ notes, onToggleTask, onDeleteNote, onEditNote, onReorderNotes }) => {
  const [draggedNote, setDraggedNote] = useState(null);

  const handleDragStart = (index) => {
    setDraggedNote(index);
  };

  const handleDragOver = (index) => {
    if (draggedNote === index) return;

    const reorderedNotes = [...notes];
    const [removedNote] = reorderedNotes.splice(draggedNote, 1);
    reorderedNotes.splice(index, 0, removedNote);

    setDraggedNote(index);
    onReorderNotes(reorderedNotes);
  };

  const handleDragEnd = () => {
    setDraggedNote(null);
  };

  return (
    <div className='notes'>
      {notes.map((note, index) => (
        <div
            className='notes-list'
          key={note.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
        >
          <Note
            note={note}
            onToggleTask={onToggleTask}
            onDeleteNote={onDeleteNote}
            onEditNote={onEditNote}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
