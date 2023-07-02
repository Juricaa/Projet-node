import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddEnseignant from "./components/add-enseignant";
import EnseignantsList from "./components/enseignant-list";

class App extends Component {
  render() {
    return (


      <div>

       
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Gestion Enseignant
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/enseignants"} className="nav-link">
                Enseignant
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/a propos"} className="nav-link">
                A Propos
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            
            <Route path="/" element={<EnseignantsList/>} />
            <Route path="/enseignants" element={<EnseignantsList/>} />
            <Route path="/add" element={<AddEnseignant/>} />
           
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
