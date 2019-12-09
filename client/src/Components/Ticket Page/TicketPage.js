import React, { Component } from 'react'
import LikertScale from "./LikertScale"
import Ticket from "./Ticket"
import { connect } from "react-redux"

import '../../Styles/TicketPage.scss'

class TicketPage extends Component {
    render() {
        if(this.props.tickets == null || this.props.compCount === 0){
            return (
                <div className="Default-ticket-msg">
                    <p>No Available Selections</p>
                </div>
            );
        }
        else{
            return (
                <>
                <div className="Ticket-Structure">
                    <div>
                        <LikertScale ticketOne={this.props.tickets.data[0]} 
                        ticketTwo={this.props.tickets.data[1]}/>
                    </div>   
                    <div>
                        <h2>Comparisons left: {this.props.compCount}</h2>
                    </div>
                    <div className="Ticket-Data">
                        
                        <Ticket ticketData = {this.props.tickets.data[0]}/>
                        <Ticket ticketData = {this.props.tickets.data[1]}/>
                    </div>             
                </div>
                <div className="Ticket-One"/>
                <div className="Ticket-Two"/>*
                </>
            )
        }
    }
}
function mapStatetoProps({tickets, compCount}){
    return {tickets, compCount};
}
export default connect(mapStatetoProps, null)(TicketPage);