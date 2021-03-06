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

class ProviderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      activeItem: "1",
      modal1: false
    };
  }

  componentDidMount() {
    this.getProvider();
  }

  getProvider() {
    let providerId = this.props.match.params.id;
    axios
      .get(`API URL FORNECEDORES/${providerId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let providerId = this.state.details.id;
    axios
      .delete(`API URL FORNECEDORES/${providerId}`)
      .then(response => {
        console.log(`ID excluído: ${providerId}`);
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Providers"), 1800);
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
    const data_inicio = this.state.details.data_inicio;

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
                </strong>
              </MDBCardTitle>
              <hr className="mb-0" />
              <MDBCardBody className="pt-0">
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
                            value={this.state.details.status}
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
                            value={this.state.details.data_inicio}
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
                            value={this.state.details.data_fim}
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
                            value={this.state.details.cnpj}
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
                            value={this.state.details.telefone}
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
                            value={this.state.details.celular}
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
                            value={this.state.details.endereco}
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
                            value={this.state.details.bairro}
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
                            value={this.state.details.municipio}
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
                            value={this.state.details.cidade}
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
                            value={this.state.details.estado}
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
                            value={this.state.details.tipo}
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
                            value={this.state.details.bco}
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
                            value={this.state.details.nome_banco}
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
                            value={this.state.details.ag}
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
                            value={this.state.details.cc}
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
                            value={this.state.details.ccm}
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
                            value={this.state.details.certf_mun}
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
                            value={this.state.details.certf_est}
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
                            value={this.state.details.certf_fed}
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
                            value={this.state.details.ie}
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
                            value={this.state.details.simples}
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
                            value={this.state.details.reter_iss_sp}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                    </MDBTabPane>

                    <MDBBtn
                      href={`/Providers/edit/${this.state.details.id}`}
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
                      href="/Providers"
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
              href="/Providers/add"
              className="px-3 py-3 btn light-blue darken-4 circle-btn"
            >
              <MDBIcon size="lg" className="text-white" icon="plus" />
            </MDBBtn>

            {/* Delete Confirmation Modal */}
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
              
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default ProviderDetails;
