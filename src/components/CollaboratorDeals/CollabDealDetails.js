import React, { Component } from "react";
import {
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

class CollaboratorDealDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      activeItem: "1"
    };
  }

  componentDidMount() {
    this.getCollaboratorsDeal();
  }

  getCollaboratorsDeal() {
    let collabDealId = this.props.match.params.id;
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${collabDealId}`)
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
      .delete(`https://jsonplaceholder.typicode.com/users/${collabDealId}`)
      .then(response => {
        this.props.history.push("/CollabDeals");
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4">
          <MDBCardBody className="pt-0">
            <Link className="float-right mr-2 mt-4" to="/CollabDeals">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
                {this.state.details.name}
              </MDBCardTitle>
            </MDBCardHeader>

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
                    value={this.state.details.website}
                  />
                </MDBCol>
                <MDBCol md="5" className="form-group ">
                  <label className="grey-text" htmlFor="startDate">
                    Sequência de Negociação:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="startDate"
                    // value={this.state.details.DT_INICIO}
                  />
                </MDBCol>
                <MDBCol md="2" className="form-group ">
                  <label className="grey-text" htmlFor="endDate">
                    Data de início:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="endDate"
                    // value={this.state.details.DT_FIM}
                  />
                </MDBCol>
                <MDBCol md="2" className="form-group ">
                  <label className="grey-text" htmlFor="endDate">
                    Data de término:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="endDate"
                    // value={this.state.details.DT_FIM}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="4" className="form-group">
                  <label className="grey-text" htmlFor="cnpj">
                    Função:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="cnpj"
                    value={this.state.details.username}
                  />
                </MDBCol>
                <MDBCol md="4" className="form-group">
                  <label className="grey-text" htmlFor="phone">
                    CPF:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="phone"
                    // value={this.state.details.TEL_COM}
                  />
                </MDBCol>
                <MDBCol md="4" className="form-group">
                  <label className="grey-text" htmlFor="mobile">
                    CNPJ:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="mobile"
                    // value={this.state.details.CEL_COM}
                  />
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow className="mb-2">
                <MDBCol md="2" className="form-group">
                  <label className="grey-text" htmlFor="address">
                    Contrato:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="address"
                    // value={this.state.details.END_EMPRESA}
                  />
                </MDBCol>
                <MDBCol md="2" className="form-group">
                  <label className="grey-text" htmlFor="neighborhood">
                    Tipo:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="neighborhood"
                    // value={this.state.details.BAIRRO}
                  />
                </MDBCol>
                <MDBCol md="2" className="form-group">
                  <label className="grey-text" htmlFor="municipality">
                    Valor/hora PJ:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="municipality"
                    // value={this.state.details.MUNICIPIO}
                  />
                </MDBCol>
                <MDBCol md="2" className="form-group">
                  <label className="grey-text" htmlFor="city">
                    Valor CLT:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="city"
                    // value={this.state.details.CIDADE}
                  />
                </MDBCol>
                <MDBCol md="4" className="form-group">
                  <label className="grey-text" htmlFor="state">
                    CPF Aprovador:{" "}
                  </label>
                  <input
                    className="form-control disabled read-only"
                    type="text"
                    id="state"
                    // value={this.state.details.ESTADO}
                  />
                </MDBCol>
              </MDBRow>
              <hr />

              <MDBBtn
                href={`/CollabDeals/edit/${this.state.details.id}`}
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
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
        <MDBBtn
          size="lg"
          href="/CollabDeals/add"
          className="px-3 py-3 btn deep-orange darken-3 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default CollaboratorDealDetails;
