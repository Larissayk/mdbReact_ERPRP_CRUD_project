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

class NFExitDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      activeItem: "1"
    };
  }

  componentDidMount() {
    this.getNFExit();
  }

  getNFExit() {
    let NFExitId = this.props.match.params.id;
    axios
      .get(`http://localhost/api/Fornecedores/${NFExitId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let NFExitId = this.state.details.id;
    axios
      .delete(`http://localhost/api/Fornecedores/${NFExitId}`)
      .then(response => {
        this.props.history.push("/NFsExit");
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
            <Link className="float-right mr-2 mt-4" to="/NFsExit">
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
                    Dados de Pagamento
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="NFEyear">
                        Ano:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFEyear"
                        value={this.state.details.STATUS}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group ">
                      <label className="grey-text" htmlFor="NFEType">
                        Tipo:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFEType"
                        value={this.state.details.DT_INICIO}
                      />
                    </MDBCol>
                    <MDBCol md="1" className="form-group ">
                      <label className="grey-text" htmlFor="NFENumber">
                        Nº NF:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFENumber"
                        value={this.state.details.DT_FIM}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="NFEEmissor">
                        Emissor:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFEEmissor"
                        value={this.state.details.CNPJ}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFECnpj">
                        CNPJ:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFECnpj"
                        value={this.state.details.TEL_COM}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <h5>Contrato</h5>
                  </MDBRow>
                  <MDBRow className="mb-2">
                    <MDBCol md="6" className="form-group">
                      <label className="grey-text" htmlFor="NFEId">
                        Identificação:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFEId"
                        value={this.state.details.END_EMPRESA}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="NFEStatus">
                        Status:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFEStatus"
                        value={this.state.details.BAIRRO}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="contractNumb">
                        Nº Contrato:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="contractNumb"
                        value={this.state.details.MUNICIPIO}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBTabPane>

                <MDBTabPane tabId="2" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFAmount">
                        Valor Bruto:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFAmount"
                        value={this.state.details.TIPO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFEIrrf">
                        IRRF (15%):{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFEIrrf"
                        value={this.state.details.BCO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFEpiscofins">
                        PIS/COFINS (4,65%):{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFEpiscofins"
                        value={this.state.details.NOME_BANCO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFENetValue">
                        Valor Líquido:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFENetValue"
                        value={this.state.details.AG}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-2">
                    <MDBCol md="2">
                      <MDBRow>
                        <MDBCol>
                          <label htmlFor="NFEPreviousDt" className="grey-text">
                            Data Prévia:{" "}
                          </label>
                          <input
                            type="date"
                            id="NFEPreviousDt"
                            className="form-control disabled read-only"
                          />
                        </MDBCol>
                      </MDBRow>
                      <br />
                      <MDBRow>
                        <MDBCol>
                          <label htmlFor="NFERealDt" className="grey-text">
                            Data Real:{" "}
                          </label>
                          <input
                            type="date"
                            id="NFERealDt"
                            className="form-control disabled read-only"
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                    <MDBCol md="10">
                      <div className="form-group grey-text">
                        <label htmlFor="NFEComments">Comentários: </label>
                        <textarea
                          className="form-control disabled read-only"
                          id="NFEComments"
                          rows="5"
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBTabPane>
                <MDBBtn
                  href={`/NFsExit/edit/${this.state.details.ID}`}
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
          href="/NFsExit/add"
          className="px-3 py-3 btn deep-orange darken-3 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default NFExitDetails;
