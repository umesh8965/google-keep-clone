import React, { useState } from "react";

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteType, setNoteType] = useState("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const newNote = {
        id: Date.now().toString(),
        title,
        content:
          noteType === "text"
            ? [{ text: content, completed: false }]
            : content.split("\n").map((text) => ({ text, completed: false })),
      };
      onAddNote(newNote);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="form-holder">
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={noteType} onChange={(e) => setNoteType(e.target.value)}>
          <option value="text">Checkbox Text Note</option>
          <option value="list">Checkbox List Note</option>
        </select>
        {noteType === "text" ? (
          <textarea
            placeholder="Checkbox Text Content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <textarea
            placeholder="Checkbox List (Separate with new lines)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default NoteForm;
