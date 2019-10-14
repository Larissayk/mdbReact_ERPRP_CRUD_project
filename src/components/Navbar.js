import React, { Component } from "react";
import {
  MDBNavbarNav,
  MDBNavLink,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavItem,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    const bgNavBar = { backgroundColor: "#3F3F3E" };
    return (
      <div>
        <MDBNavbar style={bgNavBar} dark expand="md" scrolling fixed="top">
          <MDBNavbarBrand href="/">
            <img
              src="http://www.rperformancegroup.com/img/logo-rperformance-group-white-200-80.png"
              height="55"
              className="d-inline-block align-top"
              alt="Company's Logo"
            />
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.onClick} />
          <MDBCollapse isOpen={this.state.collapse} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <span className="mr-2">Cadastros</span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem href="/Collaborators">
                      Colaboradores
                    </MDBDropdownItem>
                    <MDBDropdownItem href="/Providers">
                      Fornecedores
                    </MDBDropdownItem>
                    <MDBDropdownItem href="/CollabDeals">
                      Dados de Negociação
                    </MDBDropdownItem>
                    <MDBDropdownItem href="/NFsExit">NF-Saída</MDBDropdownItem>
                    <MDBDropdownItem href="/NFsInbound">
                      NF-Entrada
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink to="#">
                  <MDBIcon icon="cog" />
                  Configurações
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#">
                  <MDBIcon icon="user" />
                  Usuário
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/Login">
                  <MDBIcon icon="sign-out-alt" />
                  Log Out
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
    
  }
}

export default Navbar;
