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

class NFInboundDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      activeItem: "1"
    };
  }

  componentDidMount() {
    this.getNFInbound();
  }

  getNFInbound() {
    let NFInboundId = this.props.match.params.id;
    axios
      .get(`http://localhost/api/Fornecedores/${NFInboundId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let NFInboundId = this.state.details.id;
    axios
      .delete(`http://localhost/api/Fornecedores/${NFInboundId}`)
      .then(response => {
        this.props.history.push("/NFsInbound");
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
            <Link className="float-right mr-2 mt-2" to="/NFsInbound">
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
                    Dados de Pagamento
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="NFIyear">
                        Ano:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIyear"
                        value={this.state.details.STATUS}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group ">
                      <label className="grey-text" htmlFor="NFIType">
                        Tipo:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIType"
                        value={this.state.details.DT_INICIO}
                      />
                    </MDBCol>
                    <MDBCol md="1" className="form-group ">
                      <label className="grey-text" htmlFor="NFINumber">
                        Nº NF:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFINumber"
                        value={this.state.details.DT_FIM}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="NFIEmissor">
                        Emissor:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIEmissor"
                        value={this.state.details.CNPJ}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFICnpj">
                        CNPJ:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFICnpj"
                        value={this.state.details.TEL_COM}
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
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIDt"
                        value={this.state.details.END_EMPRESA}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="form-group">
                      <label className="grey-text" htmlFor="NFICollab">
                        Colaborador:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFICollab"
                        value={this.state.details.BAIRRO}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="NFIService">
                        Serviço:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIService"
                        value={this.state.details.MUNICIPIO}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBTabPane>

                <MDBTabPane tabId="2" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFIAmount">
                        Valor Bruto:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFAmount"
                        value={this.state.details.TIPO}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFIIssSp">
                        ISS-SP:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIIssSp"
                        value={this.state.details.TIPO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFIIrrf">
                        IRRF (15%):{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIIrrf"
                        value={this.state.details.BCO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFIpiscofins">
                        PIS/COFINS (4,65%):{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIpiscofins"
                        value={this.state.details.NOME_BANCO}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="NFINetValue">
                        Valor Líquido:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFINetValue"
                        value={this.state.details.AG}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-2">
                    <MDBCol md="2">
                      <MDBRow>
                        <MDBCol>
                          <label htmlFor="NFIReceivedDt" className="grey-text">
                            Data Recebimento:{" "}
                          </label>
                          <input
                            type="date"
                            id="NFIReceivedDt"
                            className="form-control disabled read-only"
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
                            id="NFIPayingDt"
                            className="form-control disabled read-only"
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                    <MDBCol md="10">
                      <div className="form-group grey-text">
                        <label htmlFor="NFIComments">Comentários: </label>
                        <textarea
                          className="form-control disabled read-only"
                          id="NFIComments"
                          rows="5"
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBTabPane>
                <MDBBtn
                  href={`/NFsInbound/edit/${this.state.details.ID}`}
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
          href="/NFsInbound/add"
          className="px-3 py-3 btn deep-orange darken-3 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default NFInboundDetails;
