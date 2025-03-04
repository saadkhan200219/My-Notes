import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext)
  const {deleteNote} = context
  const { note,updateNote } = props;

  return (
    <div className="col-md-3 my-3 text-center">
      <div className="card">
        <div className="card-body">
          <h6 className="card-title"># {note.tag}</h6>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-around">
          <i style={{color:"red",cursor:"pointer"}} onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","danger")} }  className="fa-solid fa-trash"></i>
          <i style={{color:"green",cursor:"pointer"}} onClick={()=>{updateNote(note)}} className="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
