import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBTabContent,
  MDBTabPane,
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

class AddNFInbound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empresa: null,
      activeItem: "1",
      alertMessage: "",
      alertMessage1: "",
      formErrors: {
        empresa: ""
      }
    };
  }

  AddNFInbound(newNFInbound) {
    axios
      .request({
        method: "POST",
        url: "API URL NFENTRADA",
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
    // this.AddNFInbound(newNFInbound);
    // console.log(newNFInbound);
    e.preventDefault();

    if (formValid(this.state)) {
      this.AddNFInbound(newNFInbound);
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

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

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
                <strong>NOVA NF-ENTRADA</strong>
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
                        />
                      </MDBCol> */}
                          <MDBCol md="2" className="form-group ">
                            <label className="grey-text" htmlFor="NFINumber">
                              Nº NF:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="number"
                              autoFocus
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group ">
                            <label className="grey-text" htmlFor="NFIType">
                              Tipo:{" "}
                            </label>
                            <div>
                              <select
                                className="browser-default custom-select"
                                type="text"
                                ref="type"
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
                        /> */}
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="NFIEmissor">
                              Empresa: <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <input
                              className={
                                formErrors.empresa.length > 0
                                  ? "form-control error1"
                                  : "form-control"
                              }
                              name="empresa"
                              type="text"
                              ref="company"
                              onChange={this.handleChange}
                            />
                            {formErrors.empresa.length === 0 && (
                              <span className="errorMessageForm">
                                {formErrors.empresa}
                              </span>
                            )}
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="NFICnpj">
                              CNPJ:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              ref="cnpj"
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
                            <label className="grey-text" htmlFor="NFIDt">
                              Data de Emissão:{" "}
                            </label>
                            <InputMask
                              className="form-control"
                              type="text"
                              ref="emissionDt"
                              mask="99/99/9999"
                            />
                          </MDBCol>
                          <MDBCol md="6" className="form-group">
                            <label className="grey-text" htmlFor="NFICollab">
                              Colaborador:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="collab"
                            />
                          </MDBCol>
                          <MDBCol md="4" className="form-group">
                            <label className="grey-text" htmlFor="NFIService">
                              Serviço:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="service"
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
                            <label className="grey-text" htmlFor="NFIAmount">
                              Valor Bruto:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="value"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label
                              htmlFor="NFIReceivedDt"
                              className="grey-text"
                            >
                              Data Recebimento:{" "}
                            </label>
                            <InputMask
                              type="text"
                              ref="receivingDt"
                              className="form-control"
                              mask="99/99/9999"
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label htmlFor="NFIPayingDt" className="grey-text">
                              Data Pagamento:{" "}
                            </label>
                            <InputMask
                              type="text"
                              ref="payDt"
                              className="form-control"
                              mask="99/99/9999"
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
                            />
                          </MDBCol>
                          <MDBCol md="3" className="form-group">
                            <label className="grey-text" htmlFor="NFINetValue">
                              Valor Líquido:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              ref="totalValue"
                            />
                          </MDBCol>
                        </MDBRow>
                        {/* <MDBRow className="mb-2">
                      <MDBCol md="2">
                        <MDBRow>
                          <MDBCol>
                            <label
                              htmlFor="NFIReceivedDt"
                              className="grey-text"
                            >
                              Data Recebimento:{" "}
                            </label>
                            <input
                              type="date"
                              ref="receivingDt"
                              className="form-control"
                            />
                          </MDBCol>
                        </MDBRow>
                        <br />
                        <MDBRow>
                          <MDBCol>
                            <label htmlFor="NFIPayingDt" className="grey-text">
                              Data Pagamento:{" "}
                            </label>
                            <input
                              type="date"
                              ref="payDt"
                              className="form-control"
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
                            rows="5"
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
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default AddNFInbound;
