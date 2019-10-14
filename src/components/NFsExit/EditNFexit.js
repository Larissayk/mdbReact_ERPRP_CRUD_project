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
  MDBCardTitle
} from "mdbreact";
import axios from "axios";
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";

class EditNFexit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      ano: "",
      tipo_nf: "",
      nota_fiscal: "",
      status: "",
      cnpj: "",
      empresa_emitente: "",
      identif_contrato: "",
      status_contrato: "",
      contrato: "",
      data_contrato: "",
      ordem_compra: "",
      parcela: "",
      data_de_emissao: "",
      data_prev_pagto: "",
      data_real_pagto: "",
      valor_bruto: "",
      irrf: "",
      pis_cofins: "",
      valor_liquido: "",
      obs: "",
      activeItem: "1",
      alertMessage: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getNFExitDetails();
  }

  getNFExitDetails() {
    let NFExitId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/nota_saida/${NFExitId}`)
      .then(response => {
        this.setState(
          {
            id: response.data.id,
            nome: response.data.nome,
            status: response.data.status,
            ano: response.data.ano,
            tipo_nf: response.data.tipo_nf,
            nota_fiscal: response.data.nota_fiscal,
            cnpj: response.data.cnpj,
            empresa_emitente: response.data.empresa_emitente,
            identif_contrato: response.data.identif_contrato,
            status_contrato: response.data.status_contrato,
            contrato: response.data.contrato,
            data_contrato: response.data.data_contrato,
            ordem_compra: response.data.ordem_compra,
            parcela: response.data.parcela,
            data_de_emissao: response.data.data_de_emissao,
            data_prev_pagto: response.data.data_prev_pagto,
            data_real_pagto: response.data.data_real_pagto,
            valor_bruto: response.data.valor_bruto,
            irrf: response.data.irrf,
            pis_cofins: response.data.pis_cofins,
            valor_liquido: response.data.valor_liquido,
            obs: response.data.obs
            
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editNFexit(newNFExit) {
    //console.log(newProvider);
    axios
      .request({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/nota_saida/${this.state.id}`,
        data: newNFExit
      })
      .then(response => {
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/NFsExit"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  onSubmit(e) {
    const newNFExit = {
      ano: this.refs.year.value,
      tipo_nf: this.refs.type.value,
      nota_fiscal: this.refs.number.value,
      cnpj: this.refs.cnpj.value,
      empresa_emitente: this.refs.emissor.value,
      identif_contrato: this.refs.contractId.value,
      status_contrato: this.refs.contract_status.value,
      contrato: this.refs.contract.value,
      data_contrato: this.refs.contractDate.value,
      ordem_compra: this.refs.order.value,
      parcela: this.refs.portion.value,
      data_de_emissao: this.refs.emissionDate.value,
      data_prev_pagto: this.refs.prevPg.value,
      data_real_pagto: this.refs.realPg.value,
      valor_bruto: this.refs.value.value,
      irrf: this.refs.irrf.value,
      pis_cofins: this.refs.pis_cofins.value,
      valor_liquido: this.refs.totalValue.value,
      obs: this.refs.obs.value
    };
    this.editNFexit(newNFExit);
    e.preventDefault();
    console.log(newNFExit);
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
            <strong>EDITAR NF-SAÍDA</strong>
          </MDBCardTitle>
          <hr className="mb-0" />
          <MDBCardBody className="pt-0">
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
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <MDBRow className="mt-4">
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="year">
                          Ano:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="year"
                          ref="year"
                          value={this.state.ano}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="type">
                          Tipo:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="type"
                          ref="type"
                          value={this.state.tipo_nf}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="1" className="form-group">
                        <label className="grey-text" htmlFor="number">
                          Nº NF:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="number"
                          ref="number"
                          value={this.state.nota_fiscal}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4" className="form-group">
                        <label className="grey-text" htmlFor="emissor">
                          Emissor:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="emissor"
                          ref="emissor"
                          value={this.state.empresa_emitente}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="cnpj">
                          CNPJ:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="cnpj"
                          ref="cnpj"
                          value={this.state.cnpj}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <h5 className="grey-text mb-3 ml-3">Contrato</h5>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="5" className="form-group">
                        <label className="grey-text" htmlFor="contractId">
                          Identificação:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="contractId"
                          ref="contractId"
                          value={this.state.identif_contrato}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="contract_status">
                          Status:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="contract_status"
                          ref="contract_status"
                          value={this.state.status_contrato}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="contract">
                          Nº Contrato:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="contract"
                          ref="contract"
                          value={this.state.contrato}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="contractDate">
                          Data:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="concontractDatetract"
                          ref="contractDate"
                          value={this.state.data_contrato}
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
                      href="/NFsExit"
                      value="Return"
                      className="btn grey lighten-1 float-right"
                    >
                      <MDBIcon icon="undo-alt" /> Voltar
                    </MDBBtn>
                  </form>
                </MDBTabPane>

                <MDBTabPane tabId="2" role="tabpanel">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <MDBRow className="mt-4">
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="emissionDate">
                          Data Emissão{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="emissionDate"
                          ref="emissionDate"
                          value={this.state.data_de_emissao}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="prevPg">
                          Data Prévia{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="prevPg"
                          ref="prevPg"
                          value={this.state.data_prev_pagto}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="form-group">
                        <label className="grey-text" htmlFor="realPg">
                          Data Real:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="realPg"
                          ref="realPg"
                          value={this.state.data_real_pagto}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="order">
                          Ordem de Compra:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="order"
                          ref="order"
                          value={this.state.ordem_compra}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="portion">
                          Parcela:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="portion"
                          ref="portion"
                          value={this.state.parcela}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="value">
                          Valor Bruto:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="value"
                          ref="value"
                          value={this.state.valor_bruto}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="irrf">
                          IRRF (15%):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="irrf"
                          ref="irrf"
                          value={this.state.irrf}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="pis_cofins">
                          PIS/COFINS (4,65%):{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="pis_cofins"
                          ref="pis_cofins"
                          value={this.state.pis_cofins}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="3" className="form-group">
                        <label className="grey-text" htmlFor="totalValue">
                          Valor Líquido:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="totalValue"
                          ref="totalValue"
                          value={this.state.valor_liquido}
                          onChange={this.handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12">
                        <div className="form-group grey-text">
                          <label className="grey-text" htmlFor="obs">
                            Comentários:{" "}
                          </label>
                          <textarea
                            className="form-control"
                            type="text"
                            name="obs"
                            ref="obs"
                            rows="5"
                            value={this.state.obs}
                            onChange={this.handleInputChange}
                          />
                        </div>
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
                      href="/NFsExit"
                      value="Return"
                      className="btn grey lighten-1 float-right"
                    >
                      <MDBIcon icon="undo-alt" /> Voltar
                    </MDBBtn>
                  </form>
                </MDBTabPane>
              </MDBTabContent>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
        <MDBBtn
          size="lg"
          href="/NFsExit/add"
          className="px-3 py-3 btn light-blue darken-4 circle-btn"
        >
          <MDBIcon size="lg" className="text-white" icon="plus" />
        </MDBBtn>
      </MDBContainer>
    );
  }
}
export default EditNFexit;
