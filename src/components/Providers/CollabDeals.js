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

class CollaboratorDeals extends Component {
  constructor() {
    super();
    this.state = {
      collaboratorsDeal: []
    };
  }

  componentDidMount() {CollaboratorsDeal
    this.get();
  }

  getCollaboratorsDeal() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        this.setState({ collaboratorsDeal: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { collaboratorsDeal } = this.state;
    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4">
          <MDBCardBody className="pt-0">
            <MDBCardHeader
              className="card-header rounded"
              style={{ width: "15rem", height: "5rem" }}
            >
              <MDBCardTitle className="pl-4 mb-0">
                Dados de Negociação dos Colaboradores
              </MDBCardTitle>
            </MDBCardHeader>
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
                {collaboratorsDeal.map((user, i) => {
                  return (
                    <tr key={user.id}>
                      <td className="align-middle">{user.id}</td>
                      <td className="align-middle">
                        <ProviderItem
                          key={user.id}
                          item={user}
                          
                        />
                      </td>
                      <td className="align-middle">{user.username}</td>
                      <td className="align-middle">{user.email}</td>
                      <td className="align-middle">{user.website}</td>
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
