import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBBtn,
  MDBInput
} from "mdbreact";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <MDBContainer>
      <MDBContainer className="mt-5">
        <MDBRow>
          <MDBCol md="6">
             <h1>Learn Bootstrap 4 with MDB</h1>

            <hr/>

            <p>
              <strong>Best & free guide of responsive web design</strong>
            </p>

            <p>
              <strong>The most comprehensive tutorial for the Bootstrap 4. Loved by over 500 000 users. Video and written versions
                available. Create your own, stunning website.</strong>
            </p>


          </MDBCol>
          <MDBCol md="6">
            <MDBCard style={{ width: 400 }} className="mb-5 mt-5 float-right">
              <MDBCardBody>
                <p className="h4 text-center py-4">Login</p>
                <form>
                  <div className="grey-text">
                    <MDBInput
                      label="Digite seu email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label="Digite sua senha"
                      icon="lock"
                      group
                      type="password"
                      validate
                    />
                  </div>

                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit">
                      Login
                    </MDBBtn>
                  </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light text-right">
                    <p>
                      Não tem uma conta? <Link to="/SignUp">Sign Up</Link>
                    </p>
                    <p>Esqueceu a senha?</p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default Login;

