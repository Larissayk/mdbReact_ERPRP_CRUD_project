import React, { Component } from "react";
import {
  MDBCol,
  MDBRow,
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


class EditCollaboratorDeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nome: "",
      cpf: "",
      status: "",
      data_inicio: "",
      data_fim: "",
      tipo: "",
      seq_neg: "",
      data_neg: "",
      funcao: "",
      vlr_hr_pj: "",
      fechado_aberto: "",
      vlr_clt: "",
      cnpj_do_pj: "",
      cpf_aprovador: "",
      activeItem: "1",
      alertMessage: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getCollaboratorsDeal();
  }

  getCollaboratorsDeal() {
    let collabDealId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/negociacoes/${collabDealId}`)
      .then(response => {
        this.setState(
          {
            id: response.data.id,
            nome: response.data.nome,
            cpf: response.data.cpf,
            status: response.data.status,
            data_inicio: response.data.data_inicio,
            data_fim: response.data.data_fim,
            tipo: response.data.tipo,
            seq_neg: response.data.seq_neg,
            data_neg: response.data.data_neg,
            funcao: response.data.funcao,
            vlr_hr_pj: response.data.vlr_hr_pj,
            fechado_aberto: response.data.fechado_aberto,
            vlr_clt: response.data.vlr_clt,
            cnpj_do_pj: response.data.cnpj_do_pj,
            cpf_aprovador: response.data.cpf_aprovador
          },

          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editCollabDeal(newCollabDeal) {
    axios
      .request({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/negociacoes/${this.state.id}`,
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
    this.editCollabDeal(newCollabDeal);
    e.preventDefault();
    console.log(newCollabDeal);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    return (
      <MDBContainer className="main-body">
        <div>
          {this.state.alertMessage == "success" ? <SuccessMessage /> : null}
          {this.state.alertMessage == "error" ? <ErrorMessage /> : null}
        </div>
        <MDBCard className="mt-3 mb-4">
          <MDBCardTitle className="mb-0" style={{ fontSize: 28 }}>
            EDITAR DADOS DE NEGOCIAÇÃO
          </MDBCardTitle>
          <hr className="mb-0" />
          <MDBCardBody className="pt-0">
            <MDBContainer>
              <form onSubmit={this.onSubmit.bind(this)}>
                <MDBRow>
                  <MDBCol md="4" className="form-group">
                    <label className="grey-text" htmlFor="nome">
                      Nome:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="nome"
                      ref="nome1"
                      value={this.state.nome}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="status">
                      Status:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="status"
                      ref="status1"
                      value={this.state.status}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="seq_neg">
                      Seq. Negociação:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="seq_neg"
                      ref="seq_neg1"
                      value={this.state.seq_neg}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="data_neg">
                      Dt. Negociação:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="data_neg"
                      ref="data_neg1"
                      value={this.state.data_neg}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="data_inicio">
                      Data de início:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="data_inicio"
                      ref="data_inicio1"
                      value={this.state.data_inicio}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="4" className="form-group">
                    <label className="grey-text" htmlFor="funcao">
                      Função:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="funcao"
                      ref="funcao1"
                      value={this.state.funcao}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="3" className="form-group">
                    <label className="grey-text" htmlFor="cpf">
                      CPF:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="cpf"
                      ref="cpf1"
                      value={this.state.cpf}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="3" className="form-group">
                    <label className="grey-text" htmlFor="cnpj_do_pj">
                      CNPJ:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="cnpj_do_pj"
                      ref="cnpj_do_pj1"
                      value={this.state.cnpj_do_pj}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="data_fim">
                      Data de término:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="data_fim"
                      ref="data_fim1"
                      value={this.state.data_fim}
                      onChange={this.handleInputChange}
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
                      className="form-control "
                      type="text"
                      name="tipo"
                      ref="tipo1"
                      value={this.state.tipo}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="vlr_hr_pj">
                      Valor/hora PJ:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="vlr_hr_pj"
                      ref="vlr_hr_pj1"
                      value={this.state.vlr_hr_pj}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="fechado_aberto">
                      Aberto/Fechado:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="fechado_aberto"
                      ref="fechado_aberto1"
                      value={this.state.fechado_aberto}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="vlr_clt">
                      Valor CLT:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="vlr_clt"
                      ref="vlr_clt1"
                      value={this.state.vlr_clt}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="4" className="form-group">
                    <label className="grey-text" htmlFor="cpf_aprovador">
                      CPF Aprovador:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="cpf_aprovador"
                      ref="cpf_aprovador1"
                      value={this.state.cpf_aprovador}
                      onChange={this.handleInputChange}
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
        <MDBBtn
          size="lg"
          href="/CollabDeals/add"
          className="px-3 py-3 btn light-blue darken-4 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default EditCollaboratorDeal;
