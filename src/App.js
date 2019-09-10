import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import SenateView from "./senateView";
import BillView from "./billView"
import "./App.css";

const logo = require("./ai_logo.jpg");

class App extends Component {
  render() {
    return (
      <div>
        <Navbar className="ai-nav">
          <div className="header-container">
            <img className="nav-logo" src={logo} alt="ai-logo" />
            <span className="nav-title">
              <div className="ai-title-container">
                NY State Senate: Legislative Conferences
              </div>
            </span>
          </div>
        </Navbar>
        <SenateView />
        <BillView />
      </div>
    );
  }
}

export default App;
