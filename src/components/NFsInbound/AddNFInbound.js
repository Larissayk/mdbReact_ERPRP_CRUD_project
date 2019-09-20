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

class AddNFInbound extends Component {
  state = {
    activeItem: "1"
  };

  addProvider(newNFInbound) {
    axios
      .request({
        method: "POST",
        url: "http://localhost/api/Fornecedores/",
        data: newNFInbound
      })
      .then(response => {
        this.props.history.push("/NFsInbound");
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    const newNFInbound = {
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
    this.addProvider(newNFInbound);
    console.log(newNFInbound);
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
            <Link className="float-right mr-2 mt-4" to="/NFsInbound">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
                Adicionar NF-Entrada
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
                        <label className="grey-text" htmlFor="NFIyear">
                          Ano:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIyear"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="NFIType">
                          Tipo:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIType"
                        />
                      </MDBCol>
                      <MDBCol md="1" className="form-group ">
                        <label className="grey-text" htmlFor="NFINumber">
                          Nº NF:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFINumber"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="NFIEmissor">
                          Emissor:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIEmissor"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFICnpj">
                          CNPJ:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFICnpj"
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <h5>Identificação</h5>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="NFIDt">
                          Data de Emissão:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIDt"
                        />
                      </MDBCol>
                      <MDBCol md="6" className="form-group">
                        <label className="grey-text" htmlFor="NFICollab">
                          Colaborador:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFICollab"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="NFIService">
                          Serviço:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIService"
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
                        <label className="grey-text" htmlFor="NFIAmount">
                          Valor Bruto:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFAmount"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFIIssSp">
                          ISS-SP:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIIssSp"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFIIrrf">
                          IRRF (15%):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIIrrf"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFIpiscofins">
                          PIS/COFINS (4,65%):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIpiscofins"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFINetValue">
                          Valor Líquido:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFINetValue"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="2">
                        <MDBRow>
                          <MDBCol>
                            <label
                              htmlFor="NFIReceivedDt"
                              className="grey-text"
                            >
                              Data Recebimento:{" "}
                            </label>
                            <input
                              type="date"
                              ref="NFIReceivedDt"
                              className="form-control"
                            />
                          </MDBCol>
                        </MDBRow>
                        <br />
                        <MDBRow>
                          <MDBCol>
                            <label htmlFor="NFIPayingDt" className="grey-text">
                              Data Pagamento:{" "}
                            </label>
                            <input
                              type="date"
                              ref="NFIPayingDt"
                              className="form-control"
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="10">
                        <div className="form-group grey-text">
                          <label htmlFor="NFIComments">Comentários: </label>
                          <textarea
                            className="form-control"
                            ref="NFIComments"
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
export default AddNFInbound;
