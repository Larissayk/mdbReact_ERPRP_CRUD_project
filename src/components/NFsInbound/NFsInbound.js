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
import NFInboundItem from "./NFInboundItem";
import Moment from "react-moment";

class NFsInbound extends Component {
  constructor() {
    super();
    this.state = {
      nfsInbound: [],
      search: ""
    };
  }

  componentDidMount() {
    this.getNFsExit();
  }

  getNFsExit() {
    axios
      .get("http://127.0.0.1:8000/api/nota_entrada")
      .then(response => {
        this.setState({ nfsInbound: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 30) });
    console.log(`searchName: ${this.state}`);
  }

  render() {
    let filteredData = this.state.nfsInbound.filter(nota_entrada => {
      return (
        nota_entrada.empresa
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
        // nota_entrada.cpf.indexOf(this.state.search) !== -1
        // colaboradores.status
        //   .toLowerCase()
        //   .indexOf(this.state.status.toLowerCase()) !== -1
      );
    });
    return (
      <MDBContainer>
        <MDBCard className="mt-3 mb-4 px-2 card">
          <MDBCardTitle style={{ fontSize: 28 }}>
            <strong>NF-ENTRADA</strong>
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
                    placeholder="Busque pela empresa"
                    aria-label="Search"
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                  />
                </div>
              </MDBCol>
              <MDBCol md="8" className="p-0 m-0">
                <MDBBtn
                  color="#FFF"
                  className="pt-3 px-3 my-3 float-right btn-color-table"
                  href="/NFsInbound/add"
                >
                  <MDBIcon icon="plus" /> Novo Registro
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBTable hover small striped className="mb-2 mt-0">
              <MDBTableHead>
                <tr>
                  <th>Nº</th>
                  <th>TIPO</th>
                  <th>DATA EMISSÃO</th>
                  <th>EMPRESA</th>
                  <th>SERVIÇO</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredData.map(nota_entrada => {
                  return (
                    <tr key={nota_entrada.id}>
                      <td style={{ width: 100 }} className="align-middle">
                        {nota_entrada.num_nf}
                      </td>
                      <td className="align-middle">
                        {nota_entrada.tpnf_nfs_nfts_nd}
                      </td>
                      <td style={{ width: 150 }} className="align-middle">
                        <Moment
                          format="DD/MM/YYYY"
                          date={nota_entrada.data_emissao}
                        />
                      </td>
                      <td style={{ width: 400 }} className="align-middle">
                        <NFInboundItem
                          key={nota_entrada.id}
                          item={nota_entrada}
                        />
                      </td>
                      <td className="align-middle">{nota_entrada.servico}</td>
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
export default NFsInbound;
