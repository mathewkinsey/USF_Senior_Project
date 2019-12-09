import React, { Component } from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from './Components/Login/Login'
import TicketPage from './Components/Ticket Page/TicketPage'
import NavBar from './Components/NavBar/NavBar'
import TableCheckbox from './Components/Checkbox Page/TableCheckbox'
import CompResults from './Components/Result Page/CompResults'
import { connect } from 'react-redux'
import { fetchUser } from './actions'

function NoPage(){
  return <h1 style={{textAlign: "center"}}>404 Not Found</h1>;
}

function PrivateRoute(props){
    if(props.user === null){
      return <Redirect to="/" exact/>
    }
    else{
      return <Route path={props.path} component={props.item}/>
    }
}

class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  render(){
    return (
      <>
        <NavBar />
        <Switch>
          <Route path="/" component={Login} exact />
          <PrivateRoute user={this.props.user} path="/User/Tickets" item={TicketPage}/>
          <PrivateRoute user={this.props.user} path="/User/TableSelection" item={TableCheckbox}/>
          <PrivateRoute user={this.props.user} path="/User/Results" item={CompResults}/>
          <Route component={NoPage}/>
        </Switch>
      </>
    );
  }
}
function mapStatetoProps({user}){
  return {user};
}
export default connect(mapStatetoProps, {fetchUser})(App);
