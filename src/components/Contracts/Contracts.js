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
  MDBRow
} from "mdbreact";
import axios from "axios";
import ContractItem from "./ContractItem";
import Moment from "react-moment";

class Contracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contratos: [],
      search: "",
      sort: ""
    };
  }

  componentDidMount() {
    this.getContracts();
  }

  getContracts() {
    axios
      .get("API URL CONTRATOS")
      .then(response => {
        this.setState({ contratos: response.data }, () => {
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
    let filteredData = this.state.contratos.filter(contratos => {
      if (this.state.sort === "") {
        return (
          contratos.cod_contrato_rp
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1 ||
          contratos.cod_contrato.indexOf(this.state.search) !== -1
        );
      } else {
        return (
          contratos.cod_contrato_rp
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1 &&
          contratos.tipo_contrato
            .toLowerCase()
            .indexOf(this.state.sort.toLowerCase()) !== -1
        );
      }
    });

    return (
      <MDBRow>
        <MDBCol md="12">
          <MDBCard className="mt-3 mb-4 px-2 card">
            <MDBCardTitle style={{ fontSize: 28 }}>
              <strong>CONTRATOS</strong>
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
                      placeholder="Busque pelo código"
                      aria-label="Search"
                      // value={this.state.search}
                      // onChange={this.updateSearch.bind(this)}
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
                      <option value="">Tipo</option>
                      <option value="cliente">Cliente</option>
                      <option value="fornecedor">Fornecedor</option>
                    </select>
                  </div>
                </MDBCol>

                <MDBCol md="4" className="p-0 m-0 ">
                  <MDBBtn
                    color="#FFF"
                    className="pt-3 px-3 my-3 float-right btn-color-table"
                    href="/Contracts/add"
                  >
                    <MDBIcon icon="plus" /> Novo Registro
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              <MDBTable hover small striped className="mb-2 mt-0">
                <MDBTableHead>
                  <tr>
                    <th>CÓD. RP</th>
                    <th>TIPO</th>
                    <th>CONTRATANTE</th>
                    <th>CONTRADA</th>
                    <th>DATA INÍCIO</th>
                    <th>VIGÊNCIA</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {filteredData.map(contratos => {
                    return (
                      <tr key={contratos.id}>
                        <td className="align-middle">
                          <ContractItem key={contratos.id} item={contratos} />
                        </td>
                        <td className="align-middle">
                          {contratos.tipo_contrato}
                        </td>
                        <td className="align-middle">
                          {contratos.nome_contratante}
                        </td>
                        <td className="text-center">
                          {contratos.nome_contratada}
                        </td>
                        <td className="align-middle">
                          <Moment
                            format="DD/MM/YYYY"
                            date={contratos.data_inicio_contrato}
                          />
                        </td>
                        <td className="text-center">
                          {contratos.prazo_vigencia_contrato}
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
export default Contracts;
