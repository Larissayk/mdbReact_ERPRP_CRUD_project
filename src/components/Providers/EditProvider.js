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

class EditProvider extends Component {
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
    this.getProviderDetails();
  }

  getProviderDetails() {
    let providerId = this.props.match.params.id;
    axios
      .get(`http://localhost/api/Fornecedores/${providerId}`)
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

  editProvider(newProvider) {
    //console.log(newProvider);
    axios
      .request({
        method: "PUT",
        url: `http://localhost/api/Fornecedores/${this.state.ID}`,
        data: newProvider
      })
      .then(response => {
        this.props.history.push("/Providers");
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    const newProvider = {
      NOME_EMPRESA: this.refs.name.value,
      STATUS: this.refs.status.value,
      // END_EMPRESA: this.refs.adress.value,
      CNPJ: this.refs.cnpj.value,
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
    this.editProvider(newProvider);
    e.preventDefault();
    console.log(newProvider);
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
            <Link className="float-right mr-2 mt-4" to="/Providers">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{fontSize:28}}>
                Editar Fornecedor
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
                    Dados Financeiros
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <MDBRow className="mt-4">
                      <MDBCol md="6" className="form-group">
                        <label className="grey-text" htmlFor="name">
                          Nome:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="NOME_EMPRESA"
                          ref="name"
                          value={this.state.NOME_EMPRESA}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="status">
                          Status:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="STATUS"
                          ref="status"
                          value={this.state.STATUS}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="startDate">
                          Data de início:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="DT_INICIO"
                          ref="startDate"
                          value={this.state.DT_INICIO}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="endDate">
                          Data de término:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="DT_FIM"
                          ref="endDate"
                          value={this.state.DT_FIM}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="cnpj">
                          CNPJ:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="CNPJ"
                          ref="cnpj"
                          value={this.state.CNPJ}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="phone">
                          Telefone:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="TEL_COM"
                          ref="phone"
                          value={this.state.TEL_COM}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="mobile">
                          Celular:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="CEL_COM"
                          ref="mobile"
                          value={this.state.CEL_COM}
                          onChange={this.handleInputChange}
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
                          name="END_EMPRESA"
                          ref="address"
                          value={this.state.END_EMPRESA}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="neighborhood">
                          Bairro:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="BAIRRO"
                          ref="neighborhood"
                          value={this.state.BAIRRO}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="municipality">
                          Município:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="MUNICIPIO"
                          ref="minicipality"
                          value={this.state.MUNICIPIO}
                          onChange={this.handleInputChange}
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
                          name="CIDADE"
                          ref="city"
                          value={this.state.CIDADE}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="state">
                          Estado:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="ESTADO"
                          ref="state"
                          value={this.state.ESTADO}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="country">
                          País:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="PAIS"
                          ref="country"
                          value={this.state.PAIS}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cep">
                          CEP:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="CEP"
                          ref="cep"
                          value={this.state.CEP}
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
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="accountType">
                          Tipo de conta:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="TIPO "
                          ref="accountType"
                          value={this.state.TIPO}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="bankCode">
                          Cód. Banco:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="BCO"
                          ref="bankCode"
                          value={this.state.BCO}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="6" className="form-group">
                        <label className="grey-text" htmlFor="bank">
                          Banco:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="NOME_BANCO"
                          ref="bank"
                          value={this.state.NOME_BANCO}
                          onChange={this.handleInputChange}
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
                          name="AG"
                          ref="agency"
                          value={this.state.AG}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>

                      <MDBCol md="5" className="form-group">
                        <label className="grey-text" htmlFor="AccountNumb">
                          Nº Conta:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="CC"
                          ref="AccountNumb"
                          value={this.state.CC}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="ccm">
                          CCM:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="CCM"
                          ref="ccm"
                          value={this.state.CCM}
                          onChange={this.handleInputChange}
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
                          name="CERT_MUN"
                          ref="certMunicipal"
                          value={this.state.CERT_MUN}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>

                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="certState">
                          Certidão Estadual:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="CERT_EST"
                          ref="certState"
                          value={this.state.CERT_EST}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="certFederal">
                          Certidão Federal:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="CERT_FED"
                          ref="certFederal"
                          value={this.state.CERT_FED}
                          onChange={this.handleInputChange}
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
                          name="IE"
                          ref="ie"
                          value={this.state.IE}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="simples">
                          Simples:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="SIMPLES"
                          ref="simples"
                          value={this.state.SIMPLES}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="issSP">
                          Reter ISS-SP:{" "}
                        </label>
                        <input
                          className="form-control "
                          type="text"
                          name="RETER_ISS_SP"
                          ref="issSP"
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
        <MDBBtn
          size="lg"
          href="/Providers/add"
          className="px-3 py-3 btn deep-orange darken-3 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default EditProvider;
