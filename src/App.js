import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState"
import  Alert  from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [mode, setmode] = useState("light");
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 3000);
  };

  const togglemode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark Mode Has Been Enabled", "success");
      document.title = "UrNoteBook - Dark Mode";
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode Has Been Enabled", "success");
      document.title = "UrNoteBook - Light Mode";
    }
  };
  return (
    <>
      <NoteState>
        <HashRouter>
          <Navbar  mode={mode} togglemode={togglemode} showAlert={showAlert}/>
          <Alert  alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}  mode={mode} togglemode={togglemode}/>} />
            <Route exact path="/about" element={<About showAlert={showAlert} mode={mode}/>} />
            <Route exact path="/login" element={<Login showAlert={showAlert} mode={mode}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} mode={mode}/>} />
          </Routes>
          </div>
        </HashRouter>
      </NoteState>
     
    </>
  );
}

export default App;
