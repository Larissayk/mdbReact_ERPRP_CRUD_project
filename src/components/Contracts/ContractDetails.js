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
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import axios from "axios";
import Moment from "react-moment";
import MomentInput from "react-moment-input";
import ErrorMessage from "../AlertModals/ErrorMessage";
import SuccessMessage from "../AlertModals/SuccessMessage";

class ContractDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      activeItem: "1",
      modal1: false,
      alertMessage: ""
    };
  }

  componentDidMount() {
    this.getContract();
  }

  getContract() {
    let contractId = this.props.match.params.id;
    axios
      .get(`API URL CONTRATOS/${contractId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let contractId = this.state.details.id;
    axios
      .delete(`API URL CONTRATOS/${contractId}`)
      .then(response => {
        console.log(`ID excluído: ${contractId}`);
        this.setState({ alertMessage: "success" });
        setTimeout(() => this.props.history.push("/Contracts"), 1800);
      })
      .catch(err => {
        this.setState({ alertMessage: "error" });
        console.log(err);
      });
  }

  // Toggle Confirmation Delete Register Modal
  toggleDeleteContractModal = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
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
                <strong className="text-uppercase">
                  Cód. RP: {this.state.details.cod_contrato_rp}
                </strong>
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
                        Dados Contratante
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        to="#"
                        active={this.state.activeItem === "3"}
                        onClick={this.toggle("3")}
                        role="tab"
                      >
                        Dados Contratada
                      </MDBNavLink>
                    </MDBNavItem>
                    {/* <MDBNavItem>
                  <MDBNavLink
                    to="#"
                    active={this.state.activeItem === "4"}
                    onClick={this.toggle("4")}
                    role="tab"
                  >
                    Anexos
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to="#"
                    active={this.state.activeItem === "5"}
                    onClick={this.toggle("5")}
                    role="tab"
                  >
                    Aditivos
                  </MDBNavLink>
                </MDBNavItem> */}
                  </MDBNav>

                  <MDBTabContent activeItem={this.state.activeItem}>
                    <MDBTabPane tabId="1" role="tabpanel">
                      <MDBRow className="mt-4">
                        <MDBCol md="3" className="form-group">
                          <label className="grey-text" htmlFor="codigo">
                            Cód. Contrato:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="codigo"
                            value={this.state.details.cod_contrato}
                          />
                        </MDBCol>
                        <MDBCol md="3" className="form-group ">
                          <label className="grey-text" htmlFor="tipo">
                            Tipo:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="tipo"
                            value={this.state.details.tipo_contrato}
                          />
                        </MDBCol>
                        <MDBCol md="2" className="form-group">
                          <label className="grey-text" htmlFor="dt_assinatura">
                            Data assinatura:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="dt_assinatura"
                            value={this.state.details.data_assinatura_contrato}
                          />
                        </MDBCol>
                        <MDBCol md="2" className="form-group">
                          <label className="grey-text" htmlFor="dt_inicio">
                            Data de início:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="dt_inicio"
                            value={this.state.details.data_inicio_contrato}
                          />
                        </MDBCol>
                        <MDBCol md="2" className="form-group">
                          <label className="grey-text" htmlFor="dt_fim">
                            Data de término:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="dt_fim"
                            value={this.state.details.data_fim_contrato}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="4" className="form-group ">
                          <label className="grey-text" htmlFor="valor">
                            Valor:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="valor"
                            value={this.state.details.valor_contrato}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="vigencia">
                            Vigência:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="vigencia"
                            value={this.state.details.prazo_vigencia_contrato}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="prorrogacao">
                            Prorrogação:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="prorrogacao"
                            value={this.state.details.prorrogacao_contrato}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="4" className="form-group">
                          <label
                            className="grey-text"
                            htmlFor="prazo_prorrogacao"
                          >
                            Prazo Prorrogação:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="prazo_prorrogacao"
                            value={
                              this.state.details.prazo_para_prorrogacao_contrato
                            }
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="reajuste">
                            Reajuste:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="reajuste"
                            value={this.state.details.reajuste_contrato}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label
                            className="grey-text"
                            htmlFor="cond_faturamento"
                          >
                            Cond. Faturamento:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="cond_faturamento"
                            value={this.state.details.condicao_fat_contrato}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="12" className="form-group ">
                          <label className="grey-text" htmlFor="obj_contrato">
                            Descrição do Contrato:{" "}
                          </label>
                          <textarea
                            className="form-control disabled read-only"
                            id="obj_contrato"
                            rows="3"
                            value={this.state.details.objeto_contrato}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <div className="float-left">
                        <label className="grey-text">
                          Criado em:
                          <Moment
                            format="DD/MM/YYYY"
                            date={this.state.details.created_at}
                          />
                        </label>
                        <br />
                        <label className="grey-text">
                          Última atualização:
                          <Moment
                            format="DD/MM/YYYY"
                            date={this.state.details.updated_at}
                          />
                        </label>
                      </div>
                    </MDBTabPane>

                    <MDBTabPane tabId="2" role="tabpanel">
                      <MDBRow className="mt-4">
                        <MDBCol md="5" className="form-group">
                          <label
                            className="grey-text"
                            htmlFor="nome_contratante"
                          >
                            Nome:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="nome_contratante "
                            value={this.state.details.nome_contratante}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="apelido">
                            Apelido:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="apelido"
                            value={this.state.details.apelido_contratante}
                          />
                        </MDBCol>
                        <MDBCol md="3" className="form-group">
                          <label className="grey-text" htmlFor="cnpj">
                            CNPJ:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="cnpj"
                            value={this.state.details.cnpj_contratante}
                          />
                        </MDBCol>
                      </MDBRow>
                      {/* <MDBRow>
                    <MDBCol md="8" className="form-group">
                      <label className="grey-text" htmlFor="endereco">
                        Endereço:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="endereco"
                        value={this.state.details.endereco_contratante}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="bairro">
                        Bairro:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="bairro"
                        value={this.state.details.bairro_contratante}
                      />
                    </MDBCol>
                  </MDBRow> */}
                      <MDBRow className="mb-2">
                        {/* <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="cidade">
                        Cidade:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="cidade"
                        value={this.state.details.cidade_contratante}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="uf">
                        UF:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="uf"
                        value={this.state.details.uf_contratante}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="pais">
                        País:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="pais"
                        value={this.state.details.pais_contratante}
                      />
                    </MDBCol> */}
                        <MDBCol md="8" className="form-group">
                          <label
                            className="grey-text"
                            htmlFor="endereco_contratada"
                          >
                            Endereço:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="endereco_contratada"
                            value={this.state.details.end_empresa_contratada}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="cep">
                            CEP:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="cep"
                            value={this.state.details.cod_cep_contratante}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                    </MDBTabPane>

                    <MDBTabPane tabId="3" role="tabpanel">
                      <MDBRow className="mt-4">
                        <MDBCol md="5" className="form-group">
                          <label
                            className="grey-text"
                            htmlFor="nome_contratada"
                          >
                            Nome:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="nome_contratada "
                            value={this.state.details.nome_contratada}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label
                            className="grey-text"
                            htmlFor="apelido_contratada"
                          >
                            Apelido:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="apelido_contratada"
                            value={this.state.details.apelido_contratada}
                          />
                        </MDBCol>
                        <MDBCol md="3" className="form-group">
                          <label
                            className="grey-text"
                            htmlFor="cnpj_contratada"
                          >
                            CNPJ:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="cnpj_contratada"
                            value={this.state.details.cnpj_contratada}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="8" className="form-group">
                          <label
                            className="grey-text"
                            htmlFor="endereco_contratada"
                          >
                            Endereço:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="endereco_contratada"
                            value={this.state.details.end_empresa_contratada}
                          />
                        </MDBCol>
                        <MDBCol md="4" className="form-group">
                          <label className="grey-text" htmlFor="cep_contratada">
                            CEP:{" "}
                          </label>
                          <input
                            className="form-control disabled read-only"
                            type="text"
                            id="cep_contratada"
                            value={this.state.details.cod_cep_contratada}
                          />
                        </MDBCol>
                        {/* <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="bairro_contratada">
                        Bairro:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="bairro_contratada"
                        value={this.state.details.bairro_contratada}
                      />
                    </MDBCol> */}
                      </MDBRow>
                      {/* <MDBRow className="mb-2">
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="cidade_contratada">
                        Cidade:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="cidade_contratada"
                        value={this.state.details.cidade_contratada}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="uf_contratada">
                        UF:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="uf_contratada"
                        value={this.state.details.uf_contratada}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="pais_contratada">
                        País:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="pais_contratada"
                        value={this.state.details.pais_contratada}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="cep_contratada">
                        CEP:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        id="cep_contratada"
                        value={this.state.details.cod_cep_contratada}
                      />
                    </MDBCol>
                  </MDBRow> */}
                      <hr />
                    </MDBTabPane>
                    {/* <MDBTabPane tabId="4" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="cod_anexo">
                        Cód. Anexo:
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="cod_anexo"
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="cod_contrato_rp">
                        Cód. Contrato RP:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="cod_contrato_rp"
                        onChange={this.handleChange}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group ">
                      <label className="grey-text" htmlFor="vigencia_anexo">
                        Vigência (meses):{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="vigencia_anexo"
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="dt_inicio_anexo">
                        Data de início:
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="dt_inicio_anexo"
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="dt_fim_anexo">
                        Data de término:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="dt_fim_anexo"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="12" className="form-group">
                      <label className="grey-text" htmlFor="objeto_anexo">
                        Descrição do anexo:{" "}
                      </label>
                      <textarea
                        className="form-control disabled read-only"
                        ref="objeto_anexo"
                        rows="3"
                        value={this.state.details.apelido}
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
                    href="/Customers"
                    value="Return"
                    className="btn grey lighten-1 float-right"
                  >
                    Voltar
                  </MDBBtn>
                </MDBTabPane>

                <MDBTabPane tabId="5" role="tabpanel">
                  <MDBRow className="mt-4">
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="cod_aditivo">
                        Cód. Aditivo:
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="cod_aditivo"
                        value={this.state.details.apelido}
                      />
                    </MDBCol>
                    <MDBCol md="3" className="form-group">
                      <label className="grey-text" htmlFor="cod_contrato_rp">
                        Cód. Contrato RP:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="cod_contrato_rp"
                        value={this.state.details.apelido}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group ">
                      <label className="grey-text" htmlFor="vigencia_aditivo">
                        Vigência (meses):{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="vigencia_aditivo"
                        value={this.state.details.apelido}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="dt_inicio_aditivo">
                        Data de início:
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="dt_inicio_aditivo"
                        value={this.state.details.apelido}
                      />
                    </MDBCol>
                    <MDBCol md="2" className="form-group">
                      <label className="grey-text" htmlFor="dt_fim_anexo">
                        Data de término:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="dt_fim_anexo"
                        value={this.state.details.apelido}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="valor">
                        Valor:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="valor"
                        value={this.state.details.apelido}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="form-group ">
                      <label className="grey-text" htmlFor="prorrogacao">
                        Prorrogação:{" "}
                      </label>
                      <div>
                        <select
                          className="browser-default custom-select disabled read-only"
                          ref="prorrogação"
                          value={this.state.details.apelido}
                        >
                          <option value="">Selecionar</option>
                          <option value="Novo Acordo">Novo Acordo</option>
                          <option value="Automático">Automático</option>
                          <option value="Comunic. Email">
                            Comunicação por Email
                          </option>
                        </select>
                      </div>
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="prazo_prorrogacao">
                        Prazo Prorrogação:{" "}
                      </label>
                      <div>
                        <select
                          className="browser-default custom-select disabled read-only"
                          ref="prazo_prorrogacao"
                          value={this.state.details.apelido}
                        >
                          <option value="">Selecionar</option>
                          <option value="No ato">No ato</option>
                          <option value="30 dias">30 dias</option>
                          <option value="60 dias">60 dias</option>{" "}
                          <option value="90 dias">90 dias</option>
                        </select>
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="reajuste">
                        Reajuste:
                      </label>
                      <div>
                        <select
                          className="browser-default custom-select disabled read-only"
                          ref="reajuste"
                          value={this.state.details.apelido}
                        >
                          <option value="">Selecionar</option>
                          <option value="IGP-M">IGP-M</option>
                          <option value="IPCA">IPCA</option>
                          <option value="INCC">INCC</option>
                        </select>
                      </div>
                    </MDBCol>
                    <MDBCol md="4" className="form-group">
                      <label className="grey-text" htmlFor="cond_faturamento">
                        Cond. Faturamento:{" "}
                      </label>
                      <input
                        className="form-control disabled read-only"
                        type="text"
                        ref="cond_faturamento"
                        name="municond_faturamentoipal"
                        value={this.state.details.apelido}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="12" className="form-group">
                      <label className="grey-text" htmlFor="objeto_anexo">
                        Descrição do aditivo:{" "}
                      </label>
                      <textarea
                        className="form-control disabled read-only"
                        ref="objeto_anexo"
                        rows="3"
                        value={this.state.details.apelido}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr />
                </MDBTabPane> */}
                    <MDBBtn
                      href={`/Contracts/edit/${this.state.details.id}`}
                      className="light-blue darken-4 float-right"
                    >
                      <MDBIcon far icon="edit" /> Editar
                    </MDBBtn>
                    <MDBBtn
                      // onClick={this.onDelete.bind(this)}
                      onClick={this.toggleDeleteContractModal(1)}
                      className="btn grey lighten-1 float-right"
                    >
                      Excluir
                    </MDBBtn>
                    <MDBBtn
                      href="/Contracts"
                      value="Return"
                      className="btn grey lighten-1 float-right"
                    >
                      Voltar
                    </MDBBtn>
                  </MDBTabContent>
                </MDBContainer>
              </MDBCardBody>
            </MDBCard>
            <MDBBtn
              size="lg"
              href="/Contracts/add"
              className="px-3 py-3 light-blue darken-4 circle-btn"
            >
              <MDBIcon size="lg" className="text-white" icon="plus" />
            </MDBBtn>

            {/* Delete Confirmation Modal */}
            <MDBModal
              isOpen={this.state.modal1}
              toggle={this.toggleDeleteContractModal(1)}
              centered
            >
              <MDBModalHeader toggle={this.toggleDeleteContractModal(1)}>
                Deletar registro
              </MDBModalHeader>
              <MDBModalBody>
                Esta ação irá excluir o registro permanentemente. Deseja
                prosseguir?
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  className="btn grey lighten-1"
                  onClick={this.toggleDeleteContractModal(1)}
                >
                  Não
                </MDBBtn>
                <MDBBtn
                  className="btn deep-orange darken-4"
                  onClick={this.onDelete.bind(this)}
                >
                  Sim
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default ContractDetails;
