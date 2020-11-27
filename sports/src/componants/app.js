import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import $ from "jquery";

import Login from "./login";
import Users from "./users";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.setState({
      users: {}
    });
  }

  componentWillMount() {
    localStorage.getItem('users') && this.setState({
      users: JSON.parse(localStorage.getItem('users')),
      isLoading: false
    });
    localStorage.getItem('userList') && this.setState({
      userList: JSON.parse(localStorage.getItem('userList')),
      isLoading : false
    })
  }

  handleLogin(loginUser, userList) {
    this.setState({
      users: loginUser,
      userList
    });
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('users', JSON.stringify(nextState.users));
    localStorage.setItem('userList', JSON.stringify(nextState.userList));
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                />
              )}
            />
            <Route
              exact
              path={"/users/:name"}
              render={props => (
                <Users
                  {...props}
                  users={this.state.users}
                  userList={this.state.userList}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}