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
  MDBCardTitle,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import axios from "axios";
import Moment from "react-moment";
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";

class NFExitDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      activeItem: "1",
      modal1: false,
      alertMessage: ""
    };
  }

  componentDidMount() {
    this.getNFExit();
  }

  getNFExit() {
    let NFExitId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/nota_saida/${NFExitId}`)
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
      .delete(`http://127.0.0.1:8000/api/nota_saida/${NFExitId}`)
      .then(response => {
        console.log(`ID excluído: ${NFExitId}`);
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/NFsExit"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  // Toggle Confirmation Delete Register Modal
  toggleDeleteNFexitModal = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <div>
              {this.state.alertMessage === "success" ? (
                <SuccessMessage />
              ) : null}
              {this.state.alertMessage === "error" ? <ErrorMessage /> : null}
            </div>
            <MDBCard className="mt-3 mb-4">
              <MDBCardTitle style={{ fontSize: 28 }}>
                <strong>Nº NF:{this.state.details.nota_fiscal}</strong>
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
                            id="year"
                            value={this.state.details.ano}
                          />
                        </MDBCol>
                        <MDBCol md="2" className="form-group ">
                          <label className="grey-text" htmlFor="NFEType">
                            Tipo:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="type"
                            value={this.state.details.tipo_nf}
                          />
                        </MDBCol>
                        <MDBCol md="2" className="form-group ">
                          <label className="grey-text" htmlFor="NFENumber">
                            Nº NF:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="NFENumber"
                            value={this.state.details.nota_fiscal}
                          />
                        </MDBCol>
                        <MDBCol md="3" className="form-group">
                          <label className="grey-text" htmlFor="NFEEmissor">
                            Emissor:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="NFEEmissor"
                            value={this.state.details.empresa_emitente}
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
                            value={this.state.details.cnpj}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <h5 className="grey-text mb-3 ml-3">Contrato</h5>
                      </MDBRow>
                      <MDBRow className="mb-2">
                        <MDBCol md="5" className="form-group">
                          <label className="grey-text" htmlFor="NFEId">
                            Identificação:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="NFEId"
                            value={this.state.details.identif_contrato}
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
                            value={this.state.details.status}
                          />
                        </MDBCol>
                        <MDBCol md="3" className="form-group">
                          <label className="grey-text" htmlFor="contractNumb">
                            Nº Contrato:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="contractNumb"
                            value={this.state.details.contrato}
                          />
                        </MDBCol>
                        <MDBCol md="2" className="form-group">
                          <label className="grey-text" htmlFor="contractNumb">
                            Data:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="contractNumb"
                            value={this.state.details.data_contrato}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />

                      <div className="float-left">
                        <label className="grey-text">
                          Criado em:
                          <Moment
                            format="DD/MM/YYYY"
                            date={this.state.details.created_at}
                          />
                        </label>
                        <br />
                        <label className="grey-text">
                          Última atualização:
                          <Moment
                            format="DD/MM/YYYY"
                            date={this.state.details.updated_at}
                          />
                        </label>
                      </div>
                    </MDBTabPane>

                    <MDBTabPane tabId="2" role="tabpanel">
                      <MDBRow className="mt-4">
                        <MDBCol md="2" className="form-group">
                          <label htmlFor="NFEPreviousDt" className="grey-text">
                            Data Emissão:{" "}
                          </label>
                          <input
                            type="text"
                            id="data_de_emissao"
                            className="form-control disabled read-only"
                            value={this.state.details.data_de_emissao}
                          />
                        </MDBCol>
                        <MDBCol md="2" className="form-group">
                          <label htmlFor="NFEPreviousDt" className="grey-text">
                            Data Prévia:{" "}
                          </label>
                          <input
                            type="text"
                            id="NFEPreviousDt"
                            className="form-control disabled read-only"
                            value={this.state.details.data_prev_pagto}
                          />
                        </MDBCol>
                        <MDBCol md="2" className="form-group">
                          <label htmlFor="NFERealDt" className="grey-text">
                            Data Real:{" "}
                          </label>
                          <input
                            type="text"
                            id="NFERealDt"
                            className="form-control disabled read-only"
                            value={this.state.details.data_real_pagto}
                          />
                        </MDBCol>
                        <MDBCol md="3" className="form-group">
                          <label htmlFor="NFERealDt" className="grey-text">
                            Ordem de Compra:{" "}
                          </label>
                          <input
                            type="text"
                            id="ordem_compra"
                            className="form-control disabled read-only"
                            value={this.state.details.ordem_compra}
                          />
                        </MDBCol>
                        <MDBCol md="3" className="form-group">
                          <label htmlFor="NFERealDt" className="grey-text">
                            Parcela:{" "}
                          </label>
                          <input
                            type="text"
                            id="parcela"
                            className="form-control disabled read-only"
                            value={this.state.details.parcela}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="mb-2">
                        <MDBCol md="3" className="form-group">
                          <label className="grey-text" htmlFor="NFAmount">
                            Valor Bruto:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="NFAmount"
                            value={this.state.details.valor_bruto}
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
                            value={this.state.details.irrf}
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
                            value={this.state.details.pis_cofins}
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
                            value={this.state.details.valor_liquido}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="12">
                          <div className="form-group grey-text">
                            <label htmlFor="NFEComments">Comentários: </label>
                            <textarea
                              className="form-control disabled read-only"
                              id="NFEComments"
                              rows="5"
                              value={this.state.details.obs}
                            />
                          </div>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                    </MDBTabPane>
                    <MDBBtn
                      href={`/NFsExit/edit/${this.state.details.id}`}
                      className="cyan lighten-2 float-right"
                    >
                      <MDBIcon far icon="edit" /> Editar
                    </MDBBtn>
                    <MDBBtn
                      onClick={this.toggleDeleteNFexitModal(1)}
                      className="btn grey lighten-1 float-right"
                    >
                      Excluir
                    </MDBBtn>
                    <MDBBtn
                      href="/NFsExit"
                      value="Return"
                      className="btn grey lighten-1 float-right"
                    >
                      Voltar
                    </MDBBtn>
                  </MDBTabContent>
                </MDBContainer>
              </MDBCardBody>
            </MDBCard>
            {/* Delete Confirmation Modal */}
            <MDBModal
              isOpen={this.state.modal1}
              toggle={this.toggleDeleteNFexitModal(1)}
              centered
            >
              <MDBModalHeader toggle={this.toggleDeleteNFexitModal(1)}>
                Deletar registro
              </MDBModalHeader>
              <MDBModalBody>
                Esta ação irá excluir o registro permanentemente. Deseja
                prosseguir?
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  className="btn grey lighten-1"
                  onClick={this.toggleDeleteNFexitModal(1)}
                >
                  Não
                </MDBBtn>
                <MDBBtn
                  className="btn deep-orange darken-4"
                  onClick={this.onDelete.bind(this)}
                >
                  Sim
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <MDBBtn
              size="lg"
              href="/NFsExit/add"
              className="px-3 py-3 light-blue darken-4 circle-btn"
            >
              <MDBIcon size="lg" className="text-white" icon="plus" />
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default NFExitDetails;
