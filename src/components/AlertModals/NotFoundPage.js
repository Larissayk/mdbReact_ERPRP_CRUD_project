import React from "react";
import { MDBCol, MDBRow } from "mdbreact";

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <div className="full mt-5">
        <MDBRow className="bad-gateway-row align-center">
          <MDBCol md="2"></MDBCol>
          <MDBCol md="4" className="mt-5 align-middle my-auto">
            {/* <img
              alt="Error 404"
              className="img-fluid"
              hieght="20px"
              src="http://www.rperformancegroup.com/img/logo-rperformance-group-white-200-80.png"
            /> */}
            <h2 className="h2-responsive mt-5 mb-4">404. That's an error.</h2>
            <h4>The requested URL was not found on this server.</h4>
          </MDBCol>
          <MDBCol md="4" className="mt-5">
            <img
              alt="Error 404"
              className="img-fluid"
              src="https://mdbootstrap.com/img/Others/grafika404-bf.png"
            />
          </MDBCol>
          <MDBCol md="2"></MDBCol>
        </MDBRow>
      </div>
    </React.Fragment>
  );
};
export default NotFoundPage;
