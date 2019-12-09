import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { fetchResults, fetchPreviousSelected, fetchCSV, deleteResult } from '../../actions'
import Modal from './Modal'
import Comparisons from './Comparisons'

import '../../Styles/CompResults.scss'

class CompResults extends Component {
    constructor(props){
        super(props);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            show: false,
            OID1: '',
            OID2: '',
            PreviousFields: '',
            User: '',
            dateOne: '',
            dateTwo: '',
            selectedExport: "Current",
        }
    }
    showModal(id1, id2, result, user){
        this.setState({
            show: true,
            OID1: id1,
            OID2: id2,
            PreviousFields: result,
            User: user
        });
    }
    closeModal(){
        this.setState({
            show: false
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const exportData = {
            user: this.props.user,
            dateOne: this.state.dateOne,
            dateTwo: this.state.dateTwo,
            selectedExport: this.state.selectedExport
        }
        this.props.fetchCSV(exportData);
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount(){
        const {user, fetchResults} = this.props;
        fetchResults(user);
    }
    render() {
        
            if(this.props.comparisons === null){
                return null;
            }
            else{
                return (
                    <>
                        <div className="Comparison-Flex">
                            <div className="All-Results">
                                <div className="Top-Row">
                                    <div>ID1</div>
                                    <div>ID2</div>
                                    <div>Result</div>
                                    <div>User</div>
                                    <div>Time</div>
                                    <div/>
                                </div>
                                {this.props.comparisons.data.map((items, i) => (
                                    <Comparisons key={i} OID1={items.ID1} OID2={items.ID2}
                                        User={items.grader} Result={items.result} time={items.date}
                                        modalShow={this.showModal} previousFields={items.selectedFields}
                                        fetchPrev={this.props.fetchPreviousSelected} deleteId={items._id}
                                        deleteEntry={this.props.deleteResult}/>
                                ))}
                            </div>
                            <form className="date-form" onSubmit={this.handleSubmit}>
                                <input type="date" name="dateOne" onChange={this.handleChange} required />
                                <span>to</span>
                                <input type="date" name="dateTwo" onChange={this.handleChange} required />
                                <select onChange={this.handleChange} name="selectedExport" required>
                                    <option value="Current">Current User</option>
                                    <option value="All">All Users</option>
                                </select>
                                <input type="submit" className="Export-csv" value="Export CSV" />
                            </form>
                        </div>
                        <Modal show={this.state.show} hideModal={this.closeModal} compareData={this.state} />
                    </>
                )
            }
    }
}
function mapStatetoProps({user, comparisons}){
    return {user, comparisons};
}
export default connect(mapStatetoProps, { fetchResults, fetchPreviousSelected, fetchCSV, deleteResult})(CompResults);
