import React, { Component } from "react";
import { MDBAlert, MDBContainer } from "mdbreact";

class Error404 extends Component {
  render() {
    return (
      <MDBContainer className="mt-5 pt-4">
        <div class="error-header"></div>
        <div class="container ">
          <section class="error-container text-center">
            <h1>404</h1>
            <div class="error-divider">
              <h2>PAGE NOT FOUND.</h2>
              <p class="description">We Couldn't Find This Page</p>
            </div>
          </section>
        </div>
        <script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
      </MDBContainer>
    );
  }
}

export default Error404;
