import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle
} from "mdbreact";
import axios from "axios";
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";


class AddCollaboratorDeal extends Component {
  state = {
    activeItem: "1",
    alertMessage: ""
  };

  addCollabDeal(newCollabDeal) {
    axios
      .request({
        method: "POST",
        url: "http://127.0.0.1:8000/api/negociacoes/",
        data: newCollabDeal
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/CollabDeals"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  onSubmit(e) {
    const newCollabDeal = {
      nome: this.refs.nome1.value,
      cpf: this.refs.cpf1.value,
      status: this.refs.status1.value,
      data_inicio: this.refs.data_inicio1.value,
      data_fim: this.refs.data_fim1.value,
      tipo: this.refs.tipo1.value,
      seq_neg: this.refs.seq_neg1.value,
      data_neg: this.refs.data_neg1.value,
      funcao: this.refs.funcao1.value,
      vlr_hr_pj: this.refs.vlr_hr_pj1.value,
      fechado_aberto: this.refs.fechado_aberto1.value,
      vlr_clt: this.refs.vlr_clt1.value,
      cnpj_do_pj: this.refs.cnpj_do_pj1.value,
      cpf_aprovador: this.refs.cpf_aprovador1.value
    };
    this.addCollabDeal(newCollabDeal);
    console.log(newCollabDeal);
    e.preventDefault();
  }

  render() {
    return (
      <MDBContainer className="main-body">
        <div>
          {this.state.alertMessage == "success" ? <SuccessMessage /> : null}
          {this.state.alertMessage == "error" ? <ErrorMessage /> : null}
        </div>
        <MDBCard className="mt-3 mb-4">
          <MDBCardTitle style={{ fontSize: 28 }}>
            <strong>NOVOS DADOS DE NEGOCIAÇÃO</strong>
          </MDBCardTitle>
          <hr className="mb-0" />
          <MDBCardBody className="mt-0">
            <MDBContainer>
              <form onSubmit={this.onSubmit.bind(this)}>
                <MDBRow>
                  <MDBCol md="5" className="form-group">
                    <label className="grey-text" htmlFor="nome">
                      Nome:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Nome"
                      ref="nome1"
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
                      ref="status1"
                    />
                  </MDBCol>
                  <MDBCol md="1" className="form-group">
                    <label className="grey-text" htmlFor="seq_neg">
                      Seq.:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Seq_Negociacao"
                      ref="seq_neg1"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="data_neg">
                      Dt. Negociação:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Data_Negociacao"
                      ref="data_neg1"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="data_inicio">
                      Data de início:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Dt_Inicio"
                      ref="data_inicio1"
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="4" className="form-group">
                    <label className="grey-text" htmlFor="funcao">
                      Função:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Funcao"
                      ref="funcao1"
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
                      ref="cpf1"
                    />
                  </MDBCol>
                  <MDBCol md="3" className="form-group">
                    <label className="grey-text" htmlFor="cnpj_do_pj">
                      CNPJ:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Cnpj"
                      ref="cnpj_do_pj1"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="data_fim">
                      Data de término:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Dt_Fim"
                      ref="data_fim1"
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-2">
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="tipo">
                      Tipo:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Contrato"
                      ref="tipo1"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="vlr_hr_pj">
                      Valor/hora PJ:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Valor_HoraPj"
                      ref="vlr_hr_pj1"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="fechado_aberto">
                      Aberto/Fechado:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Tipo"
                      ref="fechado_aberto1"
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="vlr_clt">
                      Valor CLT:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="Valor_Clt"
                      ref="vlr_clt1"
                    />
                  </MDBCol>
                  <MDBCol md="4" className="form-group">
                    <label className="grey-text" htmlFor="cpf_aprovador">
                      CPF Aprovador:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="CpfAprovador"
                      ref="cpf_aprovador1"
                    />
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBBtn
                  type="submit"
                  value="Save"
                  className="light-blue darken-4 float-right"
                >
                  <MDBIcon far icon="save" /> Salvar
                </MDBBtn>
                <MDBBtn
                  href="/CollabDeals"
                  value="Return"
                  className="btn grey lighten-1 float-right"
                >
                  <MDBIcon icon="undo-alt" /> Voltar
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
