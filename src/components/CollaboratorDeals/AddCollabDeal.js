import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle
} from "mdbreact";
import axios from "axios";
import { Link } from "react-router-dom";

class AddCollaboratorDeal extends Component {
  state = {
    activeItem: "1"
  };

  addCollabDeal(newCollabDeal) {
    axios
      .request({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/users",
        data: newCollabDeal
      })
      .then(response => {
        this.props.history.push("/CollabDeals");
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    const newCollabDeal = {
      Nome: this.refs.name.value,
      Seq_Negociacao: this.refs.negotiation.value,
      Status: this.refs.status.value,
      Dt_Inicio: this.refs.startDate.value,
      Dt_Fim: this.refs.endDate.value,
      Funcao: this.refs.role.value,
      Cpf: this.refs.cpf.value,
      Cnpj: this.refs.cnpj.value,
      Contrato: this.refs.contract.value,
      Tipo: this.refs.contractType.value,
      Valor_HoraPj: this.refs.pjValue.value,
      Valor_Clt: this.refs.cltValue.value,
      Cpf_Aprovador: this.approvCpf.phone.value
    };
    this.addCollabDeal(newCollabDeal);
    console.log(newCollabDeal);
    e.preventDefault();
  }

  render() {
    return (
      <MDBContainer className="main-body">
        <MDBCard className="mt-3 mb-4">
          <MDBCardBody className="pt-0">
            <Link className="float-right mr-2 mt-2" to="/CollabDeals">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader className="card-header rounded">
              <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
                Adicionar Dados da Negociação
              </MDBCardTitle>
            </MDBCardHeader>

            <MDBContainer>
              <form onSubmit={this.onSubmit.bind(this)}>
                <MDBRow>
                  <MDBCol md="6" className="form-group">
                    <label className="grey-text" htmlFor="name">
                      Nome:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Nome"
                      ref="name"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="status">
                      Status:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Status"
                      ref="status"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="negotiation">
                      Seq. Negociação:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Seq_Negociacao"
                      ref="negotiation"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="startDate">
                      Data de início:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Dt_Inicio"
                      ref="startDate"
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="4" className="form-group">
                    <label className="grey-text" htmlFor="role">
                      Função:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Funcao"
                      ref="role"
                    />
                  </MDBCol>
                  <MDBCol md="3" className="form-group">
                    <label className="grey-text" htmlFor="cpf">
                      CPF:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Cpf"
                      ref="cpf"
                    />
                  </MDBCol>
                  <MDBCol md="3" className="form-group">
                    <label className="grey-text" htmlFor="cnpj">
                      CNPJ:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Cnpj"
                      ref="cnpj"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="endDate">
                      Data de término:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Dt_Fim"
                      ref="endDate"
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-2">
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="contract">
                      Contrato:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Contrato"
                      ref="contract"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="contractType">
                      Tipo:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Tipo"
                      ref="contractType"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="pjValue">
                      Valor/hora PJ:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Valor_HoraPj"
                      ref="pjValue"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="cltValue">
                      Valor CLT:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Valor_Clt"
                      ref="cltValue"
                    />
                  </MDBCol>
                  <MDBCol md="4" className="form-group">
                    <label className="grey-text" htmlFor="approvCpf">
                      CPF Aprovador:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="CpfAprovador"
                      ref="approvCpf"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBBtn
                  type="submit"
                  value="Save"
                  className="deep-orange darken-3 float-right"
                >
                  <MDBIcon far icon="save" /> Salvar
                </MDBBtn>
              </form>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
export default AddCollaboratorDeal;
