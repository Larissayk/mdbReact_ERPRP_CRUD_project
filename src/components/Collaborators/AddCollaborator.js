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
  MDBCardHeader,
  MDBCardTitle
} from "mdbreact";
import axios from "axios";
import { Link } from "react-router-dom";

class AddCollaborator extends Component {
  state = {
    activeItem: "1"
  };

  AddCollaborator(newCollaborator) {
    axios
      .request({
        method: "POST",
        url: "http://127.0.0.1:80/api/colaboradores/",
        data: newCollaborator
        
      })
      .then(response => {
        this.props.history.push("/Collaborators");
      })
      .catch(err => console.log(err));
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
      email_pessoal: this.refs.collabPEmail.value,
      // created_at: this.refs.collabCreatedAt.value,
      // updated_at: this.refs.collabUpdatedAt.value
    };
    this.AddCollaborator(newCollaborator);
    console.log(newCollaborator);
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
        <MDBCard className="mt-3 mb-4">
          <MDBCardBody className="pt-0">
            <Link className="float-right mr-2 mt-4" to="/Collaborators">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
                Novo Colaborador
              </MDBCardTitle>
            </MDBCardHeader>

            <MDBContainer>
              <MDBNav className="nav-tabs">
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
                {/* <MDBNavItem>
                  <MDBNavLink
                    to="#"
                    active={this.state.activeItem === "2"}
                    onClick={this.toggle("2")}
                    role="tab"
                  >
                    Dados Profissionais
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to="#"
                    active={this.state.activeItem === "3"}
                    onClick={this.toggle("3")}
                    role="tab"
                  >
                    Dados Financeiros
                  </MDBNavLink>
                </MDBNavItem> */}
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <MDBRow className="mt-4">
                      <MDBCol md="5" className="form-group">
                        <label className="grey-text" htmlFor="collabName">
                          Nome:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabName"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabNick">
                          Apelido:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabNick"
                        />
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
                      {/* <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="collabStartDt">
                          Data de início:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="collabStartDt"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="collabEndDt">
                          Data de término:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="collabEndDt"
                        />
                      </MDBCol> */}
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
                      className="deep-orange darken-3 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
                    </MDBBtn>
                  </form>
                </MDBTabPane>

                {/* <MDBTabPane tabId="2" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <MDBRow className="mt-4">
                      <MDBCol md="5" className="form-group">
                        <label className="grey-text" htmlFor="collabProvider">
                          Nome do Fornecedor:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabProvider "
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabEmailCorp">
                          Email Corporativo:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabEmailCorp"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabContract">
                          Tipo de Contrato:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabContract"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabRole">
                          Função:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabRole"
                        />
                      </MDBCol>

                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="collabRoleLevel">
                          Nível:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabRoleLevel"
                        />
                      </MDBCol>
                      <MDBCol md="6" className="form-group">
                        <label className="grey-text" htmlFor="collanManag">
                          Gestor Responsável:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collanManag"
                        />
                      </MDBCol>
                    </MDBRow>
                  </form>
                </MDBTabPane>
                <MDBTabPane tabId="3" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <MDBRow className="mt-4">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabAcountT">
                          Tipo de Conta:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabAcountT"
                        />
                      </MDBCol>

                      <MDBCol md="6" className="form-group">
                        <label
                          className="grey-text"
                          htmlFor="collabBusinessName"
                        >
                          Razão Social:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabBusinessName"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabCnpj">
                          CNPJ:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCnpj"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="collabBankCode">
                          Cód. Banco:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabBankCode"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="collabBAgency">
                          Agência:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabBAgency"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabBank">
                          Banco:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabBank"
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabCC">
                          Nº Conta:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCC"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="deep-orange darken-3 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
                    </MDBBtn> */}
                  {/* </form>
                </MDBTabPane> */}
              </MDBTabContent>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
export default AddCollaborator;
