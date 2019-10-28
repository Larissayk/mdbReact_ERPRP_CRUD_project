import React, { Component } from "react";
import { MDBNotification } from "mdbreact";

class SuccessMessage extends Component {
    render() {
        return (
            
            <MDBNotification
                show
                fade
                icon="check-circle"
                iconClassName="green-text"
                titleClassName="green-text"
                title="Success"
                message="Mudanças foram realizadas com sucesso!"
                style={{
                    position: "fixed",
                    top: "30px",
                    right: "10px",
                    zIndex: 9999
                }}
            />
        );
    }
}

export default SuccessMessage;






