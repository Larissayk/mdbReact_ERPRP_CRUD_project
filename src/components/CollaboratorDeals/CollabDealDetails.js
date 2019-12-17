import React, { Component } from "react";
import {
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader
} from "mdbreact";
import axios from "axios";
import Moment from "react-moment";
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";

class CollaboratorDealDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      modal1: false,
      activeItem: "1",
      alertMessage: ""
    };
  }

  componentDidMount() {
    this.getCollaboratorsDeal();
  }

  getCollaboratorsDeal() {
    let collabDealId = this.props.match.params.id;
    axios
      .get(`API URL NEGOCIACOES/${collabDealId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let collabDealId = this.state.details.id;
    axios
      .delete(`API URL NEGOCIACOES/${collabDealId}`)
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/CollabDeals"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  // Toggle Confirmation Delete Register Modal
  toggleDeleteCollabDealModal = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
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
                <strong className="text-uppercase">
                  {this.state.details.nome}
                </strong>{" "}
              </MDBCardTitle>
              <hr className="mb-0" />
              <MDBCardBody className="mt-0">
                <MDBContainer>
                  <MDBRow>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="status">
                        Status:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="status"
                        value={this.state.details.status}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group ">
                      <label className="grey-text" htmlFor="seq_neg">
                        Sequência de Negociação:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="seq_neg"
                        value={this.state.details.seq_neg}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group ">
                      <label className="grey-text" htmlFor="data_neg">
                        Dt. Negociação:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="data_neg"
                        value={this.state.details.data_neg}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group ">
                      <label className="grey-text" htmlFor="data_inicio">
                        Data de início:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="data_inicio"
                        value={this.state.details.data_inicio}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group ">
                      <label className="grey-text" htmlFor="data_fim">
                        Data de término:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="data_fim"
                        value={this.state.details.data_fim}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="funcao">
                        Função:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="funcao"
                        value={this.state.details.funcao}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="cpf">
                        CPF:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="cpf"
                        value={this.state.details.cpf}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="cnpj">
                        CNPJ:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="cnpj"
                        value={this.state.details.cnpj_do_pj}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="mb-2">
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="tipo">
                        Tipo:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="tipo"
                        value={this.state.details.tipo}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="vlr_hr_pj">
                        Valor/hora PJ:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="vlr_hr_pj"
                        value={this.state.details.vlr_hr_pj}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="fechado_aberto">
                        Aberto/Fechado:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="fechado_aberto"
                        value={this.state.details.fechado_aberto}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="vlr_clt">
                        Valor CLT:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="vlr_clt"
                        value={this.state.details.vlr_clt}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="cpf_aprovador">
                        CPF Aprovador:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="cpf_aprovador"
                        value={this.state.details.cpf_aprovador}
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

                  <MDBBtn
                    href={`/CollabDeals/edit/${this.state.details.id}`}
                    className="cyan lighten-2 float-right"
                  >
                    <MDBIcon far icon="edit" /> Editar
                  </MDBBtn>
                  <MDBBtn
                    onClick={this.toggleDeleteCollabDealModal(1)}
                    className="btn grey lighten-1 float-right"
                  >
                    Excluir
                  </MDBBtn>
                  <MDBBtn
                    href="/CollabDeals"
                    value="Return"
                    className="btn grey lighten-1 float-right"
                  >
                    Voltar
                  </MDBBtn>
                </MDBContainer>
              </MDBCardBody>
            </MDBCard>
            <MDBBtn
              size="lg"
              href="/CollabDeals/add"
              className="px-3 py-3 btn light-blue darken-4 circle-btn"
            >
              <MDBIcon size="lg" className="text-white" icon="plus" />
            </MDBBtn>

            {/* Delete Confirmation Modal */}
            <MDBModal
              isOpen={this.state.modal1}
              toggle={this.toggleDeleteCollabDealModal(1)}
              centered
            >
              <MDBModalHeader toggle={this.toggleDeleteCollabDealModal(1)}>
                Deletar registro
              </MDBModalHeader>
              <MDBModalBody>
                Esta ação irá excluir o registro permanentemente. Deseja
                prosseguir?
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  className="btn grey lighten-1"
                  onClick={this.toggleDeleteCollabDealModal(1)}
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
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default CollaboratorDealDetails;
