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

const initialState = {
  campoObrigatorio: ""
};
class AddCollaborator extends Component {
  state = {
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
    email: "",
    email_pessoal: "",
    activeItem: "1",
    alertMessage: "",
    campoObrigatorio: ""
  };

  AddCollaborator(newCollaborator) {
    axios
      .request({
        method: "POST",
        url: "http://127.0.0.1:8000/api/colaboradores/",
        data: newCollaborator
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Collaborators"), 1800);
        // this.props.history.push("/Collaborators");
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
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
      email: this.refs.collabEmail.value,
      email_pessoal: this.refs.collabPEmail.value
    };
    e.preventDefault();
    this.AddCollaborator(newCollaborator);
    console.log(newCollaborator);
    
     
    
  }

  // validate = () => {
  //   let campoObrigatorio = "";

  //   if (!this.state.nome) {
  //     campoObrigatorio = "Campo de preenchimento obrigatório";
  //   }

  //   if (campoObrigatorio) {
  //     this.setState({ campoObrigatorio });
  //     return false;
  //   }
  //   return true;
  // };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
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
            <strong>NOVO COLABORADOR</strong>
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
                  <form
                    className="needs-validation"
                    onSubmit={this.onSubmit.bind(this)}
                    noValidate
                  >
                    <MDBRow className="mt-4">
                      <MDBCol md="5" className="form-group">
                        <label className="grey-text" htmlFor="collabName">
                          Nome:{" "}
                        </label>
                        <input
                          value={this.state.nome}
                          name="nome"
                          className="form-control"
                          type="text"
                          ref="collabName"
                          onChange={this.changeHandler}
                          autoFocus
                          required
                        />
                        <div className="invalid-feedback">
                          Campo de preenchimento obrigatório
                        </div>
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabNick">
                          Apelido:{" "}
                        </label>
                        <input
                          value={this.state.apelido}
                          onChange={this.changeHandler}
                          className="form-control"
                          type="text"
                          ref="collabNick"
                        />
                        {/* <div className="invalid-feedback">
                          {this.state.campoObrigatorio}
                        </div> */}
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="collabBday">
                          Data Nascimento:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabBday"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="collabStatus">
                          Status:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabStatus"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabEmail">
                          Email:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabEmail"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabPEmail">
                          Email Pessoal:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabPEmail"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabPhone">
                          Telefone:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabPhone"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabMobile">
                          Celular:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabMobile"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabCpf">
                          CPF:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCpf"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabRg">
                          RG:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabRg"
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
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabZipcode">
                          CEP:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabZipcode"
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
                      href="/Collaborators"
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
export default AddCollaborator;
