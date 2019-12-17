import React, { Component } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBIcon,
  MDBCol,
  MDBRow,
  MDBBadge
} from "mdbreact";
import axios from "axios";
import ProviderItem from "./ProviderItem";
import Moment from "react-moment";

class Providers extends Component {
  constructor() {
    super();
    this.state = {
      fornecedores: [],
      search: "",
      sort: ""
    };
  }

  componentDidMount() {
    this.getProviders();
  }

  getProviders() {
    axios
      .get("API URL FORNECEDORES")
      .then(response => {
        this.setState({ fornecedores: response.data }, () => {
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
    let filteredData = this.state.fornecedores.filter(fornecedores => {
      return (
        fornecedores.nome
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1 &&
        fornecedores.status
          .toLowerCase()
          .indexOf(this.state.sort.toLowerCase()) !== -1)
      
    });

    return (
      <MDBRow>
        <MDBCol md="12">
          <MDBCard className="mt-3 mb-4 px-2 card">
            <MDBCardTitle style={{ fontSize: 28 }}>
              <strong>FORNECEDORES</strong>
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
                    color="#FFF"
                    className="pt-3 px-3 my-3 float-right btn-color-table"
                    href="/Providers/add"
                  >
                    <MDBIcon icon="plus" /> Novo Registro
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              <MDBTable small striped hover className="mb-2 mt-0">
                <MDBTableHead>
                  <tr>
                    <th>#</th>
                    <th>NOME</th>
                    <th>CNPJ</th>
                    <th>DATA INÍCIO</th>
                    <th className="text-center">STATUS</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {filteredData.map(fornecedores => {
                    return (
                      <tr key={fornecedores.id}>
                        <td className="align-middle">{fornecedores.id}</td>
                        <td style={{ width: 500 }} className="align-middle">
                          <ProviderItem
                            key={fornecedores.id}
                            item={fornecedores}
                          />
                        </td>
                        <td className="align-middle">{fornecedores.cnpj}</td>
                        <td className="align-middle">
                          <Moment
                            format="DD/MM/YYYY"
                            date={fornecedores.data_inicio}
                          />
                        </td>
                        <td className="text-center">
                          {fornecedores.status.toLowerCase() === "ativo" ? (
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
        </MDBCol>
      </MDBRow>
    );
  }
}
export default Providers;
