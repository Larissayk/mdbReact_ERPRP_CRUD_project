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

class AddContract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cod_contrato_rp: null,
      cod_contrato: null,
      tipo_contrato: null,
      cnpj_contratante: null,
      cnpj_contratada: null,
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        cod_contrato_rp: "",
        cod_contrato: "",
        tipo_contrato: "",
        cnpj_contratante: "",
        cnpj_contratada: ""
      }
    };
  }

  AddContract(newContract) {
    axios
      .request({
        method: "POST",
        url: "API URL CONTRATOS",
        data: newContract
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Contracts"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  onSubmit(e) {
    const newContract = {
      cod_contrato_rp: this.refs.cod_contrato_rp.value,
      cod_contrato: this.refs.cod_contrato.value,
      tipo_contrato: this.refs.tipo_contrato.value,
      nome_contratante: this.refs.nome_contratante.value,
      apelido_contratante: this.refs.apelido_contratante.value,
      cnpj_contratante: this.refs.cnpj_contratante.value,
      end_empresa_contratante: this.refs.end_empresa_contratante.value,
      cod_cep_contratante: this.refs.cod_cep_contratante.value,
      nome_contratada: this.refs.nome_contratada.value,
      apelido_contratada: this.refs.apelido_contratada.value,
      cnpj_contratada: this.refs.cnpj_contratada.value,
      end_empresa_contratada: this.refs.end_empresa_contratada.value,
      cod_cep_contratada: this.refs.cod_cep_contratada.value,
      objeto_contrato: this.refs.objeto_contrato.value,
      valor_contrato: this.refs.valor_contrato.value,
      data_assinatura_contrato: this.refs.data_assinatura_contrato.value,
      data_inicio_contrato: this.refs.data_inicio_contrato.value,
      data_fim_contrato: this.refs.data_fim_contrato.value,
      prazo_vigencia_contrato: this.refs.prazo_vigencia_contrato.value,
      prorrogacao_contrato: this.refs.prorrogacao_contrato.value,
      prazo_para_prorrogacao_contrato: this.refs.prazo_para_prorrogacao_contrato
        .value,
      reajuste_contrato: this.refs.reajuste_contrato.value,
      condicao_fat_contrato: this.refs.condicao_fat_contrato.value
    };
    e.preventDefault();
    // console.log(newCollaborator);

    if (formValid(this.state)) {
      this.AddContract(newContract);
      console.log(`
        --SUBMITTING--
        Cód. RP: ${this.state.cod_contrato_rp}
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
      case "cod_contrato_rp":
        formErrors.cod_contrato_rp =
          value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "cod_contrato":
        formErrors.cod_contrato = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "tipo_contrato":
        formErrors.tipo_contrato = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "cnpj_contratante":
        formErrors.cnpj_contratante =
          value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "cnpj_contratada":
        formErrors.cnpj_contratada =
          value.length < 1 ? "Campo obrigatório." : "";
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
                <strong>NOVO CONTRATO</strong>
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
                        Dados Contratante
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        to="#"
                        active={this.state.activeItem === "3"}
                        onClick={this.toggle("3")}
                        role="tab"
                      >
                        Dados Contratada
                      </MDBNavLink>
                    </MDBNavItem>
                    {/* <MDBNavItem>
                  <MDBNavLink
                    to="#"
                    active={this.state.activeItem === "4"}
                    onClick={this.toggle("4")}
                    role="tab"
                  >
                    Anexos
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to="#"
                    active={this.state.activeItem === "5"}
                    onClick={this.toggle("5")}
                    role="tab"
                  >
                    Aditivos
                  </MDBNavLink>
                </MDBNavItem> */}
                  </MDBNav>

                  <MDBTabContent activeItem={this.state.activeItem}>
                    <MDBTabPane tabId="1" role="tabpanel">
                      <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <MDBRow className="mt-4">
                          <MDBCol md="3" className="form-group mb-0">
                            <label
                              className="grey-text"
                              htmlFor="cod_contrato_rp"
                            >
                              Código RP: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <input
                              name="cod_contrato_rp"
                              className={
                                formErrors.cod_contrato_rp.length > 0
                                  ? "form-control error1"
                                  : "form-control"
                              }
                              type="text"
                              ref="cod_contrato_rp"
                              autoFocus
                              onChange={this.handleChange}
                            />
                            {formErrors.cod_contrato_rp.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.cod_contrato_rp}
                              </span>
                            )}
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="cod_contrato">
                              Cód. Contrato:{" "}
                              <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <InputMask
                              className={
                                formErrors.cod_contrato.length > 0
                                  ? "form-control error1"
                                  : "form-control"
                              }
                              type="text"
                              ref="cod_contrato"
                              name="cod_contrato"
                              onChange={this.handleChange}
                            />
                            {formErrors.cod_contrato.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.cod_contrato}
                              </span>
                            )}
                          </MDBCol>
                          <MDBCol md="2" className="form-group ">
                            <label
                              className="grey-text"
                              htmlFor="tipo_contrato"
                            >
                              Tipo: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <div>
                              <select
                                className={
                                  formErrors.tipo_contrato.length > 0
                                    ? "browser-default custom-select error1"
                                    : "browser-default custom-select"
                                }
                                ref="tipo_contrato"
                                name="tipo_contrato"
                                onChange={this.handleChange}
                              >
                                <option value="cliente">Cliente</option>
                                <option value="fornecedor">Fornecedor</option>
                              </select>
                            </div>
                            {formErrors.tipo_contrato.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.tipo_contrato}
                              </span>
                            )}
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="data_assinatura_contrato"
                            >
                              Data assinatura:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              ref="data_assinatura_contrato"
                              mask="99/99/9999"
                            />
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="data_inicio_contrato"
                            >
                              Data de início:{" "}
                              {/* <span style={{ color: "red" }}>*</span>{" "} */}
                            </label>
                            <InputMask
                              className="form-control"
                              //   {
                              //     formErrors.codigo.length > 0
                              //       ? "form-control error1"
                              //       : "form-control"
                              //   }
                              type="text"
                              ref="data_inicio_contrato"
                              mask="99/99/9999"
                            />
                            {/* {formErrors.dt_inicio.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.dt_inicio}
                          </span>
                        )} */}
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="3" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="valor_contrato"
                            >
                              Valor:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="valor_contrato"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group ">
                            <label
                              className="grey-text"
                              htmlFor="prazo_vigencia_contrato"
                            >
                              Vigência (meses):{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="prazo_vigencia_contrato"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group ">
                            <label
                              className="grey-text"
                              htmlFor="prorrogacao_contrato"
                            >
                              Prorrogação:{" "}
                            </label>
                            <div>
                              <select
                                className="browser-default custom-select"
                                ref="prorrogacao_contrato"
                              >
                                <option value="">Selecionar</option>
                                <option value="Novo Acordo">Novo Acordo</option>
                                <option value="Automático">Automático</option>
                                <option value="Comunic. Email">
                                  Comunicação por Email
                                </option>
                              </select>
                            </div>
                          </MDBCol>
                          <MDBCol md="2" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="data_fim_contrato"
                            >
                              Data de término:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              ref="data_fim_contrato"
                              mask="99/99/9999"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="4" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="prazo_para_prorrogacao_contrato"
                            >
                              Prazo Prorrogação:{" "}
                            </label>
                            <div>
                              <select
                                className="browser-default custom-select"
                                ref="prazo_para_prorrogacao_contrato"
                              >
                                <option value="">Selecionar</option>
                                <option value="No ato">No ato</option>
                                <option value="30 dias">30 dias</option>
                                <option value="60 dias">60 dias</option>{" "}
                                <option value="90 dias">90 dias</option>
                              </select>
                            </div>
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="reajuste_contrato"
                            >
                              Reajuste:
                            </label>
                            <div>
                              <select
                                className="browser-default custom-select"
                                ref="reajuste_contrato"
                              >
                                <option value="">Selecionar</option>
                                <option value="IGP-M">IGP-M</option>
                                <option value="IPCA">IPCA</option>
                                <option value="INCC">INCC</option>
                              </select>
                            </div>
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="condicao_fat_contrato"
                            >
                              Cond. Faturamento:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="condicao_fat_contrato"
                              name="condicao_fat_contrato"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="12" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="objeto_contrato"
                            >
                              Descrição do contrato:{" "}
                            </label>
                            <textarea
                              className="form-control"
                              ref="objeto_contrato"
                              rows="3"
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
                          href="/Contracts"
                          value="Return"
                          className="btn grey lighten-1 float-right"
                        >
                          Voltar
                        </MDBBtn>
                      </form>
                    </MDBTabPane>

                    <MDBTabPane tabId="2" role="tabpanel">
                      <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <MDBRow className="mt-4">
                          <MDBCol md="5" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="nome_contratante"
                            >
                              Nome:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="nome_contratante"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="apelido_contratante"
                            >
                              Apelido:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="apelido_contratante"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="cnpj_contratante"
                            >
                              CNPJ: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <InputMask
                              className={
                                formErrors.cnpj_contratante.length > 0
                                  ? "form-control error1"
                                  : "form-control"
                              }
                              type="text"
                              ref="cnpj_contratante"
                              name="cnpj_contratante"
                              mask="99.999.999/9999-99"
                              onChange={this.handleChange}
                            />
                            {formErrors.cnpj_contratante.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.cnpj_contratante}
                              </span>
                            )}
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="8" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="end_empresa_contratante"
                            >
                              Endereço:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="end_empresa_contratante"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="cod_cep_contratante"
                            >
                              CEP:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              ref="cod_cep_contratante"
                              mask="99999-999"
                            />
                          </MDBCol>
                          {/* <MDBCol md="4" className="form-group">
                        <label
                          className="grey-text"
                          htmlFor="bairro_contratante"
                        >
                          Bairro:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="bairro_contratante"
                        />
                      </MDBCol> */}
                        </MDBRow>
                        {/* <MDBRow className="mb-2">
                      <MDBCol md="3" className="form-group">
                        <label
                          className="grey-text"
                          htmlFor="cidade_contratante"
                        >
                          Cidade:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="cidade_contratante"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="uf_contratante">
                          UF:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="uf_contratante"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="pais_contratante">
                          País:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="pais_contratante"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cep_contratante">
                          CEP:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="cep_contratante"
                          mask="99999-999"
                        />
                      </MDBCol>
                    </MDBRow> */}
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
                          href="/Contracts"
                          value="Return"
                          className="btn grey lighten-1 float-right"
                        >
                          Voltar
                        </MDBBtn>
                      </form>
                    </MDBTabPane>

                    <MDBTabPane tabId="3" role="tabpanel">
                      <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <MDBRow className="mt-4">
                          <MDBCol md="5" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="nome_contratada"
                            >
                              Nome:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="nome_contratada"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="apelido_contratada"
                            >
                              Apelido:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="apelido_contratada"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="cnpj_contratada"
                            >
                              CNPJ: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <InputMask
                              className={
                                formErrors.cnpj_contratada.length > 0
                                  ? "form-control error1"
                                  : "form-control"
                              }
                              type="text"
                              ref="cnpj_contratada"
                              mask="99.999.999/9999-99"
                              name="cnpj_contratada"
                              onChange={this.handleChange}
                            />
                            {formErrors.cnpj_contratada.length > 0 && (
                              <span className="errorMessageForm">
                                {formErrors.cnpj_contratada}
                              </span>
                            )}
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="8" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="end_empresa_contratada"
                            >
                              Endereço:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="end_empresa_contratada"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="cod_cep_contratada"
                            >
                              CEP:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              ref="cod_cep_contratada"
                              mask="99999-999"
                            />
                          </MDBCol>
                          {/* <MDBCol md="4" className="form-group">
                        <label
                          className="grey-text"
                          htmlFor="bairro_contratada"
                        >
                          Bairro:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="bairro_contratada"
                        />
                      </MDBCol> */}
                        </MDBRow>
                        {/* <MDBRow className="mb-2">
                      <MDBCol md="3" className="form-group">
                        <label
                          className="grey-text"
                          htmlFor="cidade_contratada"
                        >
                          Cidade:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="cidade_contratada"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="uf_contratada">
                          UF:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="uf_contratada"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="pais_contratada">
                          País:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="pais_contratada"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cep_contratada">
                          CEP:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="cep_contratada"
                          mask="99999-999"
                        />
                      </MDBCol>
                    </MDBRow> */}
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

                    {/* <MDBTabPane tabId="4" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <MDBRow className="mt-4">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cod_anexo">
                          Cód. Anexo: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                            {
                              formErrors.cod_anexo.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          type="text"
                          ref="cod_anexo"
                        />
                        {formErrors.cod_anexo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cod_anexo}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cod_contrato_rp">
                          Cód. Contrato RP:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                            {
                              formErrors.cod_contrato_rp.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          type="text"
                          ref="cod_contrato_rp"
                          onChange={this.handleChange}
                        />
                        {formErrors.cnpj_contratada.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cnpj_contratada}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="vigencia_anexo">
                          Vigência (meses):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="vigencia_anexo"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="dt_inicio_anexo">
                          Data de início:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className="form-control"
                            {
                              formErrors.codigo.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          type="text"
                          ref="dt_inicio_anexo"
                          mask="99/99/9999"
                        />
                        {formErrors.dt_inicio.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.dt_inicio}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="dt_fim_anexo">
                          Data de término:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="dt_fim_anexo"
                          mask="99/99/9999"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12" className="form-group">
                        <label className="grey-text" htmlFor="objeto_anexo">
                          Descrição do anexo:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <textarea
                          className="form-control"
                            {
                              formErrors.objeto_anexo.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          ref="objeto_anexo"
                          rows="3"
                        />
                        {formErrors.objeto_anexo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.objeto_anexo}
                          </span>
                        )}
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

                <MDBTabPane tabId="5" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <MDBRow className="mt-4">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cod_aditivo">
                          Cód. Aditivo: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                            {
                              formErrors.cod_anexo.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          type="text"
                          ref="cod_aditivo"
                        />
                        {formErrors.cod_anexo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cod_anexo}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cod_contrato_rp">
                          Cód. Contrato RP:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                            {
                              formErrors.cod_contrato_rp.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          type="text"
                          ref="cod_contrato_rp"
                          onChange={this.handleChange}
                        />
                        {formErrors.cnpj_contratada.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cnpj_contratada}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="vigencia_aditivo">
                          Vigência (meses):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="vigencia_aditivo"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label
                          className="grey-text"
                          htmlFor="dt_inicio_aditivo"
                        >
                          Data de início:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className="form-control"
                            {
                              formErrors.codigo.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          type="text"
                          ref="dt_inicio_aditivo"
                          mask="99/99/9999"
                        />
                        {formErrors.dt_inicio.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.dt_inicio}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="dt_fim_anexo">
                          Data de término:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="dt_fim_anexo"
                          mask="99/99/9999"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="valor">
                          Valor:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="valor"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group ">
                        <label className="grey-text" htmlFor="prorrogacao">
                          Prorrogação:{" "}
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="prorrogação"
                          >
                            <option value="">Selecionar</option>
                            <option value="Novo Acordo">Novo Acordo</option>
                            <option value="Automático">Automático</option>
                            <option value="Comunic. Email">
                              Comunicação por Email
                            </option>
                          </select>
                        </div>
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label
                          className="grey-text"
                          htmlFor="prazo_prorrogacao"
                        >
                          Prazo Prorrogação:{" "}
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="prazo_prorrogacao"
                          >
                            <option value="">Selecionar</option>
                            <option value="No ato">No ato</option>
                            <option value="30 dias">30 dias</option>
                            <option value="60 dias">60 dias</option>{" "}
                            <option value="90 dias">90 dias</option>
                          </select>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="reajuste">
                          Reajuste:
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="reajuste"
                          >
                            <option value="">Selecionar</option>
                            <option value="IGP-M">IGP-M</option>
                            <option value="IPCA">IPCA</option>
                            <option value="INCC">INCC</option>
                          </select>
                        </div>
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="cond_faturamento">
                          Cond. Faturamento:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="cond_faturamento"
                          name="municond_faturamentoipal"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12" className="form-group">
                        <label className="grey-text" htmlFor="objeto_anexo">
                          Descrição do aditivo:{" "}
                        </label>
                        <textarea
                          className="form-control"
                          ref="objeto_anexo"
                          rows="3"
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
                </MDBTabPane> */}
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
export default AddContract;
