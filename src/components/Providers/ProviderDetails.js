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

class ProviderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      activeItem: "1"
    };
  }

  componentDidMount() {
    this.getProvider();
  }

  getProvider() {
    let providerId = this.props.match.params.id;
    axios
      .get(`http://localhost/api/Fornecedores/${providerId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let providerId = this.state.details.ID;
    axios
      .delete(`http://localhost/api/Fornecedores/${providerId}`)
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
          <MDBCardBody>
            <Link className="float-right mr-2 mt-2" to="/Providers">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader
              className="card-header rounded"
              style={{ width: "30rem", height: "5rem" }}
            >
              <MDBCardTitle className="pl-4 mb-0">
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
                    Dados Financeiros
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="status">
                        Status:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="status"
                        value={this.state.details.STATUS}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group ">
                      <label className="grey-text" htmlFor="startDate">
                        Data de início:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="startDate"
                        value={this.state.details.DT_INICIO}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group ">
                      <label className="grey-text" htmlFor="endDate">
                        Data de término:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="endDate"
                        value={this.state.details.DT_FIM}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="cnpj">
                        CNPJ:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="cnpj"
                        value={this.state.details.CNPJ}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="phone">
                        Telefone:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="phone"
                        value={this.state.details.TEL_COM}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="mobile">
                        Celular:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="mobile"
                        value={this.state.details.CEL_COM}
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
                        className="form-control disabled read-only"
                        type="text"
                        id="address"
                        value={this.state.details.END_EMPRESA}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="neighborhood">
                        Bairro:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="neighborhood"
                        value={this.state.details.BAIRRO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="municipality">
                        Município:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="minicipality"
                        value={this.state.details.MUNICIPIO}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-2">
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="city">
                        Cidade:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="city"
                        value={this.state.details.CIDADE}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="state">
                        Estado:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="state"
                        value={this.state.details.ESTADO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="country">
                        País:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="country"
                        value={this.state.details.PAIS}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="cep">
                        CEP:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="cep"
                        value={this.state.details.CEP}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBTabPane>

                <MDBTabPane tabId="2" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="accountType">
                        Tipo de conta:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="accountType "
                        value={this.state.details.TIPO}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="bankCode">
                        Cód. Banco:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="bankCode"
                        value={this.state.details.BCO}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="form-group">
                      <label className="grey-text" htmlFor="bank">
                        Banco:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="bank"
                        value={this.state.details.NOME_BANCO}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="agency">
                        Agência:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="agency"
                        value={this.state.details.AG}
                      />
                    </MDBCol>

                    <MDBCol md="5" className="form-group">
                      <label className="grey-text" htmlFor="AccountNumb">
                        Nº Conta:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="AccountNumb"
                        value={this.state.details.CC}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="ccm">
                        CCM:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="ccm"
                        value={this.state.details.CCM}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="certMunicipal">
                        Certidão Municipal:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="certMunicipal"
                        value={this.state.details.CERT_MUN}
                      />
                    </MDBCol>

                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="certState">
                        Certidão Estadual:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="certState"
                        value={this.state.details.CERT_EST}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="certFederal">
                        Certidão Federal:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="certFederal"
                        value={this.state.details.CERT_FED}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="ie">
                        IE:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="ie"
                        value={this.state.details.IE}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="simples">
                        Simples:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="simples"
                        value={this.state.details.SIMPLES}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="issSP">
                        Reter ISS-SP:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="issSP"
                        value={this.state.details.RETER_ISS_SP}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBTabPane>
                <MDBBtn
                  href={`/Providers/edit/${this.state.details.ID}`}
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
      </MDBContainer>
    );
  }
}
export default ProviderDetails;
