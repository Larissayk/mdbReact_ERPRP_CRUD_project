import React, { Component } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle
} from "mdbreact";
import axios from "axios";
import ProviderItem from "./ProviderItem";

class Providers extends Component {
  constructor() {
    super();
    this.state = {
      providers: []
    };
  }

  componentDidMount() {
    this.getProviders();
  }

  getProviders() {
    // axios.get('http://rplearning-rperformance.tecnologia.ws/api/users')
    axios
      .get("http://localhost/api/Fornecedores/")
      .then(response => {
        this.setState({ providers: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { providers } = this.state;
    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4">
          <MDBCardBody className="pt-0">
            <MDBCardHeader
              className="card-header rounded"
              style={{ width: "15rem", height: "5rem" }}
            >
              <MDBCardTitle className="pl-4 mb-0">Fornecedores</MDBCardTitle>
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
                {providers.map((Fornecedores, i) => {
                  return (
                    <tr key={Fornecedores.ID}>
                      <td className="align-middle">{Fornecedores.ID}</td>
                      <td className="align-middle">
                        <ProviderItem
                          key={Fornecedores.ID}
                          item={Fornecedores}
                        />
                      </td>
                      <td className="align-middle">{Fornecedores.CNPJ}</td>
                      <td className="align-middle">{Fornecedores.STATUS}</td>
                      <td className="align-middle">{Fornecedores.DT_INICIO}</td>
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
export default Providers;
