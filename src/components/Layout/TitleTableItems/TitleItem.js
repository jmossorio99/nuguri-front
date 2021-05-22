import React, { Component } from 'react';
import "./TitleItem.css";

export default class TitleItem extends Component {
    render() {
        return (
            <h5 className="title">{this.props.children}</h5>
        )
    }
}


