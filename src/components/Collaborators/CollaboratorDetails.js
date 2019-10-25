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
import MomentInput from "react-moment-input";
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";

class CollaboratorDetails extends Component {
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
    this.getCollaborator();
  }

  getCollaborator() {
    let collaboratorId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/colaboradores/${collaboratorId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let collaboratorId = this.state.details.id;
    axios
      .delete(`http://127.0.0.1:8000/api/colaboradores/${collaboratorId}`)
      .then(response => {
        console.log(`ID excluído: ${collaboratorId}`);
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Collaborators"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  // Toggle Confirmation Delete Register Modal
  toggleDeleteCollaboratorModal = nr => () => {
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
          {this.state.alertMessage === "success" ? <SuccessMessage /> : null}
          {this.state.alertMessage === "error" ? <ErrorMessage /> : null}
        </div>
        <MDBCard className="mt-3 mb-4">
          <MDBCardTitle style={{ fontSize: 28 }}>
            <strong className="text-uppercase">
              {this.state.details.nome}
            </strong>
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
              </MDBNav>

              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="6" className="form-group">
                      <label className="grey-text" htmlFor="collabNick">
                        Apelido:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabNick"
                        value={this.state.details.apelido}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group ">
                      <label className="grey-text" htmlFor="collabBday">
                        Data Nascimento:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabBday"
                        value={this.state.details.data_nascimento}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group ">
                      <label className="grey-text" htmlFor="collabStatus">
                        Status:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabStatus"
                        value={this.state.details.status}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    {/* <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabEmail">
                        Email:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabEmail"
                        value={this.state.details.email}
                      />
                    </MDBCol> */}
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabPEmail">
                        Email Pessoal:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabPEmail"
                        value={this.state.details.email_pessoal}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabPhone">
                        Telefone:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabPhone"
                        value={this.state.details.telefone}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabMobile">
                        Celular:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabMobile"
                        value={this.state.details.celular}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabCpf">
                        CPF:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabCpf"
                        value={this.state.details.cpf}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabRg">
                        RG:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabRg"
                        value={this.state.details.rg}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="collabEmis">
                        Órgão Emis.:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabEmis"
                        value={this.state.details.orgao_emissor}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabCtps">
                        CTPS:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabCtps"
                        value={this.state.details.ctps}
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
                        className="form-control disabled read-only"
                        type="text"
                        id="collabAddress"
                        value={this.state.details.endereco}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="collabNeighborhood">
                        Bairro:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabNeighborhood"
                        value={this.state.details.bairro}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-2">
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabCity">
                        Cidade:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabCity"
                        value={this.state.details.cidade}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabState">
                        Estado:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabState"
                        value={this.state.details.estado}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabCountry">
                        País:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabCountry"
                        value={this.state.details.pais}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="collabZipcode">
                        CEP:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="collabZipcode"
                        value={this.state.details.cep}
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

                <MDBBtn
                  href={`/Collaborators/edit/${this.state.details.id}`}
                  className="cyan lighten-2 float-right"
                >
                  <MDBIcon far icon="edit" /> Editar
                </MDBBtn>
                <MDBBtn
                  // onClick={this.onDelete.bind(this)}
                  onClick={this.toggleDeleteCollaboratorModal(1)}
                  className="btn grey lighten-1 float-right"
                >
                  Excluir
                </MDBBtn>
                <MDBBtn
                  href="/Collaborators"
                  value="Return"
                  className="btn grey lighten-1 float-right"
                >
                  Voltar
                </MDBBtn>
              </MDBTabContent>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
        <MDBBtn
          size="lg"
          href="/Collaborators/add"
          className="px-3 py-3 light-blue darken-4 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>

        {/* Delete Confirmation Modal */}
        <div>
          <MDBModal
            isOpen={this.state.modal1}
            toggle={this.toggleDeleteCollaboratorModal(1)}
            centered
          >
            <MDBModalHeader toggle={this.toggleDeleteCollaboratorModal(1)}>
              Deletar registro
            </MDBModalHeader>
            <MDBModalBody>
              Esta ação irá excluir o registro permanentemente. Deseja
              prosseguir?
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                className="btn grey lighten-1"
                onClick={this.toggleDeleteCollaboratorModal(1)}
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
export default CollaboratorDetails;
