import React from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-auto Cont1">
          <h2 className="para">Practice Project</h2>
          <NavBar />
        </div>

        <div className="col Cont2 d-flex justify-content-start flex-column align-items-start">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
