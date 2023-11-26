
import React, { useContext, useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import ADDNOTE from "./ADDNOTE";
import Noteitem from "./Noteitem";
export default function Notes(props) {
  let mystyleh1 ={
    color:props.mode ==='dark'?'white':'#042743',
   }
  const {mode,togglemode,showAlert}=props;
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
      // eslint-disable-next-line
    }
    else{
      navigate("/login");
    }
     
}, [])
const ref = useRef(null)
const refClose = useRef(null)
const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
    const updateNote = (currentNote) => {
      ref.current.click();
       setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})

      }


  const handleClick = (e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    // addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
    refClose.current.click();
      props.showAlert("Updated Successfully","success");
}

const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value});
  
}
  return (
    <>
    <ADDNOTE mode={mode} togglemode={togglemode} showAlert={showAlert}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={2} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.description} onChange={onChange} minLength={2} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.tag} onChange={onChange} minLength={2} required />
                </div>
            </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
        <h2 style={mystyleh1}>Your Notes</h2>
        <div className="container mx-2" style={mystyleh1} >
        {notes.length===0 && 'No Notes to Display'}
        </div>
           {notes.map((note)=>{
           //  return note.title;
           return <Noteitem key={note._id}  note={note} updateNote={updateNote} showAlert={props.showAlert}/>
           })}
    </div>
    </>
  )
}

