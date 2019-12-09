import React, { Component } from 'react'

import '../../Styles/TicketField.scss'

export default class TicketField extends Component {
    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div>
                <h2 className="Header-Field">{this.props.title}</h2>
                <div className="Input-Field">
                    <p>{this.props.datas}</p>
                </div>
            </div>
        )
    }
}
