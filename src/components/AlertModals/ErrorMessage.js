import React, { Component } from "react";
import { MDBNotification } from "mdbreact";

class ErrorMessage extends Component {
    render() {
        return (
            <MDBNotification
                show
                fade
                icon="check-circle"
                iconClassName="red-text"
                titleClassName="red-text"
                title="Error"
                message="Houve falha na modificação do registro!"
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

export default ErrorMessage;