import React, { Component } from "react";
import { Link } from "react-router-dom";

class CollaboratorDealItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }
  render() {
    return (
      <p className="collection-item">
        <Link to={`/CollabDeals/${this.state.item.id}`}>
          {this.state.item.name}
        </Link>
      </p>
    );
  }
}

export default CollaboratorDealItem;
