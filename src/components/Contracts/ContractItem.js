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
        <Link to={`/Contract/${this.state.item.id}`}>
          {this.state.item.codigo_contrato}
        </Link>
      </p>
    );
  }
}

export default ContractItem;
