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
  MDBBadge,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdbreact";
import axios from "axios";
import NFExitItem from "./NFExitItem";
import Moment from "react-moment";

class NFsExit extends Component {
  constructor() {
    super();
    this.state = {
      nfsExit: [],
      search: "",
      sort: ""
    };
  }

  componentDidMount() {
    this.getNFsExit();
  }

  getNFsExit() {
    axios
      .get("http://127.0.0.1:8000/api/nota_saida")
      .then(response => {
        this.setState({ nfsExit: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 30) });
    console.log(`searchName: ${event.target.value}`);
  }

  handleSort(event) {
    this.setState({ sort: event.target.value, search: "" });
    console.log(`sortBy: ${event.target.value}`);
  }

  render() {
    let filteredData = this.state.nfsExit.filter(nota_saida => {
      return (
        nota_saida.nota_fiscal.indexOf(this.state.search) !== -1 &&
        nota_saida.status
          .toLowerCase()
          .indexOf(this.state.sort.toLowerCase()) !== -1
      );
    });


    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4">
          <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
            <strong>NF-SAÍDA</strong>
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
                    placeholder="Busque pelo número"
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
                    <option value="OK">OK</option>
                    <option value="canc">Cancelado</option>
                  </select>
                </div>
              </MDBCol>
              <MDBCol md="4" className="p-0 m-0">
                <MDBBtn
                  color="#FFF"
                  className="pt-3 px-3 my-3 float-right btn-color-table"
                  href="/NFsExit/add"
                >
                  <MDBIcon icon="plus" /> Novo Registro
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBTable hover small striped className="mb-2 mt-0">
              <MDBTableHead>
                <tr>
                  <th>Nº</th>
                  <th>ANO</th>
                  <th>TIPO</th>
                  <th>DATA EMISSÃO</th>
                  <th>EMPRESA</th>
                  <th className="text-center">STATUS CONTR.</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredData.map(nota_saida => {
                  return (
                    <tr key={nota_saida.id}>
                      <td className="align-middle">
                        <NFExitItem key={nota_saida.id} item={nota_saida} />
                      </td>
                      <td className="align-middle">{nota_saida.ano}</td>
                      <td className="align-middle">{nota_saida.tipo_nf}</td>
                      <td style={{ width: 150 }} className="align-middle">
                        <Moment
                          format="DD/MM/YYYY"
                          date={nota_saida.data_de_emissao}
                        />
                      </td>
                      <td style={{ width: 400 }} className="align-middle">
                        {nota_saida.empresa_emitente}
                      </td>
                      <td className="text-center">
                        {nota_saida.status.toLowerCase() === "ok" ? (
                          <MDBBadge className="p-2" pill color="success">
                            OK
                          </MDBBadge>
                        ) : (
                          <MDBBadge className="p-2" pill color="danger">
                            Cancelado
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
export default NFsExit;
