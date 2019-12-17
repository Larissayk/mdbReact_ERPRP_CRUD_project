import React from "react";
import Routes from "./components/Routes";
import "./App.css";
import Footer from "./components/Navigation/Footer";
import NavbarUpdate from "./components/Navigation/NavbarUpdate";

const App = () => (
  <div className="flexible-content">
    {window.location.pathname === "/Login"  ||
    window.location.pathname === "/SignUp" ? null : (
      <NavbarUpdate />
    )}
    <main
      className={
        window.location.pathname === "/Login" ||
        window.location.pathname === "/SignUp"
          ? null
          : "content px-5 pt-5"
      }
    >
      <Routes />
    </main>
    {window.location.pathname === "/Login" ||
    window.location.pathname === "/SignUp" ? null : (
      <Footer />
    )}
  </div>
);

export default App;
