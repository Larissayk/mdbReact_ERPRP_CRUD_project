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
    <MDBRow>
      <MDBCol md="6" className="signup-area">
        <MDBContainer className="mb-5 pb-5">
          <img
            src="http://www.rperformancegroup.com/img/logo-rperformance-group-white-200-80.png"
            height="60"
            className="d-inline-block align-top"
            alt="Company's Logo"
          />
        </MDBContainer>
        <MDBContainer className="mt-5">
          <h1 style={{ fontSize: "50px" }} className="pt-2">
            Bem Vindo
          </h1>
          <hr className="white" />
          <h4>Registre uma nova conta ERP aqui</h4>
          <br />
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget
            ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas.
          </p>
        </MDBContainer>
      </MDBCol>
      <MDBCol md="6" className="login-form">
        <MDBCard style={{ width: 450 }} className="mb-2 mt-2 float-right">
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
                <MDBBtn className="btn blue darken-1" type="submit">
                  Registrar
                </MDBBtn>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default SignUp;

