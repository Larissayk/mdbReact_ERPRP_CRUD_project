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
        <MDBCard style={{ width: 450 }} className="float-right">
          <MDBCardBody className="px-5">
            <h3 style={{ fontColor: "white" }} className="h3 text-center py-4">
              Login
            </h3>
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
                <MDBBtn className="btn blue darken-1" href="/" type="button">
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
  );
};

export default Login;
