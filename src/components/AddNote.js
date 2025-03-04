import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const [note, setNote] = useState({title:"", description:"",tag:""})
  const { addNote } = context;


  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title,note.description,note.tag)
    setNote({title:"", description:"",tag:""})
  };

  const onChange = (e) => {
    setNote({...note,[e.target.name] : e.target.value})
  };

  return (
    <div>
      <div className="container my-3">
        <h3>Add a Note</h3>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
              onChange={onChange}
              value={note.title}
              minLength={5} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Enter description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter Description"
              onChange={onChange}
              value={note.description}
              minLength={5} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Enter Tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          {/* <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="check" />
            <label className="form-check-label" htmlFor="check">
              Check me out
            </label>
          </div> */}
          <button
            type="submit"
            className="btn btn-primary my-3"
            onClick={handleClick}
            disabled = {note.description.length<5 || note.title.length < 5 }
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
