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
import CollaboratorItem from "./CollaboratorItem";

class Collaborators extends Component {
  constructor() {
    super();
    this.state = {
      collaborators: []
    };
  }

  componentDidMount() {
    this.getCollaborators();
  }

  getCollaborators() {
    // axios.get('http://rplearning-rperformance.tecnologia.ws/api/users')
    axios
      .get("http://localhost/api/Fornecedores/")
      .then(response => {
        this.setState({ collaborators: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { collaborators } = this.state;
    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4">
          <MDBCardBody className="pt-0">
            <MDBCardHeader
              className="card-header rounded"
              style={{ width: "15rem", height: "5rem" }}
            >
              <MDBCardTitle className="pl-4 mb-0">Colaboradores</MDBCardTitle>
            </MDBCardHeader>
            <MDBTable hover className="mb-2 mt-0">
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Função</th>
                  <th>Email</th>
                  <th>Contrato</th>
                  <th>Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {collaborators.map((Fornecedores, i) => {
                  return (
                    <tr key={Fornecedores.ID}>
                      <td className="align-middle">{Fornecedores.ID}</td>
                      <td className="align-middle">
                        <CollaboratorItem
                          key={Fornecedores.ID}
                          item={Fornecedores}
                        />
                      </td>
                      <td className="align-middle">{Fornecedores.CNPJ}</td>
                      <td className="align-middle">{Fornecedores.STATUS}</td>
                      <td className="align-middle">{Fornecedores.DT_INICIO}</td>
                      <td className="align-middle">{Fornecedores.CIDADE}</td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>

        <MDBBtn
          size="lg"
          href="/Collaborators/add"
          className="px-3 py-3 btn deep-orange darken-3 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default Collaborators;
