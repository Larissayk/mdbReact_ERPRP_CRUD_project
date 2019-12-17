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

class CustomerDetails extends Component {
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
    this.getCustomer();
  }

  getCustomer() {
    let customerId = this.props.match.params.id;
    axios
      .get(`API URL CLIENTES/${customerId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let customerId = this.state.details.id;
    axios
      .delete(`API URL CLIENTES/${customerId}`)
      .then(response => {
        console.log(`ID excluído: ${customerId}`);
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Customers"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  // Toggle Confirmation Delete Register Modal
  toggleDeleteCustomerModal = nr => () => {
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
                <strong className="text-uppercase">
                  {this.state.details.empresa}
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
                        <MDBCol md="5" className="form-group">
                          <label className="grey-text" htmlFor="cnpj">
                            CNPJ:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="cnpj"
                            value={this.state.details.cnpj}
                          />
                        </MDBCol>
                        <MDBCol md="3" className="form-group ">
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
                        <MDBCol md="2" className="form-group">
                          <label className="grey-text" htmlFor="dt_inicio">
                            Data de início:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="dt_inicio"
                            value={this.state.details.data_inicio}
                          />
                        </MDBCol>
                        <MDBCol md="2" className="form-group">
                          <label className="grey-text" htmlFor="dt_fim">
                            Data de término:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="dt_fim"
                            value={this.state.details.data_fim}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group ">
                          <label className="grey-text" htmlFor="contato">
                            Contato:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="contato"
                            value={this.state.details.contato1}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group ">
                          <label className="grey-text" htmlFor="cargo">
                            Cargo do contato:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="cargo"
                            value={this.state.details.cargo1}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="email">
                            Email do contato:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="email_contato"
                            value={this.state.details.email_contato}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="telefone">
                            Telefone:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="telefone"
                            value={this.state.details.telefone}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="celular">
                            Celular:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="celular"
                            value={this.state.details.celular}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="email">
                            Email:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="email"
                            value={this.state.details.email}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="municipal">
                            Insc. Municipal:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="municipal"
                            value={this.state.details.insc_municipal}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="estadual">
                            Insc. Estadual:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="estadual"
                            value={this.state.details.insc_estadual}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol md="8" className="form-group">
                          <label className="grey-text" htmlFor="endereco">
                            Endereço:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="endereco"
                            value={this.state.details.endereco}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="bairro">
                            Bairro:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="bairro"
                            value={this.state.details.bairro}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="mb-2">
                        <MDBCol md="3" className="form-group">
                          <label className="grey-text" htmlFor="cidade">
                            Município:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="cidade"
                            value={this.state.details.municipio}
                          />
                        </MDBCol>
                        <MDBCol md="3" className="form-group">
                          <label className="grey-text" htmlFor="uf">
                            UF:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="uf"
                            value={this.state.details.uf}
                          />
                        </MDBCol>
                        <MDBCol md="3" className="form-group">
                          <label className="grey-text" htmlFor="pais">
                            País:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="pais"
                            value={this.state.details.pais}
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
                      href={`/Customers/edit/${this.state.details.id}`}
                      className="cyan lighten-2 float-right"
                    >
                      <MDBIcon far icon="edit" /> Editar
                    </MDBBtn>
                    <MDBBtn
                      // onClick={this.onDelete.bind(this)}
                      onClick={this.toggleDeleteCustomerModal(1)}
                      className="btn grey lighten-1 float-right"
                    >
                      Excluir
                    </MDBBtn>
                    <MDBBtn
                      href="/Customers"
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
              href="/Customers/add"
              className="px-3 py-3 light-blue darken-4 circle-btn"
            >
              <MDBIcon size="lg" className="text-white" icon="plus" />
            </MDBBtn>

            {/* Delete Confirmation Modal */}
            <MDBModal
              isOpen={this.state.modal1}
              toggle={this.toggleDeleteCustomerModal(1)}
              centered
            >
              <MDBModalHeader toggle={this.toggleDeleteCustomerModal(1)}>
                Deletar registro
              </MDBModalHeader>
              <MDBModalBody>
                Esta ação irá excluir o registro permanentemente. Deseja
                prosseguir?
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  className="btn grey lighten-1"
                  onClick={this.toggleDeleteCustomerModal(1)}
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
export default CustomerDetails;
