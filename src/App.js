import React from "react";
import { MDBContainer, MDBBtn, MDBIcon } from "mdbreact";
import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

const App = () => (
  <div>
    <Navbar />
    <MDBContainer>
      <Main />
    </MDBContainer>
    <MDBBtn
      size="lg"
      href="/Providers/add"
      className="px-3 py-3 btn deep-orange darken-3 circle-btn"
    >
      <MDBIcon size="lg" className="text-white" icon="plus" />
    </MDBBtn>
  </div>
);

export default App;
