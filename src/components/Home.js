import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext"
import Notes from "./Notes"


export default function Home(props) {
  const {showAlert} = props
  const context = useContext(noteContext)
  const {notes, addNote} = context
  return (
    <>
      <div>
        <Notes showAlert={showAlert}/>
      </div>
    </>
  );
}
