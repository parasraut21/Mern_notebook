import React from "react";
import Footer from "./Footer";


export default function About(props) {
  // const [mystyle, setmystyle] = useState({
  //   color: "black",
  //   backgroundColor: "white",
  // });
const {togglemode,mode} = props;
 let mystyle ={
   color:props.mode ==='dark'?'Black':'#042743',
   backgroundColor :props.mode==='light'?'b#042743':'white',
   border:'2px solid',
   borderColor:props.mode==='dark'?'Black':'#042743',
 }
 let mystyleh1 ={
  color:props.mode ==='dark'?'white':'#042743',
 }

  return (
    <>
      <div className="container">
        <h1 className="my-3" style={mystyleh1}>About Us</h1>
        <div className="accordion" id="accordionExample" style={mystyle}>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                style={mystyle}
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Gave individuals a place to safely store their notes online
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body" style={mystyle}>
                <strong>
               <b>Create notes :</b> Users can create new notes by providing a title and content for the note. The note will be stored in the database and associated with the user's account. .{" "}
                </strong>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                style={mystyle}
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
               Provided users with the ability to add, amend, and remove notes.
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body" style={mystyle}>
                <strong>
               <b>View notes :</b> Users can view a list of their notes, along with the note title and date created. They can click on a note to view the full content of the note.
                <br/>
              <b>Edit notes :</b> Users can edit the content of their existing notes. When they save the changes, the note will be updated in the database.
                <br/>
               <b>Delete notes :</b> Users can delete their existing notes. The note will be removed from the database and will no longer be associated with the user's account.
                </strong>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                style={mystyle}
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
               Implement an authentication system using JWT to protect user accounts.
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body" style={mystyle}>
                <strong>
              <b>User authentication :</b> Users must log in to access their notes. JWT authentication will be used to verify their credentials and ensure that only authenticated users can access their account.
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer title="Designed by Paras Raut" mode={mode} togglemode={togglemode} fixed={"fixed"}/>
    </>
  );
}