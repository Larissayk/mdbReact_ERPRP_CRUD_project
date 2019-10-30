import React from "react";
import { MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter id="footer" className="text-center font-small darken-2">
      <p className="footer-copyright mb-0 py-3 text-center">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <span>
          <a href="http://www.rperformancegroup.com/"> RPerformance Group </a>
        </span>
      </p>
    </MDBFooter>
  );
};

export default Footer;
