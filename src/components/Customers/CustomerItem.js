import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }
  render() {
    return (
      <p className="collection-item">
        <Link to={`/Customers/${this.state.item.id}`}>
          {this.state.item.empresa}
        </Link>
      </p>
    );
  }
}

export default CustomerItem;
