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

class EditCollaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      NOME_EMPRESA: "",
      CNPJ: "",
      STATUS: "",
      DT_INICIO: "",
      DT_FIM: "",
      END_EMPRESA: "",
      BAIRRO: "",
      MUNICIPIO: "",
      CIDADE: "",
      ESTADO: "",
      PAIS: "",
      CEP: "",
      TEL_COM: "",
      CEL_COM: "",
      SIMPLES: "",
      RETER_ISS_SP: "",
      CERT_MUN: "",
      CERT_EST: "",
      CERT_FED: "",
      IE: "",
      CCM: "",
      TIPO: "",
      BCO: "",
      NOME_BANCO: "",
      AG: "",
      CC: "",
      activeItem: "1"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getCollaboratorDetails();
  }

  getCollaboratorDetails() {
    let collaboratorId = this.props.match.params.id;
    axios
      .get(`http://localhost/api/Fornecedores/${collaboratorId}`)
      .then(response => {
        this.setState(
          {
            ID: response.data.ID,
            NOME_EMPRESA: response.data.NOME_EMPRESA,
            CNPJ: response.data.CNPJ,
            STATUS: response.data.STATUS,
            DT_INICIO: response.data.DT_INICIO,
            DT_FIM: response.data.DT_FIM,
            END_EMPRESA: response.data.END_EMPRESA,
            BAIRRO: response.data.BAIRRO,
            MUNICIPIO: response.data.MUNICIPIO,
            CIDADE: response.data.CIDADE,
            ESTADO: response.data.ESTADO,
            PAIS: response.data.PAIS,
            CEP: response.data.CEP,
            TEL_COM: response.data.TEL_COM,
            CEL_COM: response.data.CEL_COM,
            SIMPLES: response.data.SIMPLES,
            RETER_ISS_SP: response.data.RETER_ISS_SP,
            CERT_MUN: response.data.CERT_MUN,
            CERT_EST: response.data.CERT_EST,
            CERT_FED: response.data.CERT_FED,
            IE: response.data.IE,
            CCM: response.data.CCM,
            TIPO: response.data.TIPO,
            BCO: response.data.BCO,
            NOME_BANCO: response.data.NOME_BANCO,
            AG: response.data.NOME_EMPRAGESA,
            CC: response.data.CC
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editProvider(newCollaborator) {
    //console.log(newProvider);
    axios
      .request({
        method: "PUT",
        url: `http://localhost/api/Fornecedores/${this.state.ID}`,
        data: newCollaborator
      })
      .then(response => {
        this.props.history.push("/Providers");
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    const newCollaborator = {
      NOME_EMPRESA: this.refs.name.value,
      STATUS: this.refs.status.value,
      // END_EMPRESA: this.refs.adress.value,
      CNPJ: this.refs.cnpj.value
      // DT_INICIO: this.refs.startDate.value,
      // DT_FIM: this.refs.endDate.value,
      // BAIRRO: this.refs.neighborhood.value,
      // MUNICIPIO: this.refs.municipality.value,
      // CIDADE: this.refs.city.value,
      // ESTADO: this.refs.state.value,
      // PAIS: this.refs.country.value,
      // CEP: this.refs.cep.value,
      // TEL_COM: this.refs.phone.value,
      // CEL_COM: this.refs.mobile.value,
      // SIMPLES: this.refs.simples.value,
      // RETER_ISS_SP: this.refs.issSP.value,
      // CERT_MUN: this.refs.certMunicipal.value,
      // CERT_EST: this.refs.certState.value,
      // CERT_FED: this.refs.certFederal.value,
      // IE: this.refs.ie.value,
      // CCM: this.refs.ccm.value,
      // TIPO: this.refs.accountType.value,
      // BCO: this.refs.bankCode.value,
      // NOME_BANCO: this.refs.bank.value,
      // AG: this.refs.agency.value,
      // CC: this.refs.accountNumb.value
    };
    this.editProvider(newCollaborator);
    e.preventDefault();
    console.log(newCollaborator);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
          <MDBCardBody>
            <Link className="float-right mr-2 mt-2" to="/Collaborators">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader
              className="card-header rounded"
              style={{ width: "17rem", height: "5rem" }}
            >
              <MDBCardTitle className="pl-4 mb-0">
                Editar Dados do Colaborador
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
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <MDBRow className="mt-4">
                      <MDBCol md="6" className="form-group">
                        <label className="grey-text" htmlFor="collabNick">
                          Apelido:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabNick"
                          value={this.state.NOME_EMPRESA}
                          onChange={this.handleInputChange}
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
                          value={this.state.STATUS}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="collabStartDt">
                          Data de início:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          ref="collabStartDt"
                          value={this.state.DT_INICIO}
                          onChange={this.handleInputChange}
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
                          value={this.state.DT_FIM}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabEmail">
                          Email:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabEmail"
                          value={this.state.CNPJ}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabPhone">
                          Telefone:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabPhone"
                          value={this.state.TEL_COM}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabMobile">
                          Celular:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabMobile"
                          value={this.state.CEL_COM}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="collabCpf">
                          CPF:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCpf"
                          value={this.state.END_EMPRESA}
                          onChange={this.handleInputChange}
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
                          value={this.state.BAIRRO}
                          onChange={this.handleInputChange}
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
                          value={this.state.MUNICIPIO}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="collabCtps">
                          CTPS:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabCtps"
                          value={this.state.CIDADE}
                          onChange={this.handleInputChange}
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
                          value={this.state.ESTADO}
                          onChange={this.handleInputChange}
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
                          value={this.state.PAIS}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="3" className="form-group">
                        <label
                          className="grey-text"
                          htmlFor="collabMunicipality"
                          value={this.state.CEP}
                          onChange={this.handleInputChange}
                        >
                          Município:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="collabMunicipality"
                          value={this.state.TIPO}
                          onChange={this.handleInputChange}
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
                          value={this.state.BCO}
                          onChange={this.handleInputChange}
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
                          value={this.state.NOME_BANCO}
                          onChange={this.handleInputChange}
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
                          value={this.state.AG}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="deep-orange darken-3 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
                    </MDBBtn>
                  </form>
                </MDBTabPane>

                <MDBTabPane tabId="2" role="tabpanel">
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
                          value={this.state.CC}
                          onChange={this.handleInputChange}
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
                          value={this.state.CCM}
                          onChange={this.handleInputChange}
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
                          value={this.state.CERT_MUN}
                          onChange={this.handleInputChange}
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
                          value={this.state.CERT_EST}
                          onChange={this.handleInputChange}
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
                          value={this.state.CERT_FED}
                          onChange={this.handleInputChange}
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
                          value={this.state.IE}
                          onChange={this.handleInputChange}
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
                          value={this.state.SIMPLES}
                          onChange={this.handleInputChange}
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
                          value={this.state.RETER_ISS_SP}
                          onChange={this.handleInputChange}
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
                          value={this.state.RETER_ISS_SP}
                          onChange={this.handleInputChange}
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
                          value={this.state.RETER_ISS_SP}
                          onChange={this.handleInputChange}
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
                          value={this.state.RETER_ISS_SP}
                          onChange={this.handleInputChange}
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
                          value={this.state.RETER_ISS_SP}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="deep-orange darken-3 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
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
export default EditCollaborator;
