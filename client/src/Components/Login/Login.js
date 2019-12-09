import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser, fetchUser } from '../../actions'
import { withRouter } from 'react-router-dom'

import '../../Styles/Login.scss'

class Login extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            user: ''
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const user = this.state.user;
        this.props.getUser(user);
        this.props.fetchUser();
        this.props.history.push("User/TableSelection");
    }
    render() {
        return (
            <div>
                <form className="Login-Form" onSubmit={this.handleSubmit}>
                    <h1>LOGIN</h1>
                    <input type="text" placeholder="User" 
                    name="user" onChange={this.handleChange} required/>
                    <input className="Submit-btn" type="submit" value="LOGIN"/>
                </form>
                <div className="Login-bg"/>
            </div>
        )
    }
}


export default withRouter(connect(null, {getUser, fetchUser})(Login));
