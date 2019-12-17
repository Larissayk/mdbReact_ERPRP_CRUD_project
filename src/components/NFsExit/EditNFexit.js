import React, { Component } from "react";
import {
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBTabContent,
  MDBTabPane,
  MDBCol,
  MDBRow,
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
  // Object.values(rest).forEach(val => {
  //   val === null && (valid = false);
  // });

  return valid;
};

class EditNFexit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      ano: "",
      tipo_nf: "",
      nota_fiscal: "",
      status: "",
      cnpj: "",
      empresa_emitente: "",
      identif_contrato: "",
      status_contrato: "",
      contrato: "",
      data_contrato: "",
      ordem_compra: "",
      parcela: "",
      data_de_emissao: "",
      data_prev_pagto: "",
      data_real_pagto: "",
      valor_bruto: "",
      irrf: "",
      pis_cofins: "",
      valor_liquido: "",
      obs: "",
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        nota_fiscal: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getNFExitDetails();
  }

  getNFExitDetails() {
    let NFExitId = this.props.match.params.id;
    axios
      .get(`API URL NFSAIDA/${NFExitId}`)
      .then(response => {
        this.setState(
          {
            id: response.data.id,
            nome: response.data.nome,
            status: response.data.status,
            ano: response.data.ano,
            tipo_nf: response.data.tipo_nf,
            nota_fiscal: response.data.nota_fiscal,
            cnpj: response.data.cnpj,
            empresa_emitente: response.data.empresa_emitente,
            identif_contrato: response.data.identif_contrato,
            status_contrato: response.data.status_contrato,
            contrato: response.data.contrato,
            data_contrato: response.data.data_contrato,
            ordem_compra: response.data.ordem_compra,
            parcela: response.data.parcela,
            data_de_emissao: response.data.data_de_emissao,
            data_prev_pagto: response.data.data_prev_pagto,
            data_real_pagto: response.data.data_real_pagto,
            valor_bruto: response.data.valor_bruto,
            irrf: response.data.irrf,
            pis_cofins: response.data.pis_cofins,
            valor_liquido: response.data.valor_liquido,
            obs: response.data.obs
          },
          () => {
            console.log("Get:", this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editNFexit(newNFExit) {
    //console.log(newProvider);
    axios
      .request({
        method: "PUT",
        url: `API URL NFSAIDA/${this.state.id}`,
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
    // this.editNFexit(newNFExit);
    e.preventDefault();
    // console.log(newNFExit);

    if (formValid(this.state)) {
      this.editNFexit(newNFExit);
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

    this.setState({ formErrors, [name]: value }, () =>
      console.log("handleChange:", this.state)
    );
  };

  // handleInputChange(e) {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

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
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
                <strong>EDITAR NF-SAÍDA</strong>
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
                              name="ano"
                              ref="year"
                              value={this.state.ano}
                              onChange={this.handleChange}
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
                                name="tipo_nf"
                                ref="type"
                                value={this.state.tipo_nf}
                                onChange={this.handleChange}
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
                          value={this.state.tipo_nf}
                          onChange={this.handleInputChange}
                        /> */}
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="number">
                              Nº NF:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="number"
                              name="nota_fiscal"
                              value={this.state.nota_fiscal}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="emissor">
                              Emissor:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="empresa_emitente"
                              ref="emissor"
                              value={this.state.empresa_emitente}
                              onChange={this.handleChange}
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
                              value={this.state.cnpj}
                              onChange={this.handleChange}
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
                              name="identif_contrato"
                              ref="contractId"
                              value={this.state.identif_contrato}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="contract_status"
                            >
                              Status: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <div>
                              <select
                                className="browser-default custom-select"
                                name="status"
                                ref="status"
                                value={this.state.status}
                                onChange={this.handleChange}
                              >
                                <option value="Ok">Ok</option>
                                <option value="CANC">Cancelado</option>
                              </select>
                            </div>
                            {/* <input
                          className="form-control"
                          type="text"
                          name="contract_status"
                          ref="contract_status"
                          value={this.state.status_contrato}
                          onChange={this.handleInputChange}
                        /> */}
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="contract">
                              Nº Contrato:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="contrato"
                              ref="contract"
                              value={this.state.contrato}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="contractDate">
                              Data:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="data_contrato"
                              ref="contractDate"
                              value={this.state.data_contrato}
                              onChange={this.handleChange}
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
                          href="/NFsExit"
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
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="emissionDate">
                              Data Emissão{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="data_de_emissao"
                              ref="emissionDate"
                              value={this.state.data_de_emissao}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="prevPg">
                              Data Prévia{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="data_prev_pagto"
                              ref="prevPg"
                              value={this.state.data_prev_pagto}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="realPg">
                              Data Real:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="data_real_pagto"
                              ref="realPg"
                              value={this.state.data_real_pagto}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="order">
                              Ordem de Compra:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="ordem_compra"
                              ref="order"
                              value={this.state.ordem_compra}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="portion">
                              Parcela:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="parcela"
                              ref="portion"
                              value={this.state.parcela}
                              onChange={this.handleChange}
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
                              name="valor_bruto"
                              ref="value"
                              value={this.state.valor_bruto}
                              onChange={this.handleChange}
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
                              value={this.state.irrf}
                              onChange={this.handleChange}
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
                              value={this.state.pis_cofins}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="totalValue">
                              Valor Líquido:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="valor_liquido"
                              ref="totalValue"
                              value={this.state.valor_liquido}
                              onChange={this.handleChange}
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
                                value={this.state.obs}
                                onChange={this.handleChange}
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
                          className="cyan lighten-2 float-right"
                        >
                          <MDBIcon far icon="save" /> Salvar
                        </MDBBtn>
                        <MDBBtn
                          href="/NFsExit"
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
            <MDBBtn
              size="lg"
              href="/NFsExit/add"
              className="px-3 py-3 btn light-blue darken-4 circle-btn"
            >
              <MDBIcon size="lg" className="text-white" icon="plus" />
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default EditNFexit;
