import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProviderItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: props.item
        }
    }
render() {
    return(
        <p className="collection-item">
            <Link to={`/Providers/${this.state.item.id}`} >{this.state.item.nome}</Link>
        </p>

    )
}
}

export default ProviderItem;