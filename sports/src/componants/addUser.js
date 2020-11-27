import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: this.props.userList,
            userName: "",
            surname: "",
            Email: "",
            userGroup: "",
            subscribeto: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.eventType = this.eventType.bind(this);
    }

    handleChange(e, textFor) {
        const ele = e.target.value;
        switch (textFor) {
            case "userName":
                this.setState({ userName: ele });
                break;
            case "surname":
                this.setState({ surname: ele });
                break;
            case "Email":
                this.setState({ Email: ele });
                break;
            case "userGroup":
                this.setState({ userGroup: $('#userGroup').val() });
                break;
            case "subscribeto":
                this.setState({ subscribeto: $('#subscribeTo').val() });
                break;
        }
    }

    componentWillMount() {
        localStorage.getItem('users') && this.setState({
            users: JSON.parse(localStorage.getItem('users')),
            isLoading: false
        });
        localStorage.getItem('userList') && this.setState({
            userList: JSON.parse(localStorage.getItem('userList')),
            isLoading: false
        })
    }

    componentDidMount() {
        this.eventType();
    }

    eventType() {
        let eventtype = [];
        const urleventtype = "http://localhost:3000/eventtype";

        fetch(urleventtype)
            .then(response => response.json())
            .then(res => {
                $.each(res.eventtype, function (index, value) {
                    eventtype.push({
                        id: value.id,
                        name: value.name
                    });
                });

                this.setState(() => ({ eventtype }));
            }).catch(() => console.log("Can’t access " + urleventtype + " response. Blocked by browser?"));
    }

    handleSubmit = (event) => {
        const { userName, surname, Email, userList, subscribeto, userGroup } = this.state;

        axios
            .post(
                "http://localhost:3000/users/:name",
                {
                    name: userName,
                    surname,
                    Email,
                    userGroup: $('#userGroup').val(),
                    subscribeto: $('#subscribeTo').val()
                },
                { credentials: 'include' },
                { withCredentials: true }
            )
            .then(response => {
                userList.push({
                    id: userList.length + 1,
                    name: userName,
                    surname,
                    Email,
                    userGroup: $('#userGroup').val(),
                    subscribeTo: $('#subscribeTo').val()
                });
                this.setState({ userList });
                this.props.onSubmitButton();
            })
            .catch(error => {
                console.log("login error", error);
            });
        event.preventDefault();
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('users', JSON.stringify(nextState.users));
        localStorage.setItem('userList', JSON.stringify(nextState.userList));
    }


    render() {
        const { userName, surname, Email, eventtype, subscribeto, userGroup } = this.state;
        let subscribeToDom = "";
        if (eventtype !== undefined) {
            subscribeToDom = eventtype.map((item) => {
                return (
                    <option key={item.id} value={item.id}>{item.name}</option>
                )
            })
        }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="row d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-success m-2">
                            Submit
                    </button>
                    </div>
                    <div className="row">
                        <table className="table table-borderless usertable">
                            <tbody>
                                <tr>
                                    <td >
                                        User Name :
                                </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={userName}
                                            onChange={(e) => this.handleChange(e, "userName")}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        User Surname :
                                </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={surname}
                                            onChange={(e) => this.handleChange(e, "surname")}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        User Email :
                                </td>
                                    <td>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={Email}
                                            onChange={(e) => this.handleChange(e, "Email")}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr >
                                    <td>
                                        User Group :
                                </td>
                                    <td>
                                        <select value={userGroup} id="userGroup" className="browser-default custom-select"
                                            onChange={(e) => this.handleChange(e, "userGroup")}>
                                            <option value="Admin">Admin</option>
                                            <option value="User">User</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr >
                                    <td>
                                        Subscribe To :
                                 </td>
                                    <td>
                                        <select value={subscribeto} id="subscribeTo" className="browser-default custom-select" multiple
                                            onChange={(e) => this.handleChange(e, "subscribeto")}>
                                            {subscribeToDom}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddUser;