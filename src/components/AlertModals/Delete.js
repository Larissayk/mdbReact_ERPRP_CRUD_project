import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";

class Delete extends Component {
  
  render() {
    return (
      <div>
        <MDBModal
          isOpen={this.state.modal3}
          toggle={this.toggleDeleteCollaboratorModal(3)}
          centered
        >
          <MDBModalHeader toggle={this.toggleDeleteCollaboratorModal(3)}>
            Deletar registro
          </MDBModalHeader>
          <MDBModalBody>
            Esta ação irá excluir o registro permanentemente. Deseja prosseguir?
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              className="btn grey lighten-1"
              onClick={this.toggleDeleteCollaboratorModal(3)}
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
      </div>
    );
  }
}

export default Delete;
