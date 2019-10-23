import React, { Component } from "react";
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

class AddCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cnpj: null,
      nome: null,
      status: null,
      email: null,
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        nome: "",
        cnpj: "",
        status: "",
        email: ""
      }
    };
  }

  AddCustomer(newCustomer) {
    axios
      .request({
        method: "POST",
        url: "http://127.0.0.1:8000/api/clientes/",
        data: newCustomer
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Customers"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  onSubmit(e) {
    const newCustomer = {
    //   cpf: this.refs.collabCpf.value,
    //   status: this.refs.collabStatus.value,
    //   nome: this.refs.collabName.value,
    //   apelido: this.refs.collabNick.value,
    //   rg: this.refs.collabRg.value,
    //   orgao_emissor: this.refs.collabEmis.value,
    //   ctps: this.refs.collabCtps.value,
    //   data_nascimento: this.refs.collabBday.value,
    //   endereco: this.refs.collabAddress.value,
    //   cep: this.refs.collabZipcode.value,
    //   bairro: this.refs.collabNeighborhood.value,
    //   cidade: this.refs.collabCity.value,
    //   pais: this.refs.collabCountry.value,
    //   estado: this.refs.collabState.value,
    //   telefone: this.refs.collabPhone.value,
    //   celular: this.refs.collabMobile.value,
    //   email: this.refs.collabEmail.value,
    //   email_pessoal: this.refs.collabPEmail.value
    };
    e.preventDefault();
    // console.log(newCollaborator);

    if (formValid(this.state)) {
      this.AddCustomer(newCustomer);
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
      case "cnoj":
        formErrors.cnpj = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "email":
        formErrors.email = value.length < 1 ? "Campo obrigatório." : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

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
            <strong>NOVO CLIENTE</strong>
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
                        <label className="grey-text" htmlFor="nome">
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
                          ref="nome"
                          autoFocus
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.nome.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.nome}
                          </span>
                        )} */}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cnpj">
                          CNPJ: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className={
                            formErrors.cnpj.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="cnpj"
                          mask="99.999.999/9999-99"
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.cnpj.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cnpj}
                          </span>
                        )} */}
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
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="dt_inicio">
                          Data de início:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="dt_inicio"
                          mask="99/99/9999"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group ">
                        <label className="grey-text" htmlFor="Contato">
                          Contato:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="Contato"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group ">
                        <label className="grey-text" htmlFor="cargo">
                          Cargo:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="cargo"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="email">
                          Email: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className={
                            formErrors.email.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="email"
                          name="email"
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.email.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.email}
                          </span>
                        )} */}
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="dt_término">
                          Data de término:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="dt_término"
                          mask="99/99/9999"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="telefone">
                          Telefone:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="telefone"
                          mask="(99) 9999-9999"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabMobile">
                          Celular:
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="collabMobile"
                          mask="(99) 9 9999-9999"
                          name="celular"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="municipal">
                          Insc. Municipal:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCpf"
                          name="municipal"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="estadual">
                          Insc. Estadual:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="estadual"
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol md="8" className="form-group">
                        <label className="grey-text" htmlFor="endereco">
                          Endereço:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="endereco"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="bairro">
                          Bairro:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="bairro"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cidade">
                          Cidade:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="cidade"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="uf">
                          UF:{" "}
                        </label>
                        <input className="form-control" type="text" ref="uf" />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="pais">
                          País:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="pais"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cep">
                          CEP:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="cep"
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
                      className="light-blue darken-4 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
                    </MDBBtn>
                    <MDBBtn
                      href="/Customers"
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
export default AddCustomer;
