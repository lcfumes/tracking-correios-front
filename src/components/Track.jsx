import React from "react";
import axios from "axios";
import { Link } from 'react-router';
import classNames from "classnames";
import { toArray } from "lodash";
import Config from 'Config';
import _ from "lodash";

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: [],
            cod: this.props.location.query.cod
        }

        this.uri = Config.track.uri.replace("%cod", this.props.location.query.cod);

        this.getTable = this.getTable.bind(this);
    }

    componentWillMount() {
        this.getTrack();
    }

    getTrack() {
        axios.get(this.uri)
        .then(function(result) {
            this.setState({
                track: result.data.evento
            })
        }.bind(this))
        .catch(function(error) {
            console.log(error);
        }.bind(this))
    }

    getLineStyle(data) {
        let check = (status) => {
            return data.tipo == status;
        }

        if (Config.correios.status.delivered.find(check) && data.status == Config.correios.status.deliveredStatus) {
            return "success";
        }
    }

    getTable() {
        let content = React.DOM.tr({},
            React.DOM.td({colSpan: 3}, 
                React.DOM.div({className: classNames('loader')})
            )
        )

        if (this.state.track && this.state.track.length > 0) {
            content = this.state.track.map((data, i) => {
                return React.DOM.tr({key: 'track_status_' + i, className: classNames(this.getLineStyle(data))},
                    React.DOM.td({}, data.data + " " + data.hora),
                    React.DOM.td({}, data.local),
                    React.DOM.td({}, data.descricao)
                )
            });
        }

        if (this.state.track === undefined) {
            content = React.DOM.tr({},
                React.DOM.td({colSpan: 3, className: classNames('active')}, "Nenhuma informação encontrada")
            )
        }

        return (
            React.DOM.div({}, 
                React.DOM.div({className: classNames('content-header')},
                    React.DOM.div({className: classNames('correios-logo')}),
                    React.DOM.h2({className: classNames('header-title')}, "Histórico do Objeto: " + this.state.cod),
                    React.DOM.p({}, "O horário não indica quando a situação ocorreu, mas sim quando os dados foram recebidos pelo sistema"),
                    React.DOM.div({className: classNames('content')},
                        React.DOM.table({className: classNames('table', 'table-bordered', 'table-hover')},
                            React.DOM.thead({},
                                React.DOM.tr({},
                                    React.DOM.th({}, 'Data'),
                                    React.DOM.th({}, 'Local'),
                                    React.DOM.th({}, 'Situação')
                                )
                            ),
                            React.DOM.tbody({},
                                content
                            )
                        )
                    )
                )
            )
        )
    }

    render() {
        return (
            React.DOM.div({className: classNames('col-md-10')},
                this.getTable()
            )
        )
    }
}

Track.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Track;