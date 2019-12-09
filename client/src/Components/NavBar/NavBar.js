import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut, fetchUser } from '../../actions'
import { withRouter } from 'react-router-dom'

import '../../Styles/NavBar.scss'

class NavBar extends Component {
    render() {
        if(!this.props.user){
           return null;
        }
        return (
            <div className="NavBar">
                <div className="Nav-Flex">
                    <NavLink activeClassName="active-selected" className="Links" to="/User/Tickets">Tickets</NavLink>
                    <NavLink activeClassName="active-selected" className="Links" to="/User/TableSelection">Checkbox</NavLink>
                    <NavLink activeClassName="active-selected" className="Links" to="/User/Results">Comparisons</NavLink>
                    <button onClick={()=>{
                        this.props.logOut();
                        this.props.fetchUser();
                        this.props.history.push("/");
                        window.location.reload();
                    }}>Logout</button>
                    <div>&#169; Copyright 2019 Text</div>    
                </div>         
            </div>
        )
    }
}
function mapStatetoProps({user}){
    return {user};
}
export default withRouter(connect(mapStatetoProps, {logOut, fetchUser})(NavBar));