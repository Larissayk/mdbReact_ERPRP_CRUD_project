import React, { Component } from "react";
import { Link } from "react-router-dom";

class ContractItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }
  render() {
    return (
      <p className="collection-item">
        <Link to={`/Contracts/${this.state.item.id}`}>
          {this.state.item.cod_contrato_rp}
        </Link>
      </p>
    );
  }
}

export default ContractItem;
