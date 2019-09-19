import React, { Component } from "react";
import {
  MDBCol,
  MDBRow,
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

class EditCollaboratorDeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      Nome: "",
      Seq_Negociacao: "",
      Status: "",
      Dt_Inicio: "",
      Dt_Fim: "",
      Funcao: "",
      Cpf: "",
      Cnpj: "",
      Contrato: "",
      Tipo: "",
      Valor_HoraPj: "",
      Valor_Clt: "",
      Cpf_Aprovador: "",
      activeItem: "1"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getCollaboratorsDeal();
  }

  getCollaboratorsDeal() {
    let collabDealId = this.props.match.params.id;
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${collabDealId}`)
      .then(response => {
        this.setState(
          {
            Id: response.data.id,
            Nome: response.data.name,
            Seq_Negociacao: response.data.address.suite,
            Status: response.data.website,
            Dt_Inicio: response.data.address.geo.lat,
            Dt_Fim: response.data.address.geo.lng,
            Funcao: response.data.username,
            Cpf: response.data.address.city,
            Cnpj: response.data.address.suite,
            Contrato: response.data.email,
            Tipo: response.data.address.street,
            Valor_HoraPj: response.data.username,
            Valor_Clt: response.data.username,
            Cpf_Aprovador: response.data.phone
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editCollabDeal(newCollabDeal) {
    //console.log(newProvider);
    axios
      .request({
        method: "PUT",
        url: `https://jsonplaceholder.typicode.com/users/${this.state.id}`,
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
        <MDBCard className="mt-3 mb-4">
          <MDBCardBody>
            <Link className="float-right mr-2 mt-2" to="/Providers">
              <MDBIcon icon="undo-alt" /> Voltar
            </Link>
            <MDBCardHeader
              className="card-header rounded"
              style={{ width: "17rem", height: "5rem" }}
            >
              <MDBCardTitle className="pl-4 mb-0">
                Editar Dados da Negociação
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
                      name="name"
                      ref="name"
                      value={this.state.name}
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
                      ref="status"
                      value={this.state.status}
                      onChange={this.handleInputChange}
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
                      //   value={this.state.status}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="startDate">
                      Data de início:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      //   name="DT_INICIO"
                      ref="startDate"
                      //   value={this.state.DT_INICIO}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="4" className="form-group">
                    <label className="grey-text" htmlFor="role">
                      Função:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      //   name="CNPJ"
                      ref="role"
                      //   value={this.state.CNPJ}
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
                      //   name="TEL_COM"
                      ref="cpf"
                      //   value={this.state.TEL_COM}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="3" className="form-group">
                    <label className="grey-text" htmlFor="cnpj">
                      CNPJ:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      //   name="CEL_COM"
                      ref="cnpj"
                      //   value={this.state.CEL_COM}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="endDate">
                      Data de término:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      name="DT_FIM"
                      ref="endDate"
                      value={this.state.DT_FIM}
                      onChange={this.handleInputChange}
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
                      className="form-control "
                      type="text"
                      //   name="END_EMPRESA"
                      ref="contract"
                      //   value={this.state.END_EMPRESA}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="contractType">
                      Tipo:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      //   name="BAIRRO"
                      ref="contractType"
                      //   value={this.state.BAIRRO}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="pjValue">
                      Valor/hora PJ:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      //   name="MUNICIPIO"
                      ref="pjValue"
                      //   value={this.state.MUNICIPIO}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="form-group">
                    <label className="grey-text" htmlFor="cltValue">
                      Valor CLT:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      //   name="CIDADE"
                      ref="cltValue"
                      //   value={this.state.CIDADE}
                      onChange={this.handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="4" className="form-group">
                    <label className="grey-text" htmlFor="approvCpf">
                      CPF Aprovador:{" "}
                    </label>
                    <input
                      className="form-control "
                      type="text"
                      //   name="ESTADO"
                      ref="approvCpf"
                      //   value={this.state.ESTADO}
                      onChange={this.handleInputChange}
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
        <MDBBtn
          size="lg"
          href="/Providers/add"
          className="px-3 py-3 btn deep-orange darken-3 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default EditCollaboratorDeal;
