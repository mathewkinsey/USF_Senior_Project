import React, { Component } from 'react'
import Tables from '../Ticket Tables/Tables'
import tableNames from '../Ticket Tables/tableNames'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { getTables, fetchTickets, fetchAllResults, setCounter, addSelectedTables } from '../../actions'
import Checkbox from './Checkbox'

import '../../Styles/TableCheckbox.scss'

class TableCheckbox extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComparisonChange = this.handleComparisonChange.bind(this);
        this.state = Tables;
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.checked,
        })
    }
    handleComparisonChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const selectedTables = this.state;
        const tableKeys = Object.keys(selectedTables);
        const tableValues = Object.values(selectedTables);
        let dbSelectedProperties = "";
        for(let i = 0; i < tableKeys.length - 1; i++){
            if(tableValues[i] === true){
                dbSelectedProperties += tableKeys[i];
                dbSelectedProperties += " ";
            }
        }
        this.props.addSelectedTables(dbSelectedProperties);
        this.props.setCounter(selectedTables.comparisons);
        this.props.getTables(selectedTables);
        this.props.fetchTickets();
        this.props.history.push("Tickets");
    }
    componentDidMount(){
        this.props.fetchAllResults(this.props.tickets.user);
    }
    render() {
        const allTheTables = tableNames;
        //Dinamically render all the checkboxes 
        const renderTables = allTheTables.map((names, i)=>(
            <Checkbox key={i} name={names} Change={this.handleChange}/>
        ))
        if(this.props.tickets.count === null){
            return null
        }
        else{
            return (
                <div>
                    <form className="Form-Position" onSubmit={this.handleSubmit}>
                        <h2>Ticket Fields</h2>
                        <div className="Checkboxes">
                            {renderTables}
                        </div>
                        <input className="Submit-check" type="text" name="comparisons" 
                        placeholder="# of comparisons" onChange={this.handleComparisonChange} required/>
                        <input className="Submit-check" type="submit" value="Submit" />
                    </form>
                    <div className="user-stats">
                        <h2>Welcome {this.props.tickets.user}</h2>
                        <h5>Total Comparisons: {this.props.tickets.count.data}</h5>
                    </div>
                </div>
            )
        }
    }
}
function mapStatetoProps(tickets, user, count){
    return {tickets, user, count};
}
export default withRouter(connect(mapStatetoProps, {getTables, fetchTickets, fetchAllResults, setCounter, addSelectedTables})(TableCheckbox));