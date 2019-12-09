import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addResult, fetchTickets, decreaseCount } from '../../actions'

import '../../Styles/LikertScale.scss'

class LikertScale extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            Scale: ''
        }
    }
    handleChange(e){
        this.setState({
            Scale: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.Scale.length === 0){
            window.prompt('Please select a result');
        }
        else{
            const result = {
                ID1: this.props.ticketOne.ItemID,
                ID2: this.props.ticketTwo.ItemID,
                user: this.props.user,
                result: this.state.Scale,
                selectedFields: this.props.selectedTables
            }
            this.props.addResult(result, this.props.user);
            this.props.fetchTickets();
            this.props.decreaseCount(this.props.compCount);
        }
    }
    render() {
        return (
            <div>
                <form className="Likert-Scale" onSubmit={this.handleSubmit}>
                    <label>
                        <p>Not at all similar</p>
                        <input onChange={this.handleChange} name="Scale" id="Lowest" type="radio" value="Not at all similar"/>
                    </label>
                    <label>
                        <p>Somewhat similar</p>
                        <input onChange={this.handleChange} name="Scale" id="Lower" type="radio" value="Somewhat similar"/>
                    </label>
                    <label>
                        <p>Very similar</p>
                        <input onChange={this.handleChange} name="Scale" id="Low" type="radio" value="Very similar"/>
                    </label>
                    <label>
                        <p>Nearly identical</p>
                        <input onChange={this.handleChange} name="Scale" id="Medium" type="radio" value="Nearly identical"/>
                    </label>
                    <input className="Likert-Submit" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
function mapStatetoProps({user, tickets, compCount, selectedTables}){
    return {user, tickets, compCount, selectedTables};
}
export default connect(mapStatetoProps, { addResult, fetchTickets, decreaseCount })(LikertScale);
