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

class EditProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      cnpj: "",
      status: "",
      nome: "",
      certf_est: "",
      certf_mun: "",
      certf_fed: "",
      data_inicio: "",
      data_fim: "",
      ie: "",
      ccm: "",
      municipio: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "",
      simples: "",
      reter_iss_sp: "",
      telefone: "",
      celular: "",
      tipo: "",
      bco: "",
      nome_banco: "",
      ag: "",
      cep: "",
      cc: "",
      endereco: "",
      activeItem: "1",
      alertMessage: "",
      formErrors: {
        nome: "",
        cnpj: "",
        data_inicio: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getProviderDetails();
  }

  getProviderDetails() {
    let providerId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/fornecedores/${providerId}`)
      .then(response => {
        this.setState(
          {
            id: response.data.id,
            cnpj: response.data.cnpj,
            status: response.data.status,
            nome: response.data.nome,
            certf_fed: response.data.certf_fed,
            certf_est: response.data.certf_est,
            certf_mun: response.data.certf_mun,
            data_inicio: response.data.data_inicio,
            data_fim: response.data.data_fim,
            ie: response.data.ie,
            ccm: response.data.ccm,
            municipio: response.data.municipio,
            estado: response.data.estado,
            endereco: response.data.endereco,
            cidade: response.data.cidade,
            pais: response.data.pais,
            simples: response.data.simples,
            reter_iss_sp: response.data.reter_iss_sp,
            telefone: response.data.telefone,
            celular: response.data.celular,
            tipo: response.data.tipo,
            bco: response.data.bco,
            nome_banco: response.data.nome_banco,
            ag: response.data.ag,
            cep: response.data.cep,
            cc: response.data.cc,
            bairro: response.data.bairro
          },
          () => {
            console.log("Get:", this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editProvider(newProvider) {
    axios
      .request({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/fornecedores/${this.state.id}`,
        data: newProvider
      })
      .then(response => {
        console.log(`Put: ${response.data}`);
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Providers"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log("Erro:", err);
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
    // this.editProvider(newProvider);
    e.preventDefault();
    // console.log(newProvider);

    if (formValid(this.state)) {
      this.editProvider(newProvider);
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

  // handleInputChange(e) {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "nome":
        formErrors.nome = value.length === 0 ? "Campo obrigatório." : "";
        break;
      case "cnpj":
        formErrors.cnpj = value.length === 0 ? "Campo obrigatório." : "";
        break;
      case "data_inicio":
        formErrors.data_inicio = value.length === 0 ? "Campo obrigatório." : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () =>
      console.log("handleChange:", this.state)
    );
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
          <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
            <strong>EDITAR FORNECEDOR</strong>
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
                  <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <MDBRow className="mt-4">
                      <MDBCol md="6" className="form-group mb-0">
                        <label className="grey-text" htmlFor="name">
                          Nome: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className={
                            formErrors.nome.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="name"
                          name="nome"
                          value={this.state.nome}
                          onChange={this.handleChange}
                        />
                        {formErrors.nome.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.nome}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="status">
                          Status: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="status"
                            name="status"
                            value={this.state.status}
                            onChange={this.handleChange}
                          >
                            <option value="Ativo">Ativo</option>
                            <option value="Desligado">Desligado</option>
                          </select>
                        </div>
                        {/* <input
                          className="form-control"
                          ref="status"
                          name="status"
                          value={this.state.status}
                          onChange={this.handleInputChange}
                        /> */}
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="startDate">
                          Data de início:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className={
                            formErrors.data_inicio.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="startDate"
                          name="data_inicio"
                          value={this.state.data_inicio}
                          onChange={this.handleChange}
                        />
                        {formErrors.data_inicio.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.data_inicio}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="endDate">
                          Data de término:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="endDate"
                          name="data_fim"
                          value={this.state.data_fim}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="cnpj">
                          CNPJ: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className={
                            formErrors.cnpj.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="cnpj"
                          name="cnpj"
                          value={this.state.cnpj}
                          onChange={this.handleChange}
                          mask="99.999.999/9999-99"
                        />
                        {formErrors.cnpj.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cnpj}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="phone">
                          Telefone:{" "}
                        </label>
                        <InputMask
                          className="form-control "
                          type="text"
                          ref="phone"
                          name="telefone"
                          value={this.state.telefone}
                          onChange={this.handleChange}
                          mask="(99) 9999-9999"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="mobile">
                          Celular:{" "}
                        </label>
                        <InputMask
                          className="form-control "
                          type="text"
                          ref="mobile"
                          name="celular"
                          value={this.state.celular}
                          onChange={this.handleChange}
                          mask="(99) 9 9999-9999"
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
                          className="form-control "
                          type="text"
                          ref="address"
                          name="endereco"
                          value={this.state.endereco}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="neighborhood">
                          Bairro:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="neighborhood"
                          name="bairro"
                          value={this.state.bairro}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="municipality">
                          Município:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="municipality"
                          name="municipio"
                          value={this.state.municipio}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="city">
                          Cidade:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="city"
                          name="cidade"
                          value={this.state.cidade}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="state">
                          Estado:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="state"
                          name="estado"
                          value={this.state.estado}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="country">
                          País:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="country"
                          name="pais"
                          value={this.state.pais}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cep">
                          CEP:{" "}
                        </label>
                        <InputMask
                          className="form-control "
                          type="text"
                          ref="cep"
                          name="cep"
                          value={this.state.cep}
                          onChange={this.handleChange}
                          mask="99999-999"
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
                        <div>
                          <select
                            className="browser-default custom-select"
                            name="tipo"
                            ref="accountType"
                            type="text"
                            value={this.state.tipo}
                            onChange={this.handleChange}
                          >
                            <option>Selecione...</option>
                            <option option value="Pessoa Física">
                              Pessoa Física
                            </option>
                            <option option value="Pessoa Jurídica">
                              Pessoa Jurídica
                            </option>
                          </select>
                        </div>
                        {/* <input
                          className="form-control "
                          ref="accountType"
                          name="tipo"
                          value={this.state.tipo}
                          onChange={this.handleInputChange}
                        /> */}
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="bankCode">
                          Cód. Banco:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="bankCode"
                          name="bco"
                          value={this.state.bco}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="6" className="form-group">
                        <label className="grey-text" htmlFor="bank">
                          Banco:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="bank"
                          name="nome_banco"
                          value={this.state.nome_banco}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="agency">
                          Agência:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="agency"
                          name="ag"
                          value={this.state.ag}
                          onChange={this.handleChange}
                        />
                      </MDBCol>

                      <MDBCol md="5" className="form-group">
                        <label className="grey-text" htmlFor="accountNumb">
                          Nº Conta:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="accountNumb"
                          name="cc"
                          value={this.state.cc}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="ccm">
                          CCM:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="ccm"
                          name="ccm"
                          value={this.state.ccm}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="certMunicipal">
                          Certidão Municipal:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="certMunicipal"
                          name="certf_mun"
                          value={this.state.certf_mun}
                          onChange={this.handleChange}
                        />
                      </MDBCol>

                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="certState">
                          Certidão Estadual:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="certState"
                          name="certf_est"
                          value={this.state.certf_est}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="certFederal">
                          Certidão Federal:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="certFederal"
                          name="certf_fed"
                          value={this.state.certf_fed}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="ie">
                          IE:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="ie"
                          name="ie"
                          value={this.state.ie}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="simples">
                          Simples:{" "}
                        </label>
                        <input
                          className="form-control "
                          ref="simples"
                          name="simples"
                          value={this.state.simples}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="issSP">
                          Reter ISS-SP:{" "}
                        </label>
                        <div>
                          <input
                            className="form-control "
                            ref="issSP"
                            name="reter_iss_sp"
                            value={this.state.reter_iss_sp}
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
        <MDBBtn
          size="lg"
          href="/Providers/add"
          className="px-3 py-3 btn light-blue darken-4 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default EditProvider;
