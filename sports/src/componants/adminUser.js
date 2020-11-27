import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import $ from 'jquery';

class AdminUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: this.props.userList
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentWillMount() {
        localStorage.getItem('userList') && this.setState({
            userList: JSON.parse(localStorage.getItem('userList')),
            isLoading: false
        })
    }

    componentDidMount() {
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

    handleDelete = (userId) => {
        let { userList } = this.state
        axios
            .delete(
                "http://localhost:3000/users/" + userId,
                {
                    id: userId
                },
                { credentials: 'include' },
                { withCredentials: true }
            )
            .then(response => {
                userList = userList.filter(value => parseInt(value.id) !== parseInt(userId))
                this.setState({ userList })
            })
            .catch(error => {
                console.log("login error", error);
            });
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('userList', JSON.stringify(nextState.userList));
    }

    render() {
        let { userList } = this.state;

        let showUserList = userList.map((item, index) => {
            return (
                <tbody key={item.id + index}>
                    <tr key={item.name}>
                        <td key={item.name + index}>
                            {item.name} {item.surname}
                        </td>
                        <td key={item.Email + index}>
                            {item.Email}
                        </td>
                        <td key={item.userGroup + index}>
                            {item.userGroup}
                        </td>
                        <td key={item.subscribeTo + index}>
                            {item.subscribeTo.join()}
                        </td>
                        <td key={item.id + 'delete'}>
                            <i className="fas fa-trash-alt m-2"
                                aria-hidden="true"
                                onClick={(e) => this.handleDelete(item.id)}>
                            </i>
                        </td>
                        <td key={item.id + 'update'}>
                            <i
                                className="fas fa-user-edit m-2"
                                aria-hidden="true"
                                onClick={(e) => this.props.updateUser(item.id, item)}
                            >
                            </i>
                        </td>
                    </tr>
                </tbody>
            );
        })

        return (
            <div>
                <table className="table table-bordered eventtable">
                    <thead>
                        <tr>
                            <th><label>User Name </label> </th>
                            <th><label>Email </label> </th>
                            <th><label>Group</label> </th>
                            <th><label>Subscribe To </label> </th>
                            <th><label>Delete User</label> </th>
                            <th><label>Update User</label> </th>
                        </tr>
                    </thead>
                    {showUserList}
                </table>
            </div>
        );
    }
}

export default AdminUser;