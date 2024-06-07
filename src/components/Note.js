import React, { useState } from 'react';

const Note = ({ note, onToggleTask, onDeleteNote, onEditNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content.map(item => item.text).join('\n'));

  const handleSave = () => {
    const updatedContent = editContent.split('\n').map(text => ({ text, completed: false }));
    onEditNote(note.id, editTitle, updatedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  }

  const isListNote = note.content.length > 1 || note.content[0].completed !== undefined;

  return (
    <div className="note">
      {isEditing ? (
        <div className='note-form'>
          <input
            type="text"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editContent}
            required
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{note.title}</h2>
          <div>
            {isListNote ? (
              note.content.map((item, index) => (
                <div key={index} className="task">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => onToggleTask(note.id, index)}
                  />
                  <span className={item.completed ? 'completed' : ''}>
                    {item.text}
                  </span>
                </div>
              ))
            ) : (
              <p>{note.content[0].text}</p>
            )}
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeleteNote(note.id)}>Delete Note</button>
        </div>
      )}
    </div>
  );
};

export default Note;
