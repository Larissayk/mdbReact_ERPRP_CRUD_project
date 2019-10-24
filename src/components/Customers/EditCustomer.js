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

class EditCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      cnpj: null,
      empresa: null,
      insc_estadual: "",
      insc_municipal: "",
      insc_municipal: "",
      insc_municipal: "",
      data_inicio: null,
      data_fim: "",
      contato1: "",
      endereco: "",
      cep: "",
      bairro: "",
      municipio: "",
      estado: "",
      pais: "",
      telefone: "",
      celular: "",
      email: "",
      email_contato: "",
      cargo1: "",
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        empresa: "",
        cnpj: "",
        data_inicio: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getCustomersDetails();
  }

  getCustomersDetails() {
    let customerId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/clientes/${customerId}`)
      .then(response => {
        this.setState(
          {
            id: response.data.id,
            cnpj: response.data.cnpj,
            insc_estadual: response.data.insc_estadual,
            insc_municipal: response.data.insc_municipal,
            status: response.data.status,
            empresa: response.data.empresa,
            endereco: response.data.endereco,
            cep: response.data.cep,
            bairro: response.data.bairro,
            municipio: response.data.municipio,
            uf: response.data.uf,
            pais: response.data.pais,
            data_inicio: response.data.data_inicio,
            data_fim: response.data.data_fim,
            contato1: response.data.contato1,
            cargo1: response.data.cargo1,
            celular: response.data.celular,
            email_contato: response.data.email_contato,
            email: response.data.email,
            telefone: response.data.telefone
          },
          () => {
            console.log("Get:", this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editCustomer(newCustomer) {
    axios
      .request({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/clientes/${this.state.id}`,
        data: newCustomer
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Customers"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log("Erro:", err);
      });
  }

  onSubmit(e) {
    const newCustomer = {
      cnpj: this.refs.cnpj.value,
      insc_estadual: this.refs.insc_estadual.value,
      insc_municipal: this.refs.insc_municipal.value,
      status: this.refs.status.value,
      empresa: this.refs.empresa.value,
      endereco: this.refs.endereco.value,
      cep: this.refs.cep.value,
      bairro: this.refs.bairro.value,
      municipio: this.refs.municipio.value,
      uf: this.refs.uf.value,
      pais: this.refs.pais.value,
      data_inicio: this.refs.data_inicio.value,
      data_fim: this.refs.data_fim.value,
      contato1: this.refs.contato1.value,
      cargo1: this.refs.cargo1.value,
      celular: this.refs.celular.value,
      email_contato: this.refs.email_contato.value,
      email: this.refs.email.value,
      telefone: this.refs.telefone.value
    };
    // this.editCollaborator(newCollaborator);
    e.preventDefault();
    // console.log(newCollaborator);

    if (formValid(this.state)) {
      this.editCustomer(newCustomer);
      console.log(`
        --SUBMITTING--
        Nome: ${this.state.empresa}
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
      case "empresa":
        formErrors.empresa = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "data_inicio":
        formErrors.data_inicio = value.length < 1 ? "Campo obrigatório." : "";
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
            <strong>EDITAR CLIENTE</strong>
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
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <MDBRow className="mt-4">
                      <MDBCol md="5" className="form-group mb-0">
                        <label className="grey-text" htmlFor="empresa">
                          Nome: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className={
                            formErrors.empresa.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="empresa"
                          name="empresa"
                          value={this.state.empresa}
                          onChange={this.handleChange}
                        />
                        {formErrors.empresa.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.empresa}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
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
                          mask="99.999.999/9999-99"
                          onChange={this.handleChange}
                        />
                        {formErrors.cnpj.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cnpj}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
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
                          type="text"
                          ref="collabStatus"
                          name="status"
                          value={this.state.status}
                          onChange={this.handleInputChange}
                        /> */}
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="data_inicio">
                          Data de início:{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className={
                            formErrors.data_inicio.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="data_inicio"
                          name="data_inicio"
                          value={this.state.data_inicio}
                          onChange={this.handleChange}
                          mask="99/99/9999"
                        />
                        {formErrors.data_inicio.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.data_inicio}
                          </span>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="contato1">
                          Contato:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="contato1"
                          name="contato1"
                          value={this.state.contato1}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cargo1">
                          Cargo do contato:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="cargo1"
                          name="cargo1"
                          value={this.state.cargo1}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="email_contato">
                          Email do contato:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="email_contato"
                          name="email_contato"
                          value={this.state.email_contato}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="data_fim">
                          Data de término:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="data_fim"
                          name="data_fim"
                          mask="99/99/9999"
                          value={this.state.data_fim}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="telefone">
                          Telefone:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="telefone"
                          name="telefone"
                          mask="(99) 9999-9999"
                          value={this.state.telefone}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="celular">
                          Celular:
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="celular"
                          name="celular"
                          mask="(99) 9 9999-9999"
                          value={this.state.celular}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="email">
                          Email:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="insc_municipal">
                          Insc. Municipal:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="insc_municipal"
                          name="insc_municipal"
                          value={this.state.insc_municipal}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="insc_estadual">
                          Insc. Estadual:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="insc_estadual"
                          name="insc_estadual"
                          value={this.state.insc_estadual}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol md="8" className="form-group">
                        <label className="grey-text" htmlFor="endereco">
                          Endereço:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="endereco"
                          name="endereco"
                          value={this.state.endereco}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="bairro">
                          Bairro:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="bairro"
                          name="bairro"
                          value={this.state.bairro}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="municipio">
                          Município:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="municipio"
                          name="municipio"
                          value={this.state.municipio}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="uf">
                          UF:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="uf"
                          name="uf"
                          value={this.state.uf}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="pais">
                          País:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="pais"
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
                          className="form-control"
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
        <MDBBtn
          size="lg"
          href="/Customers/add"
          className="px-3 py-3 light-blue darken-4 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default EditCustomer;
