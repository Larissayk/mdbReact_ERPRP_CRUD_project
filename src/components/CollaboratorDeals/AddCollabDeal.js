import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBAlert
} from "mdbreact";
import axios from "axios";
import InputMask from "react-input-mask";
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class AddCollaboratorDeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: null,
      funcao: null,
      tipo_cont: null,
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        nome: "",
        funcao: "",
        tipo_cont: ""
      }
    };
  }

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
    // this.addCollabDeal(newCollabDeal);
    // console.log(newCollabDeal);
    e.preventDefault();

    if (formValid(this.state)) {
      this.addCollabDeal(newCollabDeal);
      console.log(`
        --SUBMITTING--
        Nome: ${this.state.nome}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      this.setState({ alertMessage1: "error1" }, () => {
        console.log("alerta:", this.state.alertMessage1);
      });
      setTimeout(() => this.setState({ alertMessage1: "" }), 2000);
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "nome":
        formErrors.nome = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "funcao":
        formErrors.funcao = value.length < 1 ? "Campo obrigatório." : "";
        break;
      case "tipo_cont":
        formErrors.tipo_cont = value.length < 1 ? "Campo obrigatório." : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <div>
              {this.state.alertMessage === "success" ? (
                <SuccessMessage />
              ) : null}
              {this.state.alertMessage === "error" ? <ErrorMessage /> : null}
            </div>
            <MDBCard className="mt-3 mb-4">
              <MDBCardTitle style={{ fontSize: 28 }}>
                <strong>NOVOS DADOS DE NEGOCIAÇÃO</strong>
              </MDBCardTitle>
              <hr className="mb-0" />
              <MDBCardBody className="mt-0">
                <MDBContainer>
                  <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <MDBRow>
                      <MDBCol md="5" className="form-group mb-0">
                        <label className="grey-text" htmlFor="nome">
                          Nome: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="nome"
                          ref="nome1"
                          autoFocus
                          onChange={this.handleChange}
                        />
                        {formErrors.nome.length === 0 && (
                          <span className="errorMessage">
                            {formErrors.nome}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="2.5" className="form-group mx-2">
                        <label className="grey-text" htmlFor="status">
                          Status: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <div>
                          <select
                            className="browser-default custom-select"
                            ref="status1"
                          >
                            <option value="Ativo">Ativo</option>
                            <option value="Interrompido">Interrompido</option>
                          </select>
                        </div>
                        {/* <input
                      className="form-control"
                      type="text"
                      name="Status"
                      ref="status1"
                    /> */}
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
                        <InputMask
                          className="form-control"
                          type="text"
                          name="Data_Negociacao"
                          ref="data_neg1"
                          mask="99/99/9999"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="data_inicio">
                          Data de início:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          name="Dt_Inicio"
                          ref="data_inicio1"
                          mask="99/99/9999"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="funcao">
                          Função: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          className={
                            formErrors.funcao.length > 0
                              ? "form-control error1"
                              : "form-control"
                          }
                          type="text"
                          name="funcao"
                          ref="funcao1"
                          onChange={this.handleChange}
                        />
                        {formErrors.funcao.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.funcao}
                          </span>
                        )}
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cpf">
                          CPF:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          name="Cpf"
                          ref="cpf1"
                          mask="999.999.999-99"
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cnpj_do_pj">
                          CNPJ:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          name="Cnpj"
                          ref="cnpj_do_pj1"
                          mask="99.999.999/9999-99"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="data_fim">
                          Data de término:{" "}
                        </label>
                        <InputMask
                          className="form-control"
                          type="text"
                          name="Dt_Fim"
                          ref="data_fim1"
                          mask="99/99/9999"
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow className="mb-2">
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="tipo">
                          Tipo: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <div>
                          <select
                            className={
                              formErrors.tipo_cont.length > 0
                                ? "browser-default custom-select error1"
                                : "browser-default custom-select"
                            }
                            type="text"
                            name="tipo_cont"
                            ref="tipo1"
                            onChange={this.handleChange}
                          >
                            <option value="">Selecione...</option>
                            <option value="PJ">PJ</option>
                            <option value="CLT">CLT</option>
                            <option value="CLT-FLEX">CLT-FLEX</option>
                          </select>
                        </div>
                        {formErrors.tipo_cont.length > 0 && (
                          <span className="errorMessageForm">
                            {formErrors.tipo_cont}
                          </span>
                        )}
                        {/* <input
                      className="form-control"
                      type="text"
                      name="Contrato"
                      ref="tipo1"
                    /> */}
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
                        <div>
                          <select
                            className="browser-default custom-select"
                            type="text"
                            name="Tipo"
                            ref="fechado_aberto1"
                          >
                            <option>Selecione...</option>
                            <option value="Aberto">Aberto</option>
                            <option value="Fechado">Fechado</option>
                          </select>
                        </div>
                        {/* <input
                      className="form-control"
                      type="text"
                      name="Tipo"
                      ref="fechado_aberto1"
                    /> */}
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
                        <InputMask
                          className="form-control"
                          type="text"
                          name="CpfAprovador"
                          ref="cpf_aprovador1"
                          mask="999.999.999-99"
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <div>
                      {this.state.alertMessage1 === "error1" ? (
                        <MDBAlert color="danger">
                          Certifique-se de que os campos foram preenchidos
                          corretamente.
                        </MDBAlert>
                      ) : null}
                    </div>

                    <MDBBtn
                      type="submit"
                      value="Save"
                      className="cyan lighten-2 float-right"
                    >
                      <MDBIcon far icon="save" /> Salvar
                    </MDBBtn>
                    <MDBBtn
                      href="/CollabDeals"
                      value="Return"
                      className="btn grey lighten-1 float-right"
                    >
                      Voltar
                    </MDBBtn>
                  </form>
                </MDBContainer>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default AddCollaboratorDeal;
