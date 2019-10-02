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
      email: "",
      email_pessoal: "",
      activeItem: "1"
    }
    this.handleInputChange = this.handleInputChange.bind(this);
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
            email: response.data.email,
            email_pessoal: response.data.email_pessoal,
          },
          () => {
            console.log(this.state);
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
      email_pessoal: this.refs.collabPEmail.value
      // created_at: this.refs.collabCreatedAt.value,
      // updated_at: this.refs.collabUpdatedAt.value
    };
    this.editCollaborator(newCollaborator);
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
          <MDBCardBody className="pt-0">
            <Link className="float-right mr-2 mt-4" to="/Collaborators">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
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
                          name="nome"
                          value={this.state.nome}
                          onChange={this.handleInputChange}
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
                          name="apelido"
                          value={this.state.apelido}
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
                          name="data_nascimento"
                          value={this.state.data_nascimento}
                          onChange={this.handleInputChange}
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
                          name="status"
                          value={this.state.status}
                          onChange={this.handleInputChange}
                        />
                        {/* <div>
                          <select
                            className="browser-default custom-select"
                            ref="collabStatus"
                            name="status"
                            value={this.state.status}
                            onChange={this.handleInputChange}
                          >
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                          </select>
                        </div> */}
                      </MDBCol>
                      {/* <MDBCol md="2" className="form-group ">
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
                          name="email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
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
                          name="email_pessoal"
                          value={this.state.email_pessoal}
                          onChange={this.handleInputChange}
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
                          name="telefone"
                          value={this.state.telefone}
                          onChange={this.handleInputChange}
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
                          name="celular"
                          value={this.state.celular}
                          onChange={this.handleInputChange}
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
                          name="cpf"
                          value={this.state.cpf}
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
                          name="rg"
                          value={this.state.rg}
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
                          name="orgao_emissor"
                          value={this.state.orgao_emissor}
                          onChange={this.handleInputChange}
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
                          name="endereco"
                          value={this.state.endereco}
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
                          name="bairro"
                          value={this.state.bairro}
                          onChange={this.handleInputChange}
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
                          name="estado"
                          value={this.state.estado}
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
                          name="pais"
                          value={this.state.pais}
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
                          name="cep"
                          value={this.state.cep}
                          onChange={this.handleInputChange}
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
                </MDBTabPane> */}
              </MDBTabContent>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
export default EditCollaborator;
