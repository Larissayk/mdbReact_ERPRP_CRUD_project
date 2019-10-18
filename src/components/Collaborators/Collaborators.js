import React, { Component} from "react";
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
import CollaboratorItem from "./CollaboratorItem";


class Collaborators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colaboradores: [],
      search: "",
      sort: ""

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

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 30) });
    console.log(`searchName: ${event.target.value}`);
  }

  handleSort(event) {
    this.setState({ sort: event.target.value, search: "" });
    console.log(`sortBy: ${event.target.value}`);
  }

  render() {
    let filteredData = this.state.colaboradores.filter(colaboradores => {
      if (this.state.sort === "") {
        return (
          colaboradores.nome
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1 ||
          colaboradores.cpf.indexOf(this.state.search) !== -1
        );
      } else {
        return (
          colaboradores.nome
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1 &&
          colaboradores.status
            .toLowerCase()
            .indexOf(this.state.sort.toLowerCase()) !== -1
          //  colaboradores.cpf.indexOf(this.state.search) !== -1
        );
      }
    });

    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4 px-2 card">
          <MDBCardTitle style={{ fontSize: 28 }}>
            <strong>COLABORADORES</strong>
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
                  href="/Collaborators/add"
                >
                  <MDBIcon icon="plus" /> Novo Registro
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBTable hover className="mb-2 mt-0">
              <MDBTableHead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Celular</th>
                  <th>Email pessoal</th>
                  <th className="text-center">Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredData.map(colaboradores => {
                  return (
                    <tr key={colaboradores.id}>
                      <td className="align-middle">
                        <CollaboratorItem
                          key={colaboradores.id}
                          item={colaboradores}
                        />
                      </td>
                      <td className="align-middle">{colaboradores.cpf}</td>
                      <td className="align-middle">{colaboradores.celular}</td>
                      <td className="align-middle">
                        {colaboradores.email_pessoal}
                      </td>
                      <td className="text-center">
                        {colaboradores.status.toLowerCase() === "ativo" ? (
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
export default Collaborators;
