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
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

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

class AddProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: null,
      cnpj: null,
      dt_inicio: null,
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        nome: "",
        cnpj: "",
        dt_inicio: ""
      }
    };
  }

  addProvider(newProvider) {
    axios
      .request({
        method: "POST",
        url: "http://127.0.0.1:8000/api/fornecedores/",
        data: newProvider
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Providers"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  onSubmit(e) {
    const newProvider = {
      cnpj: this.refs.cnpj.value,
      status: this.refs.status.value,
      nome: this.refs.name.value,
      certf_fed: this.refs.certFederal.value,
      certf_est: this.refs.certState.value,
      certf_mun: this.refs.certMunicipal.value,
      data_inicio: this.refs.startDate.value,
      data_fim: this.refs.endDate.value,
      ie: this.refs.ie.value,
      ccm: this.refs.ccm.value,
      municipio: this.refs.municipality.value,
      endereco: this.refs.address.value,
      cidade: this.refs.city.value,
      bairro: this.refs.neighborhood.value,
      pais: this.refs.country.value,
      estado: this.refs.state.value,
      simples: this.refs.simples.value,
      reter_iss_sp: this.refs.issSP.value,
      telefone: this.refs.phone.value,
      celular: this.refs.mobile.value,
      tipo: this.refs.accountType.value,
      bco: this.refs.bankCode.value,
      nome_banco: this.refs.bank.value,
      ag: this.refs.agency.value,
      cep: this.refs.cep.value,
      cc: this.refs.accountNumb.value
    };
    // this.addProvider(newProvider);
    // console.log(newProvider);
    e.preventDefault();

    if (formValid(this.state)) {
      this.addProvider(newProvider);
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
      case "cnpj":
        formErrors.cnpj = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "dt_inicio":
        formErrors.dt_inicio = value.length < 1 ? "Campo obrigatório." : "";
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
                <strong>NOVO FORNECEDOR</strong>
              </MDBCardTitle>
              <hr className="mb-0" />
              <MDBCardBody className="pt-0">
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
                    <MDBNavItem>
                      <MDBNavLink
                        to="#"
                        active={this.state.activeItem === "2"}
                        onClick={this.toggle("2")}
                        role="tab"
                      >
                        Dados Financeiros
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>

                  <MDBTabContent activeItem={this.state.activeItem}>
                    <MDBTabPane tabId="1" role="tabpanel">
                      <form onSubmit={this.onSubmit.bind(this)}>
                        <MDBRow className="mt-4">
                          <MDBCol md="6" className="form-group mb-0">
                            <label className="grey-text" htmlFor="name">
                              Nome: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <input
                              className={
                                formErrors.nome.length > 0
                                  ? "form-control error1"
                                  : "form-control"
                              }
                              type="text"
                              ref="name"
                              name="nome"
                              autoFocus
                              onChange={this.handleChange}
                            />
                            {formErrors.nome.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.nome}
                              </span>
                            )}
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="status">
                              Status: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            {/* <input
                          className="form-control"
                          type="text"
                          ref="status"
                          name="status"
                        /> */}
                            <div>
                              <select
                                className="browser-default custom-select"
                                ref="status"
                              >
                                <option value="Ativo">Ativo</option>
                                <option value="Desligado">Desligado</option>
                              </select>
                            </div>
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="startDate">
                              Data de início:{" "}
                              <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <InputMask
                              className={
                                formErrors.dt_inicio.length > 0
                                  ? "form-control error1"
                                  : "form-control"
                              }
                              type="text"
                              name="dt_inicio"
                              ref="startDate"
                              mask="99/99/9999"
                              onChange={this.handleChange}
                            />
                            {formErrors.dt_inicio.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.dt_inicio}
                              </span>
                            )}
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="endDate">
                              Data de término:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              name="DT_FIM"
                              ref="endDate"
                              mask="99/99/9999"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="4" className="form-group">
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
                              name="cnpj"
                              ref="cnpj"
                              mask="99.999.999/9999-99"
                              onChange={this.handleChange}
                            />
                            {formErrors.cnpj.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.cnpj}
                              </span>
                            )}
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="phone">
                              Telefone:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              name="TEL_COM"
                              ref="phone"
                              mask="(99) 9999-9999"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="mobile">
                              Celular:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              name="CEL_COM"
                              ref="mobile"
                              mask="(99) 9 9999-9999"
                            />
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol md="6" className="form-group">
                            <label className="grey-text" htmlFor="address">
                              Endereço:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="END_EMPRESA"
                              ref="address"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="neighborhood">
                              Bairro:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="BAIRRO"
                              ref="neighborhood"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="municipality">
                              Município:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="MUNICIPIO"
                              ref="municipality"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="city">
                              Cidade:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="CIDADE"
                              ref="city"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="state">
                              Estado:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="ESTADO"
                              ref="state"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="country">
                              País:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="PAIS"
                              ref="country"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="cep">
                              CEP:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              name="CEP"
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
                          href="/Providers"
                          value="Return"
                          className="btn grey lighten-1 float-right"
                        >
                          Voltar
                        </MDBBtn>
                      </form>
                    </MDBTabPane>

                    <MDBTabPane tabId="2" role="tabpanel">
                      <form onSubmit={this.onSubmit.bind(this)}>
                        <MDBRow className="mt-4">
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="accountType">
                              Tipo de conta:{" "}
                            </label>
                            {/* <input
                          className="form-control"
                          name="tipo"
                          ref="accountType"
                          type="text"
                        /> */}
                            <div>
                              <select
                                className="browser-default custom-select"
                                name="tipo"
                                ref="accountType"
                                type="text"
                              >
                                <option>Selecione...</option>
                                <option option value="Pessoa Física">
                                  Pessoa Física
                                </option>
                                <option option value="Pessoa Jurídica">
                                  Pessoa Jurídica
                                </option>
                              </select>
                            </div>
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="bankCode">
                              Cód. Banco:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="BCO"
                              ref="bankCode"
                            />
                          </MDBCol>
                          <MDBCol md="6" className="form-group">
                            <label className="grey-text" htmlFor="bank">
                              Banco:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="NOME_BANCO"
                              ref="bank"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="agency">
                              Agência:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="AG"
                              ref="agency"
                            />
                          </MDBCol>

                          <MDBCol md="5" className="form-group">
                            <label className="grey-text" htmlFor="accountNumb">
                              Nº Conta:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="CC"
                              ref="accountNumb"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="ccm">
                              CCM:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="CCM"
                              ref="ccm"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="4" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="certMunicipal"
                            >
                              Certidão Municipal:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="CERT_MUN"
                              ref="certMunicipal"
                            />
                          </MDBCol>

                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="certState">
                              Certidão Estadual:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="CERT_EST"
                              ref="certState"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="certFederal">
                              Certidão Federal:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="CERT_FED"
                              ref="certFederal"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-2 ">
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="ie">
                              IE:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="IE"
                              ref="ie"
                            />
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="simples">
                              Simples:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="simples"
                              name="simples"
                            />
                            {/* <div>
                          <select
                            className="browser-default custom-select"
                            ref="simples"
                            name="simples"
                          >
                            <option></option>
                            <option>Sim</option>
                            <option>Não</option>
                          </select>
                        </div> */}
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="issSP">
                              Reter ISS-SP:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="issSP"
                              name="reter_iss_sp"
                            />
                            {/* <div>
                          <select
                            className="browser-default custom-select"
                            ref="issSP"
                            name="reter_iss_sp"
                          >
                            <option></option>
                            <option>Sim</option>
                            <option>Não</option>
                          </select>
                        </div> */}
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
                          href="/Providers"
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
export default AddProvider;
