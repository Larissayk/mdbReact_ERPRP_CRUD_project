import React, { Component } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardBody,
  MDBBadge,
  MDBCardTitle,
  MDBIcon,
  MDBBtn,
  MDBRow,
  MDBCol
} from "mdbreact";
import axios from "axios";
import CollaboratorDealItem from "./CollabDealItem";

class CollaboratorDeals extends Component {
  constructor() {
    super();
    this.state = {
      collaboratorsDeal: [],
      search: "",
      sort: ""
    };
  }

  componentDidMount() {
    this.getCollaboratorsDeal();
  }

  getCollaboratorsDeal() {
    axios
      .get("http://127.0.0.1:8000/api/negociacoes")
      .then(response => {
        this.setState({ collaboratorsDeal: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 30) });
    console.log(this.state);
  }

  handleSort(event) {
    this.setState({ sort: event.target.value, search: "" });
    console.log(`sortBy: ${event.target.value}`);
  }

  render() {
    let filteredData = this.state.collaboratorsDeal.filter(negociacoes => {
      return (
        negociacoes.nome
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1 &&
        negociacoes.status
          .toLowerCase()
          .indexOf(this.state.sort.toLowerCase()) !== -1)
      
      
    });
    const { collaboratorsDeal } = this.state;
    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4">
          <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
            <strong>DADOS DE NEGOCIAÇÃO</strong>
          </MDBCardTitle>
          <hr className="mb-0" />
          <MDBCardBody className="pt-0 mt-0">
            <MDBRow>
              <MDBCol md="4" className="float-right p-0 m-0">
                <div className="input-group md-form form-sm form-1 pl-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-text1">
                      <MDBIcon className="text-white" icon="search" />
                    </span>
                  </div>
                  <input
                    className="form-control my-0 py-1"
                    type="text"
                    placeholder="Busque pelo nome"
                    aria-label="Search"
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                  />
                </div>
              </MDBCol>
              <MDBCol md="4" className=" p-0 my-4 ">
                <div>
                  <select
                    defaultValue=" "
                    onChange={this.handleSort.bind(this)}
                    style={{ width: 130 }}
                    className="form-control my-0 py-1 custom-select"
                  >
                    <option value="">Status</option>
                    <option value="ativo">Ativo</option>
                    <option value="desligado">Desligado</option>
                  </select>
                </div>
              </MDBCol>
              <MDBCol md="4" className="p-0 m-0 ">
                <MDBBtn
                  className="pt-3 px-3 my-3 float-right light-blue darken-4"
                  href="/CollabDeals/add"
                >
                  <MDBIcon icon="plus" /> Novo Registro
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBTable hover className="mb-2 mt-0">
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Função</th>
                  <th>Tipo de contrato</th>
                  <th>Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {/* Arrumar com os dados do API de Negociação  */}
                {filteredData.map(negociacoes => {
                  return (
                    <tr>
                      <td className="align-middle">{negociacoes.id}</td>
                      <td className="align-middle">
                        <CollaboratorDealItem
                          key={negociacoes.id}
                          item={negociacoes}
                        />
                      </td>
                      <td className="align-middle">{negociacoes.funcao}</td>
                      <td className="align-middle">{negociacoes.tipo}</td>
                      <td className="align-middle">
                        {negociacoes.status.toLowerCase() == "ativo" ?(
                          <MDBBadge className="p-2" pill color="success">
                            Ativo
                          </MDBBadge>
                        ) : (
                          <MDBBadge className="p-2" pill color="danger">
                            Desligado
                          </MDBBadge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
export default CollaboratorDeals;
