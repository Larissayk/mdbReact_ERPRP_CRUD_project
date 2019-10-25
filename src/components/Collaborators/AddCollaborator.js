import React, { Component} from "react";
import {
  MDBRow,
  MDBCol,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBTabContent,
  MDBTabPane,
  MDBIcon,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBAlert
} from "mdbreact";
import axios from "axios";
import InputMask from "react-input-mask";
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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

class AddCollaborator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cpf: null,
      // status: "",
      nome: null,
      // apelido: "",
      // rg: "",
      // orgao_emissor: "",
      // ctps: "",
      data_nascimento: new Date(),
      // endereco: "",
      // cep: "",
      // bairro: "",
      // cidade: "",
      // estado: "",
      // pais: "",
      // telefone: "",
      celular: null,
      // email: "",
      email_pessoal: null,
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        nome: "",
        cpf: "",
        celular: "",
        email_pessoal: ""
      }
    };
  }

  AddCollaborator(newCollaborator) {
    axios
      .request({
        method: "POST",
        url: "http://127.0.0.1:8000/api/colaboradores/",
        data: newCollaborator
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Collaborators"), 1800);
        // this.props.history.push("/Collaborators");
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  onSubmit(e) {
    const newCollaborator = {
      cpf: this.refs.collabCpf.value,
      status: this.refs.collabStatus.value,
      nome: this.refs.collabName.value,
      apelido: this.refs.collabNick.value,
      rg: this.refs.collabRg.value,
      orgao_emissor: this.refs.collabEmis.value,
      ctps: this.refs.collabCtps.value,
      data_nascimento: this.refs.collabBday.value,
      endereco: this.refs.collabAddress.value,
      cep: this.refs.collabZipcode.value,
      bairro: this.refs.collabNeighborhood.value,
      cidade: this.refs.collabCity.value,
      pais: this.refs.collabCountry.value,
      estado: this.refs.collabState.value,
      telefone: this.refs.collabPhone.value,
      celular: this.refs.collabMobile.value,
      // email: this.refs.collabEmail.value,
      email_pessoal: this.refs.collabPEmail.value
    };
    e.preventDefault();
    // console.log(newCollaborator);

    if (formValid(this.state)) {
      this.AddCollaborator(newCollaborator);
      console.log(`
        --SUBMITTING--
        Nome: ${this.state.nome}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      this.setState({ alertMessage1: "error1" }, () => {
        console.log("alerta:", this.state.alertMessage1);
      });
      setTimeout(() => this.setState({ alertMessage1: "" }), 2000);
    }
  }

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "nome":
        formErrors.nome = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "cpf":
        formErrors.cpf = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "celular":
        formErrors.celular = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "email_pessoal":
        formErrors.email_pessoal = value.length < 1 ? "Campo obrigatório." : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  // dateHandleChange = date => {
  //   this.setState({
  //     data_nascimento: date
  //   });
  //   console.log(this.state);
  // };



  render() {
    const { formErrors } = this.state;
    return (
      <MDBContainer className="main-body">
        <div>
          {this.state.alertMessage === "success" ? <SuccessMessage /> : null}
          {this.state.alertMessage === "error" ? <ErrorMessage /> : null}
        </div>
        <MDBCard className="mt-3 mb-4">
          <MDBCardTitle style={{ fontSize: 28 }}>
            <strong>NOVO COLABORADOR</strong>
          </MDBCardTitle>
          <hr className="mb-0" />
          <MDBCardBody className="mt-0">
            <MDBContainer>
              <MDBNav className="nav-tabs mx-0">
                <MDBNavItem>
                  <MDBNavLink
                    to="#"
                    active={this.state.activeItem === "1"}
                    onClick={this.toggle("1")}
                    role="tab"
                  >
                    Dados Gerais
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <MDBRow className="mt-4">
                      <MDBCol md="5" className="form-group mb-0">
                        <label className="grey-text" htmlFor="collabName">
                          Nome: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          name="nome"
                          className={
                            formErrors.nome.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="collabName"
                          autoFocus
                          onChange={this.handleChange}
                        />
                        {formErrors.nome.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.nome}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabNick">
                          Apelido:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabNick"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="collabBday">
                          Data Nascimento:{" "}
                        </label>
                        {/* <DatePicker
                          className="form-control"
                          selected={this.state.data_nascimento}
                          onChange={this.dateHandleChange}
                          dateFormat="dd/MM/yyyy"
                          ref="collabBday"
                        /> */}

                        <InputMask
                          className="form-control"
                          type="text"
                          ref="collabBday"
                          mask="99/99/9999"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="collabStatus">
                          Status: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="collabStatus"
                          >
                            <option value="Ativo">Ativo</option>
                            <option value="Desligado">Desligado</option>
                          </select>
                        </div>
                        {/* <input
                          className="form-control"
                          type="text"
                          ref="collabStatus"
                          required
                        /> */}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      {/* <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabEmail">
                          Email:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabEmail"
                        />
                      </MDBCol> */}
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabPEmail">
                          Email Pessoal: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className={
                            formErrors.email_pessoal.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="collabPEmail"
                          name="email_pessoal"
                          onChange={this.handleChange}
                        />
                        {formErrors.email_pessoal.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.email_pessoal}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabPhone">
                          Telefone:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="collabPhone"
                          mask="(99) 9999-9999"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabMobile">
                          Celular: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className={
                            formErrors.celular.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="collabMobile"
                          mask="(99) 9 9999-9999"
                          name="celular"
                          onChange={this.handleChange}
                        />
                        {formErrors.celular.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.celular}
                          </span>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabCpf">
                          CPF: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className={
                            formErrors.cpf.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="collabCpf"
                          mask="999.999.999-99"
                          name="cpf"
                          onChange={this.handleChange}
                        />
                        {formErrors.cpf.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cpf}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabRg">
                          RG:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="collabRg"
                          mask="99.999.999-**"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="collabEmis">
                          Órgão Emis.:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabEmis"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabCtps">
                          CTPS:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCtps"
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol md="8" className="form-group">
                        <label className="grey-text" htmlFor="collabAddress">
                          Endereço:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabAddress"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label
                          className="grey-text"
                          htmlFor="collabNeighborhood"
                        >
                          Bairro:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabNeighborhood"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabCity">
                          Cidade:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCity"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabState">
                          Estado:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabState"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabCountry">
                          País:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCountry"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabZipcode">
                          CEP:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="collabZipcode"
                          mask="99999-999"
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <div>
                      {this.state.alertMessage1 === "error1" ? (
                        <MDBAlert color="danger">
                          Certifique-se de que os campos foram preenchidos
                          corretamente.
                        </MDBAlert>
                      ) : null}
                    </div>

                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="cyan lighten-2 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
                    </MDBBtn>
                    <MDBBtn
                      href="/Collaborators"
                      value="Return"
                      className="btn grey lighten-1 float-right"
                    >
                      Voltar
                    </MDBBtn>
                  </form>
                </MDBTabPane>
              </MDBTabContent>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
export default AddCollaborator;
