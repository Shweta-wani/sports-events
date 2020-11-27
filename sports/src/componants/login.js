import React, { Component, useState, useEffect } from 'react';
import $ from "jquery";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: "",
      showerror: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick() {
    this.setState({
      showerror: false
    });
  }

  componentDidMount() {
    let users = [];
    const url = "http://localhost:3000/users";

    fetch(url)
      .then(response => response.json())
      .then(res => {
        $.each(res.users, function (index, value) {
          users.push({
            id: value.id,
            name: value.name,
            surname: value.surname,
            password: value.password,
            Email: value.Email,
            userGroup: value.userGroup,
            subscribeTo: value.subscribeto
          });
        });
        this.setState(() => ({ users }));
      }).catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
  }

  handleSubmit(event) {
    const { users, username, password } = this.state;

    axios
      .post(
        "http://localhost:3000/users",
        {
          user: {
            name: username,
            password: password
          }
        },
        { credentials: 'include' },
        { withCredentials: true }
      )
      .then(response => {
        let loginUser = users.map((value) => value).filter(value => value.name === username && value.password === password);
        let params = loginUser[0].name;
        this.props.handleLogin(loginUser, users);
        this.props.history.push("/users/" + params);
      })
      .catch(error => {
        console.log("login error", error);
        this.setState({ showerror: true })
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="d-flex justify-content-center">
              <input
                type="text"
                name="username"
                className="form-control col-6 m-4"
                placeholder="User Name"
                value={this.state.name}
                onChange={this.handleChange}
                onClick={this.handleClick}
                required />
            </div>
            <div className="d-flex justify-content-center">
              <input
                type="password"
                name="password"
                className="form-control col-6 m-4"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                onClick={this.handleClick}
                required />
            </div>
            <div className="m-4 d-flex justify-content-center">
              <button type="submit" className="btn btn-success col-6">Submit</button>
            </div>
            {this.state.showerror ?
              <div className="alert alert-danger m-4 d-flex justify-content-center" role="alert">
                <strong>Login Error:</strong> Invalid User name or Password !
                  </div> : null
            }
          </div>
        </form>
      </div>
    );
  }
}

export default Login;