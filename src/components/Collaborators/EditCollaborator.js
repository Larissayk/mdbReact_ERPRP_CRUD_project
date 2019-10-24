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

class EditCollaborator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      cpf: "",
      status: "",
      nome: "",
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
      celular: "",
      email_pessoal: "",
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        nome: "",
        cpf: "",
        celular: "",
        email_pessoal: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getCollaboratorDetails();
  }

  getCollaboratorDetails() {
    let collaboratorId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/colaboradores/${collaboratorId}`)
      .then(response => {
        this.setState(
          {
            id: response.data.id,
            nome: response.data.nome,
            cpf: response.data.cpf,
            status: response.data.status,
            apelido: response.data.apelido,
            rg: response.data.rg,
            orgao_emissor: response.data.orgao_emissor,
            ctps: response.data.ctps,
            data_nascimento: response.data.data_nascimento,
            endereco: response.data.endereco,
            cep: response.data.cep,
            bairro: response.data.bairro,
            cidade: response.data.cidade,
            estado: response.data.estado,
            pais: response.data.pais,
            telefone: response.data.telefone,
            celular: response.data.celular,
            email_pessoal: response.data.email_pessoal
          },
          () => {
            console.log("Get:", this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editCollaborator(newCollaborator) {
    axios
      .request({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/colaboradores/${this.state.id}`,
        data: newCollaborator
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Collaborators"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log('Erro:', err);
      });
  }

  onSubmit(e) {
    const newCollaborator = {
      cpf: this.refs.collabCpf.value,
      status: this.refs.collabStatus.value,
      nome: this.refs.collabName.value,
      apelido: this.refs.collabNick.value,
      rg: this.refs.collabRg.value,
      orgao_emissor: this.refs.collabEmis.value,
      ctps: this.refs.collabCtps.value,
      data_nascimento: this.refs.collabBday.value,
      endereco: this.refs.collabAddress.value,
      cep: this.refs.collabZipcode.value,
      bairro: this.refs.collabNeighborhood.value,
      cidade: this.refs.collabCity.value,
      pais: this.refs.collabCountry.value,
      estado: this.refs.collabState.value,
      telefone: this.refs.collabPhone.value,
      celular: this.refs.collabMobile.value,
      email_pessoal: this.refs.collabPEmail.value
    };
    // this.editCollaborator(newCollaborator);
    e.preventDefault();
    // console.log(newCollaborator);

    if (formValid(this.state)) {
      this.editCollaborator(newCollaborator);
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
      case "celular":
        formErrors.celular = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "cpf":
        formErrors.cpf = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "email_pessoal":
        formErrors.email_pessoal = value.length < 1 ? "Campo obrigatório." : "";
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
    console.log("formErrors",formErrors);

    return (
      <MDBContainer className="main-body">
        <div>
          {this.state.alertMessage === "success" ? <SuccessMessage /> : null}
          {this.state.alertMessage === "error" ? <ErrorMessage /> : null}
        </div>
        <MDBCard className="mt-3 mb-4">
          <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
            <strong>EDITAR COLABORADOR</strong>
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
                        <label className="grey-text" htmlFor="collabName">
                          Nome: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className={
                            formErrors.nome.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="collabName"
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
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabNick">
                          Apelido:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabNick"
                          name="apelido"
                          value={this.state.apelido}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="collabBday">
                          Data Nascimento:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="collabBday"
                          name="data_nascimento"
                          value={this.state.data_nascimento}
                          onChange={this.handleChange}
                          mask="99/99/9999"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="collabStatus">
                          Status: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="collabStatus"
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
                    </MDBRow>
                    <MDBRow>
                      {/* <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabEmail">
                          Email:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabEmail"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </MDBCol> */}
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabPEmail">
                          Email Pessoal: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className={
                            formErrors.email_pessoal.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="collabPEmail"
                          name="email_pessoal"
                          value={this.state.email_pessoal}
                          onChange={this.handleChange}
                        />
                        {formErrors.email_pessoal.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.email_pessoal}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabPhone">
                          Telefone:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="collabPhone"
                          name="telefone"
                          value={this.state.telefone}
                          onChange={this.handleChange}
                          mask="(99) 9999-9999"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabMobile">
                          Celular: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className={
                            formErrors.celular.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="collabMobile"
                          name="celular"
                          value={this.state.celular}
                          onChange={this.handleChange}
                          mask="(99) 9 9999-9999"
                        />
                        {formErrors.celular.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.celular}
                          </span>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabCpf">
                          CPF: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <InputMask
                          className={
                            formErrors.cpf.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          ref="collabCpf"
                          name="cpf"
                          value={this.state.cpf}
                          onChange={this.handleChange}
                          mask="999.999.999-99"
                        />
                        {formErrors.cpf.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.cpf}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabRg">
                          RG:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="collabRg"
                          name="rg"
                          value={this.state.rg}
                          onChange={this.handleChange}
                          mask="99.999.999-**"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="collabEmis">
                          Órgão Emis.:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabEmis"
                          name="orgao_emissor"
                          value={this.state.orgao_emissor}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabCtps">
                          CTPS:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCtps"
                          name="ctps"
                          value={this.state.ctps}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol md="8" className="form-group">
                        <label className="grey-text" htmlFor="collabAddress">
                          Endereço:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabAddress"
                          name="endereco"
                          value={this.state.endereco}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label
                          className="grey-text"
                          htmlFor="collabNeighborhood"
                        >
                          Bairro:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabNeighborhood"
                          name="bairro"
                          value={this.state.bairro}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabCity">
                          Cidade:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCity"
                          name="cidade"
                          value={this.state.cidade}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabState">
                          Estado:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabState"
                          name="estado"
                          value={this.state.estado}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabCountry">
                          País:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCountry"
                          name="pais"
                          value={this.state.pais}
                          onChange={this.handleChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabZipcode">
                          CEP:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          ref="collabZipcode"
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
                      href="/Collaborators"
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
          href="/Collaborators/add"
          className="px-3 py-3 light-blue darken-4 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default EditCollaborator;
