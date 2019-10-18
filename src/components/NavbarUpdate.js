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
} from "mdbreact";


class NavbarUpdate extends React.Component {
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
    const bgDarkGrey = { backgroundColor: "#3F3F3E" };
    const container = { height: 0, width: 400 };
    return (
      <div>
        <div className="sidebar-fixed position-fixed">
          <a href="#!" className="logo-wrapper waves-effect">
            <img
              src="http://www.rperformancegroup.com/img/logo-rperformance-group-white-200-80.png"
              height="80px"
              className="img-fluid px-2 py-4"
              alt="Company's Logo"
            />{" "}
          </a>
          <MDBListGroup active className="list-group-flush">
            <NavLink exact to="/" className="activeClass">
              <MDBListGroupItem hover>
                <MDBIcon icon="chart-pie" className="mr-3" />
                Dashboard
              </MDBListGroupItem>
            </NavLink>
            <NavLink to="/Collaborators" className="activeClass">
              <MDBListGroupItem hover>
                <MDBIcon icon="address-card" className="mr-3" />
                Colaboradores
              </MDBListGroupItem>
            </NavLink>
            <NavLink to="/Providers" className="activeClass">
              <MDBListGroupItem hover>
                <MDBIcon icon="briefcase" className="mr-3" />
                Fornecedores
              </MDBListGroupItem>
            </NavLink>
            <NavLink to="/CollabDeals" className="activeClass">
              <MDBListGroupItem hover>
                <MDBIcon icon="hand-holding-usd" className="mr-3" />
                Negociação
              </MDBListGroupItem>
            </NavLink>
            <NavLink to="/NFsInbound" className="activeClass">
              <MDBListGroupItem hover>
                <MDBIcon icon="file-import" className="mr-3" />
                NF-Entrada
              </MDBListGroupItem>
            </NavLink>
            <NavLink to="/NFsExit" className="activeClass">
              <MDBListGroupItem>
                <MDBIcon icon="file-export" className="mr-3" />
                NF-Saída
              </MDBListGroupItem>
            </NavLink>
          </MDBListGroup>
        </div>

        <header>
          <MDBNavbar style={bgDarkGrey} dark expand="md" scrolling fixed="top">
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBNavLink to="#">
                    <MDBIcon icon="bars" color="white" size="1x" />
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
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
                    <MDBIcon icon="sign-out-alt" />
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
