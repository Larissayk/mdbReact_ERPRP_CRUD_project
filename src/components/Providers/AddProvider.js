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

class AddProvider extends Component {
  state = {
    activeItem: "1"
  };

  addProvider(newProvider) {
    axios
      .request({
        method: 'POST',
        url: "http://localhost/api/Fornecedores",
        data: newProvider
      })
      .then(response => {
        this.props.history.push("/Providers");
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    const newProvider = {
      NOME_EMPRESA: this.refs.name.value,
      STATUS: this.refs.status.value,
    //   END_EMPRESA: this.refs.adress.value,
      CNPJ: this.refs.cnpj.value,
    //   DT_INICIO: this.refs.startDate.value,
    //   DT_FIM: this.refs.endDate.value,
    //   BAIRRO: this.refs.neighborhood.value,
    //   MUNICIPIO: this.refs.municipality.value,
    //   CIDADE: this.refs.city.value,
    //   ESTADO: this.refs.state.value,
    //   PAIS: this.refs.country.value,
    //   CEP: this.refs.cep.value,
    //   TEL_COM: this.refs.phone.value,
    //   CEL_COM: this.refs.mobile.value,
    //   SIMPLES: this.refs.simples.value,
    //   RETER_ISS_SP: this.refs.issSP.value,
    //   CERT_MUN: this.refs.certMunicipal.value,
    //   CERT_EST: this.refs.certState.value,
    //   CERT_FED: this.refs.certFederal.value,
    //   IE: this.refs.ie.value,
    //   CCM: this.refs.ccm.value,
    //   TIPO: this.refs.accountType.value,
    //   BCO: this.refs.bankCode.value,
    //   NOME_BANCO: this.refs.bank.value,
    //   AG: this.refs.agency.value,
    //   CC: this.refs.accountNumb.value
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
        <MDBCard className="mt-3 mb-4">
          <MDBCardBody className="pt-0">
            <Link className="float-right mr-2 mt-4" to="/Providers">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
                Adicionar Fornecedor
              </MDBCardTitle>
            </MDBCardHeader>

            <MDBContainer>
              <MDBNav className="nav-tabs">
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
                          name="NOME_EMPRESA"
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
                          name="STATUS"
                          ref="status"
                        />
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
                          ref="minicipality"
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

                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="deep-orange darken-3 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
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
                          type="text"
                          name="TIPO"
                          ref="accountType"
                        />
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
                        <label className="grey-text" htmlFor="AccountNumb">
                          Nº Conta:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="CC"
                          ref="AccountNumb"
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
                          name="SIMPLES"
                          ref="simples"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="issSP">
                          Reter ISS-SP:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="RETER_ISS_SP"
                          ref="issSP"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="deep-orange darken-3 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
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
