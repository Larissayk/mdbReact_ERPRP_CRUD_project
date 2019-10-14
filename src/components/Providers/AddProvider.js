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
  MDBCardHeader,
  MDBCardTitle
} from "mdbreact";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";

class AddProvider extends Component {
  state = {
    activeItem: "1",
    alertMessage:""
  };

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
    this.addProvider(newProvider);
    console.log(newProvider);
    e.preventDefault();
  }

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    return (
      <MDBContainer className="main-body">
        <div>
          {this.state.alertMessage == "success" ? <SuccessMessage /> : null}
          {this.state.alertMessage == "error" ? <ErrorMessage /> : null}
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
                      <MDBCol md="6" className="form-group">
                        <label className="grey-text" htmlFor="name">
                          Nome:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="name"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="status">
                          Status:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="status"
                          name="status"
                        />
                        {/* <div>
                          <select
                            className="browser-default custom-select"
                            ref="status"
                            name="status"
                          >
                            <option>Ativo</option>
                            <option>Inativo</option>
                          </select>
                        </div> */}
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="startDate">
                          Data de início:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="DT_INICIO"
                          ref="startDate"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="endDate">
                          Data de término:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="DT_FIM"
                          ref="endDate"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="cnpj">
                          CNPJ:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="CNPJ"
                          ref="cnpj"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="phone">
                          Telefone:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="TEL_COM"
                          ref="phone"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="mobile">
                          Celular:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="CEL_COM"
                          ref="mobile"
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
                        <input
                          className="form-control"
                          type="text"
                          name="CEP"
                          ref="cep"
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr/>

                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="light-blue darken-4 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
                    </MDBBtn>
                    <MDBBtn
                      href="/Providers"
                      value="Return"
                      className="btn grey lighten-1 float-right"
                    >
                      <MDBIcon icon="undo-alt" /> Voltar
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
                        <input
                          className="form-control"
                          name="tipo"
                          ref="accountType"
                          type="text"
                        />
                        {/* <div>
                          <select
                            className="browser-default custom-select"
                            name="tipo"
                            ref="accountType"
                          >
                            <option></option>
                            <option>Pessoa Física</option>
                            <option>Pessoa Jurídica</option>
                          </select>
                        </div> */}
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
                        <label className="grey-text" htmlFor="certMunicipal">
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
                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="light-blue darken-4 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
                    </MDBBtn>
                    <MDBBtn
                      href="/Providers"
                      value="Return"
                      className="btn grey lighten-1 float-right"
                    >
                      <MDBIcon icon="undo-alt" /> Voltar
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
export default AddProvider;
