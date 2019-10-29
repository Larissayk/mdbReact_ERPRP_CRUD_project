import React from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBBreadcrumb,
  MDBBtn,
  MDBBreadcrumbItem,
} from "mdbreact";
import { Link } from "react-router-dom";

class TopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
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
    console.log("ROta", window.location.pathname);
    const path = window.location.pathname;

    return (
      <div>
        
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
      </div>
    );
  }
}

export default TopNavigation;
