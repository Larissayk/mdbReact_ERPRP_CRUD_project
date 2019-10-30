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
      empresa: null,
      data_inicio: null,
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        empresa: "",
        cnpj: "",
        data_inicio: ""
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
      cnpj: this.refs.cnpj.value,
      insc_estadual: this.refs.insc_estadual.value,
      insc_municipal: this.refs.insc_municipal.value,
      status: this.refs.status.value,
      empresa: this.refs.empresa.value,
      endereco: this.refs.endereco.value,
      cep: this.refs.cep.value,
      bairro: this.refs.bairro.value,
      municipio: this.refs.municipio.value,
      uf: this.refs.uf.value,
      pais: this.refs.pais.value,
      data_inicio: this.refs.data_inicio.value,
      data_fim: this.refs.data_fim.value,
      contato1: this.refs.contato1.value,
      cargo1: this.refs.cargo1.value,
      celular: this.refs.celular.value,
      email_contato: this.refs.email_contato.value,
      email: this.refs.email_contato.value,
      telefone: this.refs.telefone.value
    };
    e.preventDefault();

    if (formValid(this.state)) {
      this.AddCustomer(newCustomer);
      console.log(`
        --SUBMITTING--
        Nome: ${this.state.empresa}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      this.setState({ alertMessage1: "error1" }, () => {
        console.log("alerta:", this.state.alertMessage1);
      });
      setTimeout(() => this.setState({ alertMessage1: "erro1" }), 2000);
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
      case "empresa":
        formErrors.empresa = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "cnpj":
        formErrors.cnpj = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "data_inicio":
        formErrors.data_inicio = value.length < 1 ? "Campo obrigatório." : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <div>
              {this.state.alertMessage === "success" ? (
                <SuccessMessage />
              ) : null}
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
                            <label className="grey-text" htmlFor="empresa">
                              Nome: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <input
                              name="empresa"
                              className={
                                formErrors.empresa.length > 0
                                  ? "form-control error1"
                                  : "form-control"
                              }
                              type="text"
                              ref="empresa"
                              autoFocus
                              onChange={this.handleChange}
                            />
                            {formErrors.empresa.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.empresa}
                              </span>
                            )}
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
                              name="cnpj"
                            />
                            {formErrors.cnpj.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.cnpj}
                              </span>
                            )}
                          </MDBCol>
                          <MDBCol md="2" className="form-group ">
                            <label className="grey-text" htmlFor="status">
                              Status: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <div>
                              <select
                                className="browser-default custom-select"
                                ref="status"
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
                            <label className="grey-text" htmlFor="data_inicio">
                              Data de início:{" "}
                              <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <InputMask
                              className={
                                formErrors.data_inicio.length > 0
                                  ? "form-control error1"
                                  : "form-control"
                              }
                              type="text"
                              ref="data_inicio"
                              mask="99/99/9999"
                              onChange={this.handleChange}
                              name="data_inicio"
                            />
                            {formErrors.data_inicio.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.data_inicio}
                              </span>
                            )}
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="4" className="form-group ">
                            <label className="grey-text" htmlFor="contato1">
                              Contato:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="contato1"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group ">
                            <label className="grey-text" htmlFor="cargo1">
                              Cargo do contato:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="cargo1"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="email_contato"
                            >
                              Email do contato:
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="email_contato"
                              name="email_contato"
                            />
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="data_fim">
                              Data de término:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              ref="data_fim"
                              mask="99/99/9999"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="4" className="form-group">
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
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="celular">
                              Celular:
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              ref="celular"
                              mask="(99) 9 9999-9999"
                              name="celular"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="email">
                              Email:
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="email"
                              name="email"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="4" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="insc_municipal"
                            >
                              Insc. Municipal:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="insc_municipal"
                              name="insc_municipal"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="insc_estadual"
                            >
                              Insc. Estadual:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="insc_estadual"
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
                            <label className="grey-text" htmlFor="municipio">
                              Município:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="municipio"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="uf">
                              UF:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="uf"
                            />
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
                          className="cyan lighten-2 float-right"
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
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default AddCustomer;
