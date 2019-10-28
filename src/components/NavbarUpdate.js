import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBListGroup,
  NavLink,
  MDBListGroupItem,
  MDBBreadcrumb,
  MDBBtn,
  MDBBreadcrumbItem,
  MDBAnimation
} from "mdbreact";
import { tsParameterProperty } from "@babel/types";
import { Link, Switch, Route, withRouter } from "react-router-dom";

class NavbarUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      collapseID: ""
    };
    this.onClick = this.onClick.bind(this);
  }

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  };

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    const bgDarkGrey = { backgroundColor: "#FFF" };
    const container = { height: 0, width: 400 };
    console.log("ROta", window.location.pathname);
    const path = window.location.pathname;

    return (
      <div>
        {/* <MDBCollapse id="basicCollapse" isOpen={true}>
          <MDBAnimation type="slideInLeft"> */}
        <div className="sidebar">
          <a href="#!" className="logo-wrapper waves-effect">
            <img
              src="http://www.rperformancegroup.com/img/logo-rperformance-group-white-200-80.png"
              // src="http://www.rperformancegroup.com/img/logo-rperformance-group-color-150-60.png"
              style={{ width: 170 }}
              className="img-fluid p-1"
              alt="Company's Logo"
            />{" "}
          </a>
          <MDBListGroup active className="list-group-flush">
            <NavLink exact to="/" className="activeClass">
              <MDBListGroupItem hover>
                <MDBIcon icon="chart-pie" className="mr-3" fixed />
                Dashboard
              </MDBListGroupItem>
            </NavLink>
            <NavLink
              to="#"
              className="activeClass"
              onClick={this.toggleCollapse("basicCollapse")}
            >
              <MDBListGroupItem id="Cadastro" hover>
                <MDBIcon icon="edit" className="mr-3" fixed />
                Cadastros
                {this.state.collapseID ? (
                  <MDBIcon icon="angle-up" className="ml-4" fixed />
                ) : (
                  <MDBIcon icon="angle-down" className="ml-4" fixed />
                )}
              </MDBListGroupItem>
            </NavLink>
            <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
              <NavLink to="/Collaborators" className="activeClass">
                <MDBListGroupItem
                  style={{ fontWeight: "300", fontSize: "15px" }}
                  hover
                >
                  <MDBIcon icon="address-card" className="mr-3" fixed />
                  Colaboradores
                </MDBListGroupItem>
              </NavLink>
              <NavLink to="/Providers" className="activeClass">
                <MDBListGroupItem
                  style={{ fontWeight: "300", fontSize: "15px" }}
                  hover
                >
                  <MDBIcon icon="briefcase" className="mr-3" fixed />
                  Fornecedores
                </MDBListGroupItem>
              </NavLink>
              <NavLink to="/CollabDeals" className="activeClass">
                <MDBListGroupItem
                  style={{ fontWeight: "300", fontSize: "15px" }}
                  hover
                >
                  <i class="fas fa-hand-holding-usd mr-3 pl-1" />
                  Negociação
                </MDBListGroupItem>
              </NavLink>
              <NavLink to="/NFsInbound" className="activeClass">
                <MDBListGroupItem
                  style={{ fontWeight: "300", fontSize: "15px" }}
                  hover
                >
                  <i class="fas fa-file-import mr-3 pl-1" />
                  NF-Entrada
                </MDBListGroupItem>
              </NavLink>
              <NavLink to="/NFsExit" className="activeClass">
                <MDBListGroupItem
                  style={{ fontWeight: "300", fontSize: "14px" }}
                >
                  <i class="fas fa-file-export mr-3 pl-1" />
                  NF-Saída
                </MDBListGroupItem>
              </NavLink>
            </MDBCollapse>

            <NavLink to="/Customers" className="activeClass">
              <MDBListGroupItem>
                <MDBIcon far icon="building" className="mr-3" fixed />
                Clientes
              </MDBListGroupItem>
            </NavLink>
            <NavLink to="/Contracts" className="activeClass">
              <MDBListGroupItem>
                <MDBIcon icon="file-alt" className="mr-3" fixed />
                Contratos
              </MDBListGroupItem>
            </NavLink>
          </MDBListGroup>
        </div>
        {/* </MDBAnimation>
        </MDBCollapse> */}

        <header>
          <MDBNavbar style={bgDarkGrey} dark expand="sm" fixed="top">
            <MDBNavbarToggler onClick={this.onClick} />
            {/* <a href="#!" className="logo-wrapper waves-effect">
              <img
                // src="http://www.rperformancegroup.com/img/logo-rperformance-group-white-200-80.png"
                src="http://www.rperformancegroup.com/img/logo-rperformance-group-color-150-60.png"
                style={{ width: 150 }}
                className="img-fluid p-1"
                alt="Company's Logo"
              />{" "}
            </a> */}

            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBBtn
                color="black"
                // onClick={this.toggleSidebar("basicCollapse")}
              >
                <MDBIcon icon="bars" color="white" size="1x" />
              </MDBBtn>

              {/* Breadcrumbs */}
              <MDBBreadcrumb>
                <MDBBreadcrumbItem>
                  <Link to="/">Home</Link>
                </MDBBreadcrumbItem>
                {path.startsWith("/Collaborators") ? (
                  <MDBBreadcrumbItem active>Colaboradores</MDBBreadcrumbItem>
                ) : path.startsWith("/Providers") ? (
                  <MDBBreadcrumbItem active>Fornecedores</MDBBreadcrumbItem>
                ) : path.startsWith("/CollabDeals") ? (
                  <MDBBreadcrumbItem active>Negociação</MDBBreadcrumbItem>
                ) : path.startsWith("/NFsInbound") ? (
                  <MDBBreadcrumbItem active>NF-Entrada</MDBBreadcrumbItem>
                ) : path.startsWith("/NFsExit") ? (
                  <MDBBreadcrumbItem active>NF-Saída</MDBBreadcrumbItem>
                ) : path.startsWith("/Customers") ? (
                  <MDBBreadcrumbItem active>Clientes</MDBBreadcrumbItem>
                ) : path.startsWith("/Contracts") ? (
                  <MDBBreadcrumbItem active>Contratos</MDBBreadcrumbItem>
                ) : null}
              </MDBBreadcrumb>

              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink to="#">
                    <MDBIcon icon="cog" className="mr-1" />
                    Configurações
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="#">
                    <MDBIcon icon="user" className="mr-1" />
                    Usuário
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/Login">
                    <i class="fas fa-sign-out-alt"></i>
                    {/* <MDBIcon icon="sign-out-alt" /> */}
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </header>
        <MDBContainer
          style={container}
          className="text-center mt-5 pt-5"
        ></MDBContainer>
      </div>
    );
  }
}

export default NavbarUpdate;
