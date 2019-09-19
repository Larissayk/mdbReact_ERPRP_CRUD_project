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

class EditNFInbound extends Component {
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
    this.getNFInboundDetails();
  }

  getNFInboundDetails() {
    let NFInboundId = this.props.match.params.id;
    axios
      .get(`http://localhost/api/Fornecedores/${NFInboundId}`)
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

  EditNFexit(newNFInbound) {
    //console.log(newProvider);
    axios
      .request({
        method: "PUT",
        url: `http://localhost/api/Fornecedores/${this.state.ID}`,
        data: newNFInbound
      })
      .then(response => {
        this.props.history.push("/NFsInbound");
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    const newNFInbound = {
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
    this.editProvider(newNFInbound);
    e.preventDefault();
    console.log(newNFInbound);
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
            <Link className="float-right mr-2 mt-2" to="/NFsInbound">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader
              className="card-header rounded"
              style={{ width: "17rem", height: "5rem" }}
            >
              <MDBCardTitle className="pl-4 mb-0">Editar NF-Entrada</MDBCardTitle>
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
                    Dados de Pagamento
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <MDBRow className="mt-4">
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="NFIyear">
                          Ano:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIyear"
                          value={this.state.NOME_EMPRESA}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group ">
                        <label className="grey-text" htmlFor="NFIType">
                          Tipo:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIType"
                          value={this.state.STATUS}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="1" className="form-group ">
                        <label className="grey-text" htmlFor="NFINumber">
                          Nº NF:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFINumber"
                          value={this.state.DT_INICIO}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="NFIEmissor">
                          Emissor:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIEmissor"
                          value={this.state.DT_FIM}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFICnpj">
                          CNPJ:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFICnpj"
                          value={this.state.CNPJ}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <h5>Identificação</h5>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="NFIDt">
                          Data de Emissão:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIDt"
                          value={this.state.TEL_COM}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="6" className="form-group">
                        <label className="grey-text" htmlFor="NFICollab">
                          Colaborador:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFICollab"
                          value={this.state.CEL_COM}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="NFIService">
                          Serviço:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIService"
                          value={this.state.END_EMPRESA}
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
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFIAmount">
                          Valor Bruto:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFAmount"
                          value={this.state.BAIRRO}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFIIssSp">
                          ISS-SP:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIIssSp"
                          value={this.state.MUNICIPIO}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFIIrrf">
                          IRRF (15%):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIIrrf"
                          value={this.state.CIDADE}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFIpiscofins">
                          PIS/COFINS (4,65%):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIpiscofins"
                          value={this.state.ESTADO}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="NFINetValue">
                          Valor Líquido:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFINetValue"
                          value={this.state.PAIS}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="2">
                        <MDBRow>
                          <MDBCol>
                            <label
                              htmlFor="NFIReceivedDt"
                              className="grey-text"
                            >
                              Data Recebimento:{" "}
                            </label>
                            <input
                              type="date"
                              ref="NFIReceivedDt"
                              className="form-control"
                              value={this.state.CEP}
                              onChange={this.handleInputChange}
                            />
                          </MDBCol>
                        </MDBRow>
                        <br />
                        <MDBRow>
                          <MDBCol>
                            <label htmlFor="NFIPayingDt" className="grey-text">
                              Data Pagamento:{" "}
                            </label>
                            <input
                              type="date"
                              ref="NFIPayingDt"
                              className="form-control"
                              value={this.state.TIPO}
                              onChange={this.handleInputChange}
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="10">
                        <div className="form-group grey-text">
                          <label htmlFor="NFIComments">Comentários: </label>
                          <textarea
                            className="form-control"
                            ref="NFIComments"
                            rows="5"
                            value={this.state.TIPO}
                            onChange={this.handleInputChange}
                          />
                        </div>
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
export default EditNFInbound;
