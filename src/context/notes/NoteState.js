import react, {useState} from "react";
import NoteContext from "./noteContext";
const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const noteinitial = []
    const [notes , setNotes ] = useState(noteinitial)

//Get All Note
const  getNotes = async ()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      "auth-token":localStorage.getItem('token')
    },
  })
  const json = await response.json()
  console.log("Get All Note",json)
  setNotes(json)
}



    //Add Note
    const  addNote = async (title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title, description, tag})
      })
      const note = await  response.json()
      setNotes(notes.concat(note))
    }


//Delete Note
    const deleteNote = async (id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
        },
      })
      const json = response.json()
      console.log("Delete Note", json)
      console.log("deleting note wiht id"+ id)
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes)
    }



//Edit Note
    const editNote = async (id,title,description,tag)=>{    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    })
    const json = response.json()
    let newNote = JSON.parse(JSON.stringify(notes))
    console.log("Edit Note",json)
      for(let index=0; index<newNote.length; index++){
        const element = notes[index]
        if(element._id === id){
          newNote[index].title = title
          newNote[index].description = description
          newNote[index].tag = tag
          break
        }
        
      }
      setNotes(newNote)
    }

    const [alert, setAlert] = useState(null); 

    const showAlert = (message, type) => {
      setAlert({
        msg: message,
        type: type,
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    };

    return(
    <NoteContext.Provider value={{notes , alert ,  addNote, deleteNote , editNote , getNotes, showAlert}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;