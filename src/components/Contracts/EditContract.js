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

  //validate the form was filled out
  //   Object.values(rest).forEach(val => {
  //     val === "" && (valid = false);
  //   });
  // console.log("rest",rest)
  return valid;
};

class EditContract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      cod_contrato_rp: "",
      tipo_contrato: "",
      cod_contrato: "",
      nome_contratante: "",
      apelido_contratante: "",
      cnpj_contratante: "",
      end_empresa_contratante: "",
      cod_cep_contratante: "",
      nome_contratada: "",
      apelido_contratada: "",
      cnpj_contratada: "",
      end_empresa_contratada: "",
      cod_cep_contratada: "",
      objeto_contrato: "",
      valor_contrato: "",
      data_assinatura_contrato: "",
      data_inicio_contrato: "",
      data_fim_contrato: "",
      prazo_vigencia_contrato: "",
      prorrogacao_contrato: "",
      prazo_para_prorrogacao_contrato: "",
      reajuste_contrato: "",
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
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getContractDetails();
  }

  getContractDetails() {
    let contractId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/contratos/${contractId}`)
      .then(response => {
        this.setState(
          {
            id: response.data.id,
            cod_contrato_rp: response.data.cod_contrato_rp,
            cod_contrato: response.data.cod_contrato,
            tipo_contrato: response.data.tipo_contrato,
            nome_contratante: response.data.nome_contratante,
            apelido_contratante: response.data.apelido_contratante,
            cnpj_contratante: response.data.cnpj_contratante,
            end_empresa_contratante: response.data.end_empresa_contratante,
            cod_cep_contratante: response.data.cod_cep_contratante,
            nome_contratada: response.data.nome_contratada,
            apelido_contratada: response.data.apelido_contratada,
            cnpj_contratada: response.data.cnpj_contratada,
            end_empresa_contratada: response.data.end_empresa_contratada,
            cod_cep_contratada: response.data.cod_cep_contratada,
            objeto_contrato: response.data.objeto_contrato,
            valor_contrato: response.data.valor_contrato,
            data_assinatura_contrato: response.data.data_assinatura_contrato,
            data_inicio_contrato: response.data.data_inicio_contrato,
            data_fim_contrato: response.data.data_fim_contrato,
            data_fim_contrato: response.data.data_fim_contrato,
            data_fim_contrato: response.data.data_fim_contrato,
            data_fim_contrato: response.data.data_fim_contrato,
            data_fim_contrato: response.data.data_fim_contrato,
            data_fim_contrato: response.data.data_fim_contrato,
            prazo_vigencia_contrato: response.data.prazo_vigencia_contrato,
            prorrogacao_contrato: response.data.prorrogacao_contrato,
            prazo_para_prorrogacao_contrato:
              response.data.prazo_para_prorrogacao_contrato,
            reajuste_contrato: response.data.reajuste_contrato,
            condicao_fat_contrato: response.data.condicao_fat_contrato
          },
          () => {
            console.log("Get:", this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editContract(newContract) {
    axios
      .request({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/contratos/${this.state.id}`,
        data: newContract
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Contracts"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log("Erro:", err);
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

    if (formValid(this.state)) {
      this.editContract(newContract);
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
    console.log("formErrors", formErrors);

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
                <strong>EDITAR CONTRATO</strong>
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
                              value={this.state.cod_contrato_rp}
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
                              value={this.state.cod_contrato}
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
                                typ
                                ref="tipo_contrato"
                                name="tipo_contrato"
                                value={this.state.tipo_contrato}
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
                              name="data_assinatura_contrato"
                              value={this.state.data_assinatura_contrato}
                              onChange={this.handleChange}
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
                              name="data_inicio_contrato"
                              value={this.state.data_inicio_contrato}
                              onChange={this.handleChange}
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
                              name="valor_contrato"
                              value={this.state.valor_contrato}
                              onChange={this.handleChange}
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
                              name="prazo_vigencia_contrato"
                              value={this.state.prazo_vigencia_contrato}
                              onChange={this.handleChange}
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
                                name="prorrogacao_contrato"
                                value={this.state.prorrogacao_contrato}
                                onChange={this.handleChange}
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
                              name="data_fim_contrato"
                              value={this.state.data_fim_contrato}
                              onChange={this.handleChange}
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
                                name="prazo_para_prorrogacao_contrato"
                                value={this.state.prazo_prorrogacao}
                                onChange={this.handleChange}
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
                                name="reajuste_contrato"
                                value={this.state.reajuste_contrato}
                                onChange={this.handleChange}
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
                              value={this.state.condicao_fat_contrato}
                              onChange={this.handleChange}
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
                              name="objeto_contrato"
                              value={this.state.objeto_contrato}
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
                              Nome:
                              {/* <span style={{ color: "red" }}>*</span>{" "} */}
                            </label>
                            <input
                              className="form-control"
                              //   {
                              //     formErrors.nome_contratante.length > 0
                              //       ? "form-control error1"
                              //       : "form-control"
                              //   }
                              type="text"
                              ref="nome_contratante"
                              name="nome_contratante"
                              value={this.state.nome_contratante}
                              onChange={this.handleChange}
                            />
                            {/* {formErrors.nome_contratante.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.nome_contratante}
                          </span>
                        )} */}
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
                              name="apelido_contratante"
                              value={this.state.apelido_contratante}
                              onChange={this.handleChange}
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
                              mask="99.999.999/9999-99"
                              onChange={this.handleChange}
                              name="cnpj_contratante"
                              value={this.state.cnpj_contratante}
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
                              name="end_empresa_contratante"
                              value={this.state.end_empresa_contratante}
                              onChange={this.handleChange}
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
                              name="cod_cep_contratante"
                              value={this.state.cod_cep_contratante}
                              onChange={this.handleChange}
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
                          name="bairro_contratante"
                          value={this.state.bairro_contratante}
                          onChange={this.handleChange}
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
                          name="cidade_contratante"
                          value={this.state.cidade_contratante}
                          onChange={this.handleChange}
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
                          name="uf_contratante"
                          value={this.state.uf_contratante}
                          onChange={this.handleChange}
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
                          name="pais_contratante"
                          value={this.state.pais_contratante}
                          onChange={this.handleChange}
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
                          name="cep_contratante"
                          value={this.state.cep_contratante}
                          onChange={this.handleChange}
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
                              Nome:
                              {/* <span style={{ color: "red" }}>*</span>{" "} */}
                            </label>
                            <input
                              className="form-control"
                              //   {
                              //     formErrors.nome_contratada.length > 0
                              //       ? "form-control error1"
                              //       : "form-control"
                              //   }
                              type="text"
                              ref="nome_contratada"
                              name="nome_contratada"
                              value={this.state.nome_contratada}
                              onChange={this.handleChange}
                            />
                            {/* {formErrors.nome_contratada.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.nome_contratada}
                          </span>
                        )} */}
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
                              name="apelido_contratada"
                              value={this.state.apelido_contratada}
                              onChange={this.handleChange}
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
                              value={this.state.cnpj_contratada}
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
                              name="end_empresa_contratada"
                              value={this.state.end_empresa_contratada}
                              onChange={this.handleChange}
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
                              name="cod_cep_contratada"
                              value={this.state.cod_cep_contratada}
                              onChange={this.handleChange}
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
                          name="bairro_contratada"
                          value={this.state.bairro_contratada}
                          onChange={this.handleChange}
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
                          name="cidade_contratada"
                          value={this.state.cidade_contratada}
                          onChange={this.handleChange}
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
                          name="uf_contratada"
                          value={this.state.uf_contratada}
                          onChange={this.handleChange}
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
                          name="pais_contratada"
                          value={this.state.pais_contratada}
                          onChange={this.handleChange}
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
                          name="cep_contratada"
                          value={this.state.cep_contratada}
                          onChange={this.handleChange}
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
                    {/* 
                <MDBTabPane tabId="4" role="tabpanel">
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
                          name="cod_anexo"
                          value={this.state.cod_anexo}
                          onChange={this.handleChange}
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
                          name="cod_contrato_rp"
                          value={this.state.cod_contrato_rp}
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
                          name="vigencia_anexo"
                          value={this.state.vigencia_anexo}
                          onChange={this.handleChange}
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
                              formErrors.dt_inicio_anexo.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          type="text"
                          ref="dt_inicio_anexo"
                          mask="99/99/9999"
                          name="dt_inicio_anexo"
                          value={this.state.dt_inicio_anexo}
                          onChange={this.handleChange}
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
                          name="dt_fim_anexo"
                          value={this.state.dt_fim_anexo}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12" className="form-group">
                        <label className="grey-text" htmlFor="objeto_anexo">
                          Descrição do anexo:
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
                          name="objeto_anexo"
                          value={this.state.objeto_anexo}
                          onChange={this.handleChange}
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
                              formErrors.cod_aditivo.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          type="text"
                          ref="cod_aditivo"
                          name="cod_aditivo"
                          value={this.state.cod_aditivo}
                          onChange={this.handleChange}
                        />
                        {formErrors.cod_aditivo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cod_aditivo}
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
                          name="cod_contrato_rp"
                          value={this.state.cod_contrato_rp}
                          onChange={this.handleChange}
                        />
                        {formErrors.cod_contrato_rp.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cod_contrato_rp}
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
                          name="vigencia_aditivo"
                          value={this.state.vigencia_aditivo}
                          onChange={this.handleChange}
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
                              formErrors.dt_inicio_aditivo.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          type="text"
                          ref="dt_inicio_aditivo"
                          mask="99/99/9999"
                          name="dt_inicio_aditivo"
                          value={this.state.dt_inicio_aditivo}
                          onChange={this.handleChange}
                        />
                        {formErrors.dt_inicio_aditivo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.dt_inicio_aditivo}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="dt_fim_aditivo">
                          Data de término:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="dt_fim_aditivo"
                          mask="99/99/9999"
                          name="dt_fim_aditivo"
                          value={this.state.dt_fim_aditivo}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="valor_aditivo">
                          Valor:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="valor_aditivo"
                          name="valor_aditivo"
                          value={this.state.valor_aditivo}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group ">
                        <label
                          className="grey-text"
                          htmlFor="prorrogacao_aditivo"
                        >
                          Prorrogação:{" "}
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="prorrogação"
                            name="prorrogacao_aditivo"
                            value={this.state.prorrogacao_aditivo}
                            onChange={this.handleChange}
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
                            ref="prazo_prorrogacao_adit"
                            name="prazo_prorrogacao_adit"
                            value={this.state.prazo_prorrogacao_adit}
                            onChange={this.handleChange}
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
                        <label className="grey-text" htmlFor="reajuste_aditivo">
                          Reajuste:
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="reajuste_aditivo"
                            name="reajuste_aditivo"
                            value={this.state.reajuste_aditivo}
                            onChange={this.handleChange}
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
                          htmlFor="cond_faturamento_adit"
                        >
                          Cond. Faturamento:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="cond_faturamento_adit"
                          name="cond_faturamento_adit"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12" className="form-group">
                        <label className="grey-text" htmlFor="objeto_aditivo">
                          Descrição do aditivo:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <textarea
                          className="form-control"
                            {
                              formErrors.objeto_aditivo.length > 0
                                ? "form-control error1"
                                : "form-control"
                            }
                          ref="objeto_aditivo"
                          rows="3"
                          name="objeto_aditivo"
                          value={this.state.objeto_aditivo}
                          onChange={this.handleChange}
                        />
                        {formErrors.objeto_aditivo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.objeto_aditivo}
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
export default EditContract;
