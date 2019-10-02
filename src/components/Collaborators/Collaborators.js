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
      colaboradores: []
    };
  }

  componentDidMount() {
    this.getCollaborators();
  }

  getCollaborators() {
    axios
      .get("http://127.0.0.1:8000/api/colaboradores")
      .then(response => {
        this.setState({ colaboradores: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { colaboradores } = this.state;
    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4">
          <MDBCardBody className="pt-0">
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
                Colaboradores
              </MDBCardTitle>
            </MDBCardHeader>
            <MDBTable hover className="mb-2 mt-0">
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {colaboradores.map((colaboradores, i) => {
                  return (
                    <tr key={colaboradores.id}>
                      <td className="align-middle">{colaboradores.id}</td>
                      <td className="align-middle">
                        <CollaboratorItem
                          key={colaboradores.id}
                          item={colaboradores}
                        />
                      </td>
                      <td className="align-middle">{colaboradores.cpf}</td>
                      <td className="align-middle">
                        {colaboradores.email}
                      </td>
                      <td className="align-middle">{colaboradores.status}</td>
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
