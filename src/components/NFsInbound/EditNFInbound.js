import React, { Component } from "react";
import {
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBTabContent,
  MDBTabPane,
  MDBCol,
  MDBRow,
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
  // Object.values(rest).forEach(val => {
  //   val === null && (valid = false);
  // });

  return valid;
};

class EditNFInbound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      cnpj: "",
      tpnf_nfs_nfts_nd: "",
      num_nf: "",
      data_emissao: "",
      data_receber: "",
      data_pagar: "",
      empresa: "",
      servico: "",
      colaborador: "",
      valor_nf: "",
      irrf: "",
      pis_cofins: "",
      iss_sp: "",
      valor_liquido: "",
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        empresa: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getNFInboundDetails();
  }

  getNFInboundDetails() {
    let NFInboundId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/nota_entrada/${NFInboundId}`)
      .then(response => {
        this.setState(
          {
            id: response.data.id,
            cnpj: response.data.cnpj,
            tpnf_nfs_nfts_nd: response.data.tpnf_nfs_nfts_nd,
            num_nf: response.data.num_nf,
            data_emissao: response.data.data_emissao,
            data_receber: response.data.data_receber,
            data_pagar: response.data.data_pagar,
            empresa: response.data.empresa,
            servico: response.data.servico,
            colaborador: response.data.colaborador,
            valor_nf: response.data.valor_nf,
            irrf: response.data.irrf,
            pis_cofins: response.data.pis_cofins,
            iss_sp: response.data.iss_sp,
            valor_liquido: response.data.valor_liquido
          },
          () => {
            console.log("Get:", this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editNFInbound(newNFInbound) {
    axios
      .request({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/nota_entrada/${this.state.id}`,
        data: newNFInbound
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/NFsInbound"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  onSubmit(e) {
    const newNFInbound = {
      cnpj: this.refs.cnpj.value,
      tpnf_nfs_nfts_nd: this.refs.type.value,
      num_nf: this.refs.number.value,
      data_emissao: this.refs.emissionDt.value,
      data_receber: this.refs.receivingDt.value,
      data_pagar: this.refs.payDt.value,
      empresa: this.refs.company.value,
      servico: this.refs.service.value,
      colaborador: this.refs.collab.value,
      valor_nf: this.refs.value.value,
      irrf: this.refs.irrf.value,
      pis_cofins: this.refs.pis_cofins.value,
      iss_sp: this.refs.iss_sp.value,
      valor_liquido: this.refs.totalValue.value
    };
    // this.editNFInbound(newNFInbound);
    e.preventDefault();
    // console.log(newNFInbound);

    if (formValid(this.state)) {
      this.editNFInbound(newNFInbound);
      console.log(`
        --SUBMITTING--
        Empresa: ${this.state.empresa}
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
      case "empresa":
        formErrors.empresa =
          value.length === 0 ? "Campo de preenchimento obrigatório." : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () =>
      console.log("handleChange:", this.state)
    );
  };

  // handleInputChange(e) {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
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
                <strong>EDITAR NF-ENTRADA</strong>
              </MDBCardTitle>
              <hr className="mb-0" />
              <MDBCardBody className="mt-0">
                <MDBContainer>
                  <MDBNav className="nav-tabs mx-0">
                    <MDBNavItem>
                      <MDBNavLink
                        to="#"
                        active={this.state.activeItem === "1"}
                        onClick={this.toggle("1")}
                        role="tab"
                      >
                        Dados Gerais
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        to="#"
                        active={this.state.activeItem === "2"}
                        onClick={this.toggle("2")}
                        role="tab"
                      >
                        Dados de Pagamento
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>

                  <MDBTabContent activeItem={this.state.activeItem}>
                    <MDBTabPane tabId="1" role="tabpanel">
                      <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <MDBRow className="mt-4">
                          {/* <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="NFIyear">
                          Ano:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          ref="NFIyear"
                          name="NOME_EMPRESA"
                          value={this.state.NOME_EMPRESA}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol> */}
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="number">
                              Nº NF:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="number"
                              name="num_nf"
                              value={this.state.num_nf}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group ">
                            <label
                              className="grey-text"
                              htmlFor="tpnf_nfs_nfts_nd"
                            >
                              Tipo:{" "}
                            </label>
                            <div>
                              <select
                                className="browser-default custom-select"
                                type="text"
                                ref="type"
                                name="tpnf_nfs_nfts_nd"
                                value={this.state.tpnf_nfs_nfts_nd}
                                onChange={this.handleChange}
                              >
                                <option>Selecione...</option>
                                <option value="ND">ND</option>
                                <option value="NFS">NFS</option>
                                <option value="NFTS">NFTS</option>
                              </select>
                            </div>
                            {/* <input
                          className="form-control"
                          type="text"
                          ref="type"
                          name="tpnf_nfs_nfts_nd"
                          value={this.state.tpnf_nfs_nfts_nd}
                          onChange={this.handleInputChange}
                        /> */}
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="empresa">
                              Empresa: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="company"
                              name="empresa"
                              value={this.state.empresa}
                              onChange={this.handleChange}
                            />
                            {formErrors.empresa.length === 0 && (
                              <span className="errorMessage">
                                {formErrors.empresa}
                              </span>
                            )}
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="cnpj">
                              CNPJ:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              ref="cnpj"
                              name="cnpj"
                              value={this.state.cnpj}
                              onChange={this.handleChange}
                              mask="99.999.999/9999-99"
                            />
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <h5 className="grey-text mb-3 ml-3">Identificação</h5>
                        </MDBRow>
                        <MDBRow className="mb-2">
                          <MDBCol md="2" className="form-group">
                            <label className="grey-text" htmlFor="data_emissao">
                              Data de Emissão:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="emissionDt"
                              name="data_emissao"
                              value={this.state.data_emissao}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="6" className="form-group">
                            <label className="grey-text" htmlFor="colaborador">
                              Colaborador:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="collab"
                              name="colaborador"
                              value={this.state.colaborador}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="servico">
                              Serviço:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="service"
                              name="servico"
                              value={this.state.servico}
                              onChange={this.handleChange}
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
                          href="/NFsInbound"
                          value="Return"
                          className="btn grey lighten-1 float-right"
                        >
                          Voltar
                        </MDBBtn>
                      </form>
                    </MDBTabPane>

                    <MDBTabPane tabId="2" role="tabpanel">
                      <form onSubmit={this.onSubmit.bind(this)}>
                        <MDBRow className="mt-4">
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="valor_nf">
                              Valor Bruto:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="value"
                              name="valor_nf"
                              value={this.state.valor_nf}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label htmlFor="data_receber" className="grey-text">
                              Data Recebimento:{" "}
                            </label>
                            <input
                              type="text"
                              ref="receivingDt"
                              name="data_receber"
                              className="form-control"
                              value={this.state.data_receber}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label htmlFor="data_pagar" className="grey-text">
                              Data Pagamento:{" "}
                            </label>
                            <input
                              type="text"
                              ref="payDt"
                              name="data_pagar"
                              className="form-control"
                              value={this.state.data_pagar}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="iss_sp">
                              ISS-SP:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="iss_sp"
                              name="iss_sp"
                              value={this.state.iss_sp}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="irrf">
                              IRRF (15%):{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="irrf"
                              name="irrf"
                              value={this.state.irrf}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="pis_cofins">
                              PIS/COFINS (4,65%):{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="pis_cofins"
                              name="pis_cofins"
                              value={this.state.pis_cofins}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label
                              className="grey-text"
                              htmlFor="valor_liquido"
                            >
                              Valor Líquido:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="totalValue"
                              name="valor_liquido"
                              value={this.state.valor_liquido}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                        </MDBRow>
                        {/* <MDBRow className="mb-2">
                      <MDBCol md="2"> */}
                        {/* <MDBRow>
                          <MDBCol>
                            <label htmlFor="data_receber" className="grey-text">
                              Data Recebimento:{" "}
                            </label>
                            <input
                              type="date"
                              ref="receivingDt"
                              name="data_receber"
                              className="form-control"
                              value={this.state.data_receber}
                              onChange={this.handleInputChange}
                            />
                          </MDBCol>
                        </MDBRow>
                        <br />
                        <MDBRow>
                          <MDBCol>
                            <label htmlFor="data_pagar" className="grey-text">
                              Data Pagamento:{" "}
                            </label>
                            <input
                              type="date"
                              ref="payDt"
                              name="data_pagar"
                              className="form-control"
                              value={this.state.data_pagar}
                              onChange={this.handleInputChange}
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCol> */}
                        {/* <MDBCol md="10">
                        <div className="form-group grey-text">
                          <label htmlFor="NFIComments">Comentários: </label>
                          <textarea
                            className="form-control"
                            ref="NFIComments"
                            name="TIPO"
                            rows="5"
                            value={this.state.TIPO}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </MDBCol> */}
                        {/* </MDBRow> */}
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
                          href="/NFsInbound"
                          value="Return"
                          className="btn grey lighten-1 float-right"
                        >
                          Voltar
                        </MDBBtn>
                      </form>
                    </MDBTabPane>
                  </MDBTabContent>
                </MDBContainer>
              </MDBCardBody>
            </MDBCard>
            <MDBBtn
              size="lg"
              href="/NFsInbound/add"
              className="px-3 py-3 btn light-blue darken-4 circle-btn"
            >
              <MDBIcon size="lg" className="text-white" icon="plus" />
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default EditNFInbound;
