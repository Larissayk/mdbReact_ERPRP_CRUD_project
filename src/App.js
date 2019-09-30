import React from "react";
import { MDBContainer } from "mdbreact";
import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

const App = () => (
  <div>
    <Navbar />
    <MDBContainer>
      <Main />
    </MDBContainer>
  </div>
);

export default App;
