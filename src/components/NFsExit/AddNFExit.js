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
  MDBCardTitle
} from "mdbreact";
import axios from "axios";
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";

class AddNFExit extends Component {
  state = {
    activeItem: "1",
    alertMessage: ""
  };

  AddNFExit(newNFExit) {
    axios
      .request({
        method: "POST",
        url: "http://127.0.0.1:8000/api/nota_saida/",
        data: newNFExit
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/NFsExit"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  onSubmit(e) {
    const newNFExit = {
      ano: this.refs.year.value,
      tipo_nf: this.refs.type.value,
      nota_fiscal: this.refs.number.value,
      cnpj: this.refs.cnpj.value,
      empresa_emitente: this.refs.emissor.value,
      identif_contrato: this.refs.contractId.value,
      status_contrato: this.refs.contract_status.value,
      contrato: this.refs.contract.value,
      data_contrato: this.refs.contractDate.value,
      ordem_compra: this.refs.order.value,
      parcela: this.refs.portion.value,
      data_de_emissao: this.refs.emissionDate.value,
      data_prev_pagto: this.refs.prevPg.value,
      data_real_pagto: this.refs.realPg.value,
      valor_bruto: this.refs.value.value,
      irrf: this.refs.irrf.value,
      pis_cofins: this.refs.pis_cofins.value,
      valor_liquido: this.refs.totalValue.value,
      obs: this.refs.obs.value
    };
    this.AddNFExit(newNFExit);
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
        <div>
          {this.state.alertMessage == "success" ? <SuccessMessage /> : null}
          {this.state.alertMessage == "error" ? <ErrorMessage /> : null}
        </div>
        <MDBCard className="mt-3 mb-4">
          <MDBCardTitle style={{ fontSize: 28 }}>
            <strong>NOVA NF-SAÍDA</strong>
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
                        <label className="grey-text" htmlFor="year">
                          Ano:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="year"
                          ref="year"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="type">
                          Tipo:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="type"
                          ref="type"
                        />
                      </MDBCol>
                      <MDBCol md="1" className="form-group">
                        <label className="grey-text" htmlFor="number">
                          Nº NF:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="number"
                          ref="number"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="emissor">
                          Emissor:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="emissor"
                          ref="emissor"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cnpj">
                          CNPJ:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="cnpj"
                          ref="cnpj"
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <h5 className="grey-text mb-3 ml-3">Contrato</h5>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="5" className="form-group">
                        <label className="grey-text" htmlFor="contractId">
                          Identificação:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="contractId"
                          ref="contractId"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="status">
                          Status:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="status"
                          ref="contract_status"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="contract">
                          Nº Contrato:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="contract"
                          ref="contract"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="contract">
                          Data:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="contract"
                          ref="contractDate"
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="light-blue darken-4 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
                    </MDBBtn>
                    <MDBBtn
                      href="/NFsExit"
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
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="data_de_emissao">
                          Data Emissão{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="data_de_emissao"
                          ref="emissionDate"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="prevPg">
                          Data Prévia{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="prevPg"
                          ref="prevPg"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="realPg">
                          Data Real:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="realPg"
                          ref="realPg"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="ordem_compra">
                          Ordem de Compra:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="ordem_compra"
                          ref="order"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="parcela">
                          Parcela:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="parcela"
                          ref="portion"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="value">
                          Valor Bruto:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="value"
                          ref="value"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="irrf">
                          IRRF (15%):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="irrf"
                          ref="irrf"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="pis_cofins">
                          PIS/COFINS (4,65%):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="pis_cofins"
                          ref="pis_cofins"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="totalValue">
                          Valor Líquido:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="totalValue"
                          ref="totalValue"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12">
                        <div className="form-group grey-text">
                          <label className="grey-text" htmlFor="obs">
                            Comentários:{" "}
                          </label>
                          <textarea
                            className="form-control"
                            type="text"
                            name="obs"
                            ref="obs"
                            rows="5"
                          />
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="light-blue darken-4 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
                    </MDBBtn>
                    <MDBBtn
                      href="/NFsExit"
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
export default AddNFExit;
