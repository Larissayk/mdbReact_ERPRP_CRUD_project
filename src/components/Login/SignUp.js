import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput
} from "mdbreact";

const SignUp = () => {
  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol>
          <MDBCard style={{ width: 400 }} className="mb-5 mt-5 float-right">
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Seu nome"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Seu email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Sua senha"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                  <MDBInput
                    label="Confirme sua senha"
                    icon="exclamation-triangle"
                    group
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Registrar
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUp;

