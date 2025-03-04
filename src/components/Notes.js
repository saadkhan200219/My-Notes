import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes , editNote} = context;
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getNotes(); // Call only once when component mounts
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]); // Keep only `navigate` to avoid unnecessary re-renders
  
  
const [note, setNote] = useState({id : "" ,etitle:"", edescription:"",etag:""})
const ref = useRef(null)
const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id:currentNote._id  ,etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag})
    
  };
 
  const handleClick = (e) => {
    console.log("updating note", note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("Updated Successfully","success")
    refClose.current.click()
  };
  
  const onChange = (e) => {
    setNote({...note,[e.target.name] : e.target.value})
  };
  
  return (
    <>
      <div>
        <AddNote showAlert={props.showAlert} />
        <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="etitle"
              type="text"
              className="form-control"
              id="etitle"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
              value={note.etitle}
              onChange={onChange}
              minLength={5} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Enter description">Description</label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              placeholder="Enter Description"
              value={note.edescription}
              onChange={onChange}
              minLength={5} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              placeholder="Enter Tag"
              onChange={onChange}
              value={note.etag}
            />
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refClose}
              >
                Close
              </button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
        <div className="row my-3">
          {notes.length === 0 && 'No notes to display'}
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
  