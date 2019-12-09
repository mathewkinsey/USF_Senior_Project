import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addResult, fetchTickets, fetchResults} from '../../actions'

class ModalForm extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if (this.state.Scale.length === 0) {
            window.prompt('Please select a result');
        }
        else {
            const {OID1, OID2, PreviousFields, User} = this.props.resultData;
            const result = {
                ID1: OID1,
                ID2: OID2,
                user: User,
                result: this.state.Scale,
                selectedFields: PreviousFields
            }
            this.props.addResult(result, User);
            this.props.removeModal();
            this.setState({
                Scale: ''
            })
        }
    }
    render() {
        return (
            <div>
                <form className="Likert-Scale" onSubmit={this.handleSubmit}>
                    <label>
                        <p>Not at all similar</p>
                        <input onChange={this.handleChange} name="Scale" id="Lowest" type="radio" value="Not at all similar" />
                    </label>
                    <label>
                        <p>Somewhat similar</p>
                        <input onChange={this.handleChange} name="Scale" id="Lower" type="radio" value="Somewhat similar" />
                    </label>
                    <label>
                        <p>Very similar</p>
                        <input onChange={this.handleChange} name="Scale" id="Low" type="radio" value="Very similar" />
                    </label>
                    <label>
                        <p>Nearly identical</p>
                        <input onChange={this.handleChange} name="Scale" id="Medium" type="radio" value="Nearly identical" />
                    </label>
                    <input className="Likert-Submit" type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
export default connect(null, {addResult, fetchTickets, fetchResults})(ModalForm);