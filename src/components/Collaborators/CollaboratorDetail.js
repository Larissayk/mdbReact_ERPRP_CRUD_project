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
  MDBCardHeader,
  MDBCardTitle
} from "mdbreact";
import axios from "axios";
import { Link } from "react-router-dom";

class CollaboratorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      activeItem: "1"
    };
  }

  componentDidMount() {
    this.getCollaborator();
  }

  getCollaborator() {
    let collaboratorId = this.props.match.params.id;
    axios
      .get(`http://localhost/api/Fornecedores/${collaboratorId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let collaboratorId = this.state.details.ID;
    axios
      .delete(`http://localhost/api/Fornecedores/${collaboratorId}`)
      .then(response => {
        this.props.history.push("/Providers");
      })
      .catch(err => console.log(err));
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
                {this.state.details.NOME_EMPRESA}
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
                <MDBNavItem>
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
                </MDBNavItem>
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="6" className="form-group">
                      <label className="grey-text" htmlFor="collabNick">
                        Apelido:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabNick"
                        value={this.state.details.STATUS}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group ">
                      <label className="grey-text" htmlFor="collabBday">
                        Data Nascimento:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabBday"
                        value={this.state.details.DT_INICIO}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group ">
                      <label className="grey-text" htmlFor="collabStartDt">
                        Data de início:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabStartDt"
                        value={this.state.details.DT_FIM}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group ">
                      <label className="grey-text" htmlFor="collabEndDt">
                        Data de término:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabEndDt"
                        value={this.state.details.DT_FIM}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabEmail">
                        Email:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabEmail"
                        value={this.state.details.CNPJ}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabPhone">
                        Telefone:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabPhone"
                        value={this.state.details.TEL_COM}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabMobile">
                        Celular:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabMobile"
                        value={this.state.details.CEL_COM}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabCpf">
                        CPF:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabCpf"
                        value={this.state.details.CNPJ}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabRg">
                        RG:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabRg"
                        value={this.state.details.TEL_COM}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="collabEmis">
                        Órgão Emis.:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabEmis"
                        value={this.state.details.CEL_COM}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabCtps">
                        CTPS:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabCtps"
                        value={this.state.details.CEL_COM}
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
                        className="form-control disabled read-only"
                        type="text"
                        id="collabAddress"
                        value={this.state.details.END_EMPRESA}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabNeighborhood">
                        Bairro:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabNeighborhood"
                        value={this.state.details.BAIRRO}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-2">
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabMunicipality">
                        Município:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabMunicipality"
                        value={this.state.details.MUNICIPIO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabState">
                        Estado:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabState"
                        value={this.state.details.ESTADO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabCountry">
                        País:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabCountry"
                        value={this.state.details.PAIS}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabZipcode">
                        CEP:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabZipcode"
                        value={this.state.details.CEP}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBTabPane>

                <MDBTabPane tabId="2" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="5" className="form-group">
                      <label className="grey-text" htmlFor="collabProvider">
                        Nome do Fornecedor:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabProvider "
                        value={this.state.details.TIPO}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabEmailCorp">
                        Email Corporativo:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabEmailCorp"
                        value={this.state.details.BCO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabContract">
                        Tipo de Contrato:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabContract"
                        value={this.state.details.NOME_BANCO}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-2">
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabRole">
                        Função:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabRole"
                        value={this.state.details.AG}
                      />
                    </MDBCol>

                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="collabRoleLevel">
                        Nível:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabRoleLevel"
                        value={this.state.details.CC}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="form-group">
                      <label className="grey-text" htmlFor="collanManag">
                        Gestor Responsável:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collanManag"
                        value={this.state.details.CCM}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBTabPane>
                <MDBTabPane tabId="3" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabAcountT">
                        Tipo de Conta:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabAcountT"
                        value={this.state.details.CERT_MUN}
                      />
                    </MDBCol>

                    <MDBCol md="6" className="form-group">
                      <label className="grey-text" htmlFor="collabBusinessName">
                        Razão Social:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabBusinessName"
                        value={this.state.details.CERT_EST}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabCnpj">
                        CNPJ:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabCnpj"
                        value={this.state.details.CERT_FED}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-2">
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="collabBankCode">
                        Cód. Banco:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabBankCode"
                        value={this.state.details.IE}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="collabBAgency">
                        Agência:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabBAgency"
                        value={this.state.details.SIMPLES}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabBank">
                        Banco:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabBank"
                        value={this.state.details.RETER_ISS_SP}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabCC">
                        Nº Conta:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabCC"
                        value={this.state.details.RETER_ISS_SP}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBTabPane>
                <MDBBtn
                  href={`/Collaborators/edit/${this.state.details.ID}`}
                  className="deep-orange darken-3 float-right"
                >
                  <MDBIcon far icon="edit" /> Editar
                </MDBBtn>
                <MDBBtn
                  onClick={this.onDelete.bind(this)}
                  outline
                  color="deep-orange darken-3"
                  className="float-right"
                >
                  <MDBIcon icon="trash-alt" /> Excluir
                </MDBBtn>
              </MDBTabContent>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
        <MDBBtn
          size="lg"
          href="/Collaborators/add"
          className="px-3 py-3 btn deep-orange darken-3 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default CollaboratorDetails;
