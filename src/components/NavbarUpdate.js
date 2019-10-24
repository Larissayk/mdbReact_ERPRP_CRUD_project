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
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }

  toggleCollapse = collapseID => () => {
  this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
}

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    const bgDarkGrey = { backgroundColor: "#3f3f3e" };
    const container = { height: 0, width: 400 };
    return (
      <div>
        <div className="sidebar-fixed position-fixed">
          <a href="#!" className="logo-wrapper waves-effect">
            <img
              src="http://www.rperformancegroup.com/img/logo-rperformance-group-white-200-80.png"
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
            <NavLink to="/Collaborators" className="activeClass">
              <MDBListGroupItem hover>
                <MDBIcon icon="address-card" className="mr-3" fixed />
                Colaboradores
              </MDBListGroupItem>
            </NavLink>
            <NavLink to="/Providers" className="activeClass">
              <MDBListGroupItem hover>
                <MDBIcon icon="briefcase" className="mr-3" fixed />
                Fornecedores
              </MDBListGroupItem>
            </NavLink>
            <NavLink to="/CollabDeals" className="activeClass">
              <MDBListGroupItem hover>
                <i class="fas fa-hand-holding-usd mr-3 pl-1" />
                Negociação
              </MDBListGroupItem>
            </NavLink>
            <NavLink to="/NFsInbound" className="activeClass">
              <MDBListGroupItem hover>
                <i class="fas fa-file-import mr-3 pl-1" />
                NF-Entrada
              </MDBListGroupItem>
            </NavLink>
            <NavLink to="/NFsExit" className="activeClass">
              <MDBListGroupItem>
                <i class="fas fa-file-export mr-3 pl-1" />
                NF-Saída
              </MDBListGroupItem>
            </NavLink>
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

        <header>
          <MDBNavbar style={bgDarkGrey} dark expand="sm" fixed="top">
            <MDBNavbarToggler onClick={this.onClick} />
            {!this.state.isWideEnough && (
              <MDBNavbarToggler onClick={this.onClick} />
            )}
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
