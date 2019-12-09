import React, { Component } from 'react'
import TicketField from './TicketField'
import { connect } from 'react-redux'
import tableNames from '../Ticket Tables/tableNames'

import '../../Styles/Ticket.scss'

class Ticket extends Component {
    render() {
        if(this.props.table == null){
            return null;
        }
        else{
            const names = tableNames;
            const ticketData = Object.values(this.props.ticketData);
            const TicketFields = Object.keys(this.props.table).map((item, i) => (
                <TicketField key={i} show={this.props.table[item]} title={names[i]} datas={ticketData[i]}/>
            ))
            return (
                <div className="Ticket">
                    {TicketFields}
                </div>
            )
        }
    }
}
function mapStatetoProps({table}){
    return {table};
}
export default connect(mapStatetoProps)(Ticket);
