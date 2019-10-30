import React from "react";
import Routes from "./components/Routes";
import "./App.css";
import Footer from "./components/Navigation/Footer";
import NavbarUpdate from "./components/Navigation/NavbarUpdate";

const App = () => (
  <div className="flexible-content">
    {window.location.pathname === "/Login" ||
    window.location.pathname === "/SignUp" ? null : (
      <NavbarUpdate />
    )}
    <main id="content" className="px-5 pt-5">
      <Routes />
    </main>
    <Footer />
  </div>
);

export default App;
