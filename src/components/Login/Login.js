import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBBtn,
  MDBInput,
  MDBAlert
} from "mdbreact";
import { Link } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      alertMessage: "",
      formErrors: {
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: "*************"
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      this.setState({ alertMessage: "error" }, () => {
        console.log(this.state.alertMessage);
      });
      setTimeout(() => this.setState({alertMessage: ""}),2000)
    }
  };
 

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Endereço de email inválido.";
        break;
      case "password":
        formErrors.password = value.length < 6 ? "Mínimo de 6 caracteres." : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

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
              Bem-Vindo
            </h1>
            <hr className="white" />
            <h4>Registre uma nova conta ERP aqui</h4>
            <br />
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor
              massa. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas.
            </p>
          </MDBContainer>
        </MDBCol>
        <MDBCol md="6" className="login-form">
          <MDBCard style={{ width: 450 }} className="float-right">
            <MDBCardBody className="px-5">
              <h3
                style={{ fontColor: "white" }}
                className="h3 text-center py-4"
              >
                Login
              </h3>
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="grey-text">
                  <MDBInput
                    label="Digite seu email"
                    icon="envelope"
                    group
                    className={formErrors.email.length > 0 ? "error" : null}
                    placeholder="Email"
                    type="email"
                    name="email"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                  )}
                  <MDBInput
                    label="Digite sua senha"
                    icon="lock"
                    group
                    className={formErrors.password.length > 0 ? "error" : null}
                    placeholder="Password"
                    type="password"
                    name="password"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}
                </div>
                  {this.state.alertMessage === "error" ? (
                    <MDBAlert color="danger">
                      Certifique-se de que os campos foram preenchidos
                      corretamente.
                    </MDBAlert>
                  ) : null}

                <div className="text-center py-4 mt-3">
                  <MDBBtn className="btn blue darken-1" type="submit">
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
  }
}

export default Login;
