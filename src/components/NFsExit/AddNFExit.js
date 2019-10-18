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

class AddNFExit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nota_fiscal: null,
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        nota_fiscal: ""
      }
    };
  }

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
      status: this.refs.status.value,
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
    // this.AddNFExit(newNFExit);
    // console.log(newNFExit);
    e.preventDefault();

    if (formValid(this.state)) {
      this.AddNFExit(newNFExit);
      console.log(`
        --SUBMITTING--
        Nota fiscal: ${this.state.nota_fiscal}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      this.setState({ alertMessage1: "error1" }, () => {
        console.log("alerta:", this.state.alertMessage1);
      });
      setTimeout(() => this.setState({ alertMessage1: "" }), 2000);
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "nota_fiscal":
        formErrors.nota_fiscal =
          value.length === 0 ? "Campo de preenchimento obrigatório." : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
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
                  <form onSubmit={this.onSubmit.bind(this)} noValidate>
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
                          autoFocus
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="type">
                          Tipo:{" "}
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            type="text"
                            name="type"
                            ref="type"
                          >
                            <option>Selecione...</option>
                            <option value="NF1">NF1</option>
                            <option value="NF2">NF2</option>
                            <option value="NFE">NFE</option>
                          </select>
                        </div>
                        {/* <input
                          className="form-control"
                          type="text"
                          name="type"
                          ref="type"
                        /> */}
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="number">
                          Nº NF: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className={
                            formErrors.nota_fiscal.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          name="nota_fiscal"
                          ref="number"
                          onChange={this.handleChange}
                        />
                        {formErrors.nota_fiscal.length === 0 && (
                          <span className="errorMessageForm">
                            {formErrors.nota_fiscal}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
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
                        <InputMask
                          className="form-control"
                          type="text"
                          name="cnpj"
                          ref="cnpj"
                          mask="99.999.999/9999-99"
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
                          Status: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="status"
                          >
                            <option value="Ok">Ok</option>
                            <option value="Cancelado">Cancelado</option>
                          </select>
                        </div>
                        {/* <input
                          className="form-control"
                          type="text"
                          name="status"
                          ref="contract_status"
                        /> */}
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
                        <InputMask
                          className="form-control"
                          type="text"
                          name="contract"
                          ref="contractDate"
                          mask="99/99/9999"
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
                        <InputMask
                          className="form-control"
                          type="text"
                          name="data_de_emissao"
                          ref="emissionDate"
                          mask="99/99/9999"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="prevPg">
                          Data Prévia{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          name="prevPg"
                          ref="prevPg"
                          mask="99/99/9999"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="realPg">
                          Data Real:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          name="realPg"
                          ref="realPg"
                          mask="99/99/9999"
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
