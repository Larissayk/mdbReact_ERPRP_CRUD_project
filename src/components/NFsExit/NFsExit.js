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
import NFExitItem from "./NFExitItem";

class NFsExit extends Component {
  constructor() {
    super();
    this.state = {
      nfsExit: []
    };
  }

  componentDidMount() {
    this.getNFsExit();
  }

  getNFsExit() {
    // axios.get('http://rplearning-rperformance.tecnologia.ws/api/users')
    axios
      .get("http://localhost/api/Fornecedores/")
      .then(response => {
        this.setState({ nfsExit: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { nfsExit } = this.state;
    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4">
          <MDBCardBody className="pt-0">
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
                NF-Saída
              </MDBCardTitle>
            </MDBCardHeader>
            <MDBTable hover className="mb-2 mt-0">
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th>Ano</th>
                  <th>Tipo</th>
                  <th>Nº</th>
                  <th>Emissor</th>
                  <th>Data Emissão</th>
                  <th>Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {nfsExit.map((Fornecedores, i) => {
                  return (
                    <tr key={Fornecedores.ID}>
                      <td className="align-middle">{Fornecedores.ID}</td>
                      <td className="align-middle">
                        <NFExitItem key={Fornecedores.ID} item={Fornecedores} />
                      </td>
                      <td className="align-middle">{Fornecedores.CNPJ}</td>
                      <td className="align-middle">{Fornecedores.STATUS}</td>
                      <td className="align-middle">{Fornecedores.DT_INICIO}</td>
                      <td className="align-middle">{Fornecedores.CNPJ}</td>
                      <td className="align-middle">{Fornecedores.DT_INICIO}</td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>

        <MDBBtn
          size="lg"
          href="/NFsExit/add"
          className="px-3 py-3 btn deep-orange darken-3 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default NFsExit;
