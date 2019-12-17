import React, {Component} from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput,
  MDBAlert
} from "mdbreact";

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

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      email: null,
      password: null,
      passwordConf: null,
      alertMessage: "",
      formErrors: {
        userName: "",
        email: "",
        password: "",
        passwordConf: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Name: ${this.state.userName}
        Email: ${this.state.email}
        Password: ${this.state.password}
        PasswordConf: ${this.state.passwordConf}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      this.setState({ alertMessage: "error" }, () => {
        console.log(this.state.alertMessage);
      });
      setTimeout(() => this.setState({ alertMessage: "" }), 2000);
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "userName":
        formErrors.userName = value.length < 3 ? "Mínimo de 3 caracteres." : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Endereço de email inválido.";
        break;
      case "password":
        formErrors.password = value.length < 6 ? "Mínimo de 6 caracteres" : "";
        break;
      case "passwordConf":
        formErrors.passwordConf = value.length < 6 
            ? "A confirmação da senha não confere."
            : "";
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
              Bem Vindo
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
          <MDBCard style={{ width: 450 }} className="mb-2 mt-2 float-right">
            <MDBCardBody>
              <form onSubmit={this.handleSubmit} noValidate>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Digite seu nome"
                    icon="user"
                    group
                    type="text"
                    className={formErrors.userName.length > 0 ? "error" : null}
                    placeholder="Nome"
                    name="userName"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.userName.length > 0 && (
                    <span className="errorMessage">{formErrors.userName}</span>
                  )}
                  <MDBInput
                    label="Digite seu email"
                    icon="envelope"
                    group
                    type="email"
                    className={formErrors.email.length > 0 ? "error" : null}
                    placeholder="Email"
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
                    type="password"
                    className={formErrors.password.length > 0 ? "error" : null}
                    placeholder="Senha"
                    name="password"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}
                  <MDBInput
                    label="Confirme sua senha"
                    icon="exclamation-triangle"
                    group
                    type="password"
                    className={
                      formErrors.passwordConf.length > 0 ? "error" : null
                    }
                    placeholder="Senha"
                    name="passwordConf"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {/* Ainda não consegui fazer a verificação se ambos as senhas são iguais */}
                  {this.state.passwordConf !== this.state.password ?
                  <span className="errorMessage">
                    {formErrors.passwordConf}
                  </span> : null
                  }
                </div>
                {this.state.alertMessage === "error" ? (
                  <MDBAlert color="danger">
                    Certifique-se de que os campos foram preenchidos
                    corretamente.
                  </MDBAlert>
                ) : null}
                <div className="text-center py-4 mt-3">
                  <MDBBtn className="cyan lighten-2" type="submit">
                    Registrar
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
};

export default SignUp;

