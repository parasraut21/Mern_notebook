import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    let mystyle ={
        color:props.mode ==='dark'?'Black':'#042743',
        backgroundColor :props.mode==='light'?'b#042743':'white',
        border:'2px solid',
        borderColor:props.mode==='dark'?'Black':'#042743',
      }
      let mystyleh1 ={
       color:props.mode ==='dark'?'white':'#042743',
      }
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Note Added Successfully","success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-2">
            <h3 style={mystyleh1}>Add a Note</h3>
            <form className="my-3">
                <div className="mb-3" style={mystyleh1} >
                    <label htmlFor="title" className="form-label">Title (Minimum Of Five characters)</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={2} required /> 
                </div>
                <div className="mb-3" style={mystyleh1}>
                    <label htmlFor="description" className="form-label">Description  (Minimum Of Five characters)</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={2} required />
                </div>
                <div className="mb-3" style={mystyleh1}>
                    <label htmlFor="tag" className="form-label">Tag  (Minimum Of Five characters)</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={2} required />
                </div>
               
                <button   disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote