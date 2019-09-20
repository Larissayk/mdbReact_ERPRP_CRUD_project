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

class AddNFExit extends Component {
  state = {
    activeItem: "1"
  };

  addProvider(newNFExit) {
    axios
      .request({
        method: "POST",
        url: "http://localhost/api/Fornecedores/",
        data: newNFExit
      })
      .then(response => {
        this.props.history.push("/NFsExit");
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    const newNFExit = {
      NOME_EMPRESA: this.refs.name.value,
      STATUS: this.refs.status.value,
      //   END_EMPRESA: this.refs.adress.value,
      CNPJ: this.refs.cnpj.value
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
    this.addProvider(newNFExit);
    console.log(newNFExit);
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
            <Link className="float-right mr-2 mt-4" to="/NFsExit">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
                Adicionar NF-Saída
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
                    Dados de Pagamento
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <MDBRow className="mt-4">
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="NFEyear">
                          Ano:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="NOME_EMPRESA"
                          ref="NFEyear"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="NFEType">
                          Tipo:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="STATUS"
                          ref="NFEType"
                        />
                      </MDBCol>
                      <MDBCol md="1" className="form-group">
                        <label className="grey-text" htmlFor="NFENumber">
                          Nº NF:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="DT_INICIO"
                          ref="NFENumber"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="NFEEmissor">
                          Emissor:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="DT_FIM"
                          ref="NFEEmissor"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFECnpj">
                          CNPJ:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="CNPJ"
                          ref="NFECnpj"
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <h5>Contrato</h5>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="6" className="form-group">
                        <label className="grey-text" htmlFor="NFEId">
                          Identificação:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="TEL_COM"
                          ref="NFEId"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="NFEStatus">
                          Status:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="CEL_COM"
                          ref="NFEStatus"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="contractNumb">
                          Nº Contrato:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="END_EMPRESA"
                          ref="contractNumb"
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
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFAmount">
                          Valor Bruto:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="TIPO"
                          ref="NFAmount"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFEIrrf">
                          IRRF (15%):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="BCO"
                          ref="NFEIrrf"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFEpiscofins">
                          PIS/COFINS (4,65%):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="NOME_BANCO"
                          ref="NFEpiscofins"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFENetValue">
                          Valor Líquido:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="AG"
                          ref="NFENetValue"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="2">
                        <MDBRow>
                          <MDBCol>
                            <label
                              className="grey-text"
                              htmlFor="cerNFEPreviousDttState"
                            >
                              Data Prévia{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="CERT_EST"
                              ref="NFEPreviousDt"
                            />
                          </MDBCol>
                        </MDBRow>
                        <br />
                        <MDBRow>
                          <MDBCol>
                            <label className="grey-text" htmlFor="NFERealDt">
                              Data Real:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="CERT_FED"
                              ref="NFERealDt"
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="10">
                        <div className="form-group grey-text">
                          <label className="grey-text" htmlFor="NFEComments">
                            Comentários:{" "}
                          </label>
                          <textarea
                            className="form-control"
                            type="text"
                            name="IE"
                            ref="NFEComments"
                            rows="5"
                          />
                        </div>
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
export default AddNFExit;
