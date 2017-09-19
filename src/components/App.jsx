import React from 'react';
import classNames from "classnames";
import { Router, Route } from 'react-router';

class App extends React.Component {
 
    constructor() {
        super();

        this.getTemplate = this.getTemplate.bind(this);
    }

    getTemplate() {
        if (!this.props.location.query.cod) {
            return (React.DOM.div({}, "Parameter not found"))
        }
        return (
            React.DOM.div({},
                React.DOM.section({className: classNames('main', 'fluid')},
                    this.props.children
                )
            )
        )
    }

    render() {
        return this.getTemplate();
    }
}

module.exports = App;