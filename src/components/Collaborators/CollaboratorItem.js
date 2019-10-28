import React, { Component } from "react";
import { Link } from "react-router-dom";

class CollaboratorItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }
  render() {
    return (
      <p className="align-middle ">
        <Link to={`/Collaborators/${this.state.item.id}`}>
          {this.state.item.nome}
        </Link>
      </p>
    );
  }
}

export default CollaboratorItem;
