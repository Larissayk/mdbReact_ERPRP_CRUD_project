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
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";


class NFInboundDetails extends Component {
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
    this.getNFInbound();
  }

  getNFInbound() {
    let NFInboundId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/nota_entrada/${NFInboundId}`)
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
      .delete(`http://127.0.0.1:8000/api/nota_entrada/${NFInboundId}`)
      .then(response => {
        console.log(`ID excluído: ${NFInboundId}`);
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/NFsInbound"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  // Toggle Confirmation Delete Register Modal
  toggleDeleteNFinboundModal = nr => () => {
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
      <MDBContainer className="main-body">
        <div>
          {this.state.alertMessage == "success" ? <SuccessMessage /> : null}
          {this.state.alertMessage == "error" ? <ErrorMessage /> : null}
        </div>
        <MDBCard className="mt-3 mb-4">
          <MDBCardTitle style={{ fontSize: 28 }}>
            <strong>Nº NF: {this.state.details.num_nf}</strong>
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
                    {/* <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="NFIyear">
                        Nº:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIyear"
                        value={this.state.details.num_nf}
                      />
                    </MDBCol> */}
                    <MDBCol md="3" className="form-group ">
                      <label className="grey-text" htmlFor="NFIType">
                        Tipo:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIType"
                        value={this.state.details.tpnf_nfs_nfts_nd}
                      />
                    </MDBCol>
                    {/* <MDBCol md="1" className="form-group ">
                      <label className="grey-text" htmlFor="NFINumber">
                        Nº NF:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFINumber"
                        value={this.state.details.num_nf}
                      />
                    </MDBCol> */}
                    <MDBCol md="5" className="form-group">
                      <label className="grey-text" htmlFor="NFIEmissor">
                        Empresa:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFIEmissor"
                        value={this.state.details.empresa}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="NFICnpj">
                        CNPJ:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="NFICnpj"
                        value={this.state.details.cnpj}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <h5 className="grey-text mb-3 ml-3">Identificação</h5>
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
                        value={this.state.details.data_emissao}
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
                        value={this.state.details.colaborador}
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
                        value={this.state.details.servico}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
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
                        value={this.state.details.valor_nf}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label htmlFor="NFIReceivedDt" className="grey-text">
                        Data Recebimento:{" "}
                      </label>
                      <input
                        type="date"
                        id="NFIReceivedDt"
                        className="form-control disabled read-only"
                        value={this.state.details.data_receber}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label htmlFor="NFIPayingDt" className="grey-text">
                        Data Pagamento:{" "}
                      </label>
                      <input
                        type="date"
                        id="NFIPayingDt"
                        className="form-control disabled read-only"
                        value={this.state.details.data_pagar}
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
                        value={this.state.details.iss_sp}
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
                        value={this.state.details.irrf}
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
                        value={this.state.details.pis_cofins}
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
                        value={this.state.details.valor_liquido}
                      />
                    </MDBCol>
                  </MDBRow>
                  {/* <MDBRow className="mb-2">
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
                            value={this.state.details.data_receber}
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
                            value={this.state.details.data_pagar}
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCol> */}
                  {/* <MDBCol md="10">
                      <div className="form-group grey-text">
                        <label htmlFor="NFIComments">Comentários: </label>
                        <textarea
                          className="form-control disabled read-only"
                          id="NFIComments"
                          rows="5"
                        />
                      </div>
                    </MDBCol> */}
                  {/* </MDBRow> */}
                  <hr />
                </MDBTabPane>
                <MDBBtn
                  href={`/NFsInbound/edit/${this.state.details.id}`}
                  className="light-blue darken-4 float-right"
                >
                  <MDBIcon far icon="edit" /> Editar
                </MDBBtn>
                <MDBBtn
                  onClick={this.toggleDeleteNFinboundModal(1)}
                  className="btn grey lighten-1 float-right"
                >
                  <MDBIcon icon="trash-alt" /> Excluir
                </MDBBtn>
                <MDBBtn
                  href="/NFsInbound"
                  value="Return"
                  className="btn grey lighten-1 float-right"
                >
                  <MDBIcon icon="undo-alt" /> Voltar
                </MDBBtn>
              </MDBTabContent>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
        <MDBBtn
          size="lg"
          href="/NFsInbound/add"
          className="px-3 py-3 btn light-blue darken-4 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>

        {/* Delete Confirmation Modal */}
        <div>
          <MDBModal
            isOpen={this.state.modal1}
            toggle={this.toggleDeleteNFinboundModal(1)}
            centered
          >
            <MDBModalHeader toggle={this.toggleDeleteNFinboundModal(1)}>
              Deletar registro
            </MDBModalHeader>
            <MDBModalBody>
              Esta ação irá excluir o registro permanentemente. Deseja
              prosseguir?
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                className="btn grey lighten-1"
                onClick={this.toggleDeleteNFinboundModal(1)}
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
        </div>
      </MDBContainer>
    );
  }
}
export default NFInboundDetails;
