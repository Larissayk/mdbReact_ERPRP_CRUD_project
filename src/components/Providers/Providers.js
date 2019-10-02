import React, { Component } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import axios from "axios";
import ProviderItem from "./ProviderItem";

class Providers extends Component {
  constructor() {
    super();
    this.state = {
      fornecedores: []
    };
  }

  componentDidMount() {
    this.getProviders();
  }

  getProviders() {
    axios
      .get("http://127.0.0.1:8000/api/fornecedores/")
      .then(response => {
        this.setState({ fornecedores: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { fornecedores } = this.state;
    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4 px-2 card">
          <MDBCardBody className="pt-0 ">
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
                Fornecedores
              </MDBCardTitle>
            </MDBCardHeader>
            <MDBTable hover className="mb-2 mt-0">
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>CNPJ</th>
                  <th>Status</th>
                  <th>Data início</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {fornecedores.map((fornecedores, i) => {
                  return (
                    <tr key={fornecedores.id}>
                      <td className="align-middle">{fornecedores.id}</td>
                      <td className="align-middle">
                        <ProviderItem
                          key={fornecedores.id}
                          item={fornecedores}
                        />
                      </td>
                      <td className="align-middle">{fornecedores.cnpj}</td>
                      <td className="align-middle">{fornecedores.status}</td>
                      <td className="align-middle">{fornecedores.data_inicio}</td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>

        <MDBBtn
          size="lg"
          href="/Providers/add"
          className="px-3 py-3 btn deep-orange darken-3 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default Providers;
