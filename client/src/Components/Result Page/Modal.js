import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalForm from './ModalForm'
import OldTickets from './OldTickets'

import '../../Styles/Modal.scss'

class Modal extends Component {
    render() {
        if(!this.props.show || this.props.previousTickets === null){
            return null;
        }
        else{
            return (
                <>
                    <div className="Modal-bg"></div>
                    <div className="Modal-Content">
                        <div className="Modal-Header">
                            <span className="Close-btn" onClick={this.props.hideModal}>x</span>
                        </div>
                        <div className="Modal-Body">
                            <div>
                                <ModalForm resultData={this.props.compareData} removeModal={this.props.hideModal}/>
                            </div>
                            <div className="Modal-Tickets">
                                <OldTickets theTicket={this.props.previousTickets.data[0]}/>
                                <OldTickets theTicket={this.props.previousTickets.data[1]} />
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}
function mapStatetoProps({previousTickets}){
    return {previousTickets};
}
export default connect(mapStatetoProps, null)(Modal)
