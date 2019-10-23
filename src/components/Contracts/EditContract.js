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
      cpf: null,
      status: "",
      nome: null,
      apelido: "",
      rg: "",
      orgao_emissor: "",
      ctps: "",
      data_nascimento: "",
      endereco: "",
      cep: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "",
      telefone: "",
      celular: null,
      email: "",
      email_pessoal: null,
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        nome: "",
        cnpj: "",
        status: "",
        email: ""
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
      .get(`http://127.0.0.1:8000/api/clientes/${contractId}`)
      .then(response => {
        this.setState(
          {
            // id: response.data.id,
            // nome: response.data.nome,
            // cpf: response.data.cpf,
            // status: response.data.status,
            // apelido: response.data.apelido,
            // rg: response.data.rg,
            // orgao_emissor: response.data.orgao_emissor,
            // ctps: response.data.ctps,
            // data_nascimento: response.data.data_nascimento,
            // endereco: response.data.endereco,
            // cep: response.data.cep,
            // bairro: response.data.bairro,
            // cidade: response.data.cidade,
            // estado: response.data.estado,
            // pais: response.data.pais,
            // telefone: response.data.telefone,
            // celular: response.data.celular,
            // email: response.data.email,
            // email_pessoal: response.data.email_pessoal
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
      //   cpf: this.refs.collabCpf.value,
      //   status: this.refs.collabStatus.value,
      //   nome: this.refs.collabName.value,
      //   apelido: this.refs.collabNick.value,
      //   rg: this.refs.collabRg.value,
      //   orgao_emissor: this.refs.collabEmis.value,
      //   ctps: this.refs.collabCtps.value,
      //   data_nascimento: this.refs.collabBday.value,
      //   endereco: this.refs.collabAddress.value,
      //   cep: this.refs.collabZipcode.value,
      //   bairro: this.refs.collabNeighborhood.value,
      //   cidade: this.refs.collabCity.value,
      //   pais: this.refs.collabCountry.value,
      //   estado: this.refs.collabState.value,
      //   telefone: this.refs.collabPhone.value,
      //   celular: this.refs.collabMobile.value,
      //   email: this.refs.collabEmail.value,
      //   email_pessoal: this.refs.collabPEmail.value
    };
    // this.editCollaborator(newCollaborator);
    e.preventDefault();
    // console.log(newCollaborator);

    if (formValid(this.state)) {
      this.editContract(newContract);
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

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "nome":
        formErrors.nome = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "email":
        formErrors.email = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "cnpj":
        formErrors.cnpj = value.length < 1 ? "Campo obrigatório." : "";
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
      <MDBContainer className="main-body">
        <div>
          {this.state.alertMessage === "success" ? <SuccessMessage /> : null}
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
                <MDBNavItem>
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
                </MDBNavItem>
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <MDBRow className="mt-4">
                      <MDBCol md="3" className="form-group mb-0">
                        <label className="grey-text" htmlFor="cod_RP">
                          Código RP: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          name="cod_RP"
                          className="form-control"
                          //   {
                          //     formErrors.cod_RP.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="cod_RP"
                          autoFocus
                          value={this.state.cod_RP}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.cod_RP.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cod_RP}
                          </span>
                        )} */}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="codigo">
                          Cód. Contrato: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          //   {
                          //     formErrors.codigo.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="codigo"
                          name="codigo"
                          value={this.state.codigo}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.codigo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.codigo}
                          </span>
                        )} */}
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="tipo">
                          Tipo: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="tipo"
                            name="dt_inicio"
                            value={this.state.tipo}
                            onChange={this.handleChange}
                          >
                            <option value="cliente">Cliente</option>
                            <option value="fornecedor">Fornecedor</option>
                          </select>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="dt_assinatura">
                          Data assinatura:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref=""
                          mask="99/99/9999"
                          name="dt_assinatura"
                          value={this.state.dt_assinatura}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="dt_inicio">
                          Data de início:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          //   {
                          //     formErrors.codigo.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="dt_inicio"
                          mask="99/99/9999"
                          name="dt_inicio"
                          value={this.state.dt_inicio}
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
                        <label className="grey-text" htmlFor="valor">
                          Valor:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="valor"
                          name="valor"
                          value={this.state.valor}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group ">
                        <label className="grey-text" htmlFor="vigencia">
                          Vigência (meses):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="vigencia"
                          name="vigencia"
                          value={this.state.vigencia}
                          onChange={this.handleChange}
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
                            name="prorrogacao"
                            value={this.state.prorrogacao}
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
                        <label className="grey-text" htmlFor="dt_fim">
                          Data de término:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="dt_fim"
                          mask="99/99/9999"
                          name="dt_fim"
                          value={this.state.dt_fim}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
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
                            name="dt_inicio"
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
                        <label className="grey-text" htmlFor="reajuste">
                          Reajuste:
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="reajuste"
                            name="reajuste"
                            value={this.state.reajuste}
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
                        <label className="grey-text" htmlFor="cond_faturamento">
                          Cond. Faturamento:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="cond_faturamento"
                          name="cond_faturamento"
                          value={this.state.cond_faturamento}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12" className="form-group">
                        <label className="grey-text" htmlFor="objeto_contrato">
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
                      className="light-blue darken-4 float-right"
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
                        <label className="grey-text" htmlFor="nome_contratante">
                          Nome: <span style={{ color: "red" }}>*</span>{" "}
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
                        <label className="grey-text" htmlFor="cnpj_contratante">
                          CNPJ: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          //   {
                          //     formErrors.cnpj_contratante.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="cnpj_contratante"
                          mask="99.999.999/9999-99"
                          onChange={this.handleChange}
                          name="cnpj_contratante"
                          value={this.state.cnpj_contratante}
                        />
                        {/* {formErrors.cnpj_contratante.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cnpj_contratante}
                          </span>
                        )} */}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="8" className="form-group">
                        <label className="grey-text" htmlFor="end_contratante">
                          Endereço:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="end_contratante"
                          name="end_contratante"
                          value={this.state.end_contratante}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
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
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
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
                        <label className="grey-text" htmlFor="nome_contratada">
                          Nome: <span style={{ color: "red" }}>*</span>{" "}
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
                        <label className="grey-text" htmlFor="cnpj_contratada">
                          CNPJ: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          //   {
                          //     formErrors.cnpj_contratada.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="cnpj_contratada"
                          mask="99.999.999/9999-99"
                          name="cnpj_contratada"
                          value={this.state.cnpj_contratada}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.cnpj_contratada.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cnpj_contratada}
                          </span>
                        )} */}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="8" className="form-group">
                        <label className="grey-text" htmlFor="end_contratada">
                          Endereço:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="end_contratada"
                          name="end_contratada"
                          value={this.state.end_contratada}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
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
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
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

                <MDBTabPane tabId="4" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <MDBRow className="mt-4">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cod_anexo">
                          Cód. Anexo: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                          //   {
                          //     formErrors.cod_anexo.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="cod_anexo"
                          name="cod_anexo"
                          value={this.state.cod_anexo}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.cod_anexo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cod_anexo}
                          </span>
                        )} */}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cod_contrato_rp">
                          Cód. Contrato RP:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                          //   {
                          //     formErrors.cod_contrato_rp.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="cod_contrato_rp"
                          name="cod_contrato_rp"
                          value={this.state.cod_contrato_rp}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.cnpj_contratada.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cnpj_contratada}
                          </span>
                        )} */}
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
                          //   {
                          //     formErrors.dt_inicio_anexo.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="dt_inicio_anexo"
                          mask="99/99/9999"
                          name="dt_inicio_anexo"
                          value={this.state.dt_inicio_anexo}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.dt_inicio.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.dt_inicio}
                          </span>
                        )} */}
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
                          //   {
                          //     formErrors.objeto_anexo.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          ref="objeto_anexo"
                          rows="3"
                          name="objeto_anexo"
                          value={this.state.objeto_anexo}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.objeto_anexo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.objeto_anexo}
                          </span>
                        )} */}
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
                          //   {
                          //     formErrors.cod_aditivo.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="cod_aditivo"
                          name="cod_aditivo"
                          value={this.state.cod_aditivo}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.cod_aditivo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cod_aditivo}
                          </span>
                        )} */}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cod_contrato_rp">
                          Cód. Contrato RP:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                          //   {
                          //     formErrors.cod_contrato_rp.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="cod_contrato_rp"
                          name="cod_contrato_rp"
                          value={this.state.cod_contrato_rp}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.cod_contrato_rp.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cod_contrato_rp}
                          </span>
                        )} */}
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
                          //   {
                          //     formErrors.dt_inicio_aditivo.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          type="text"
                          ref="dt_inicio_aditivo"
                          mask="99/99/9999"
                          name="dt_inicio_aditivo"
                          value={this.state.dt_inicio_aditivo}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.dt_inicio_aditivo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.dt_inicio_aditivo}
                          </span>
                        )} */}
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
                          //   {
                          //     formErrors.objeto_aditivo.length > 0
                          //       ? "form-control error1"
                          //       : "form-control"
                          //   }
                          ref="objeto_aditivo"
                          rows="3"
                          name="objeto_aditivo"
                          value={this.state.objeto_aditivo}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.objeto_aditivo.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.objeto_aditivo}
                          </span>
                        )} */}
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
              </MDBTabContent>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
export default EditContract;
