import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import UserProfile from "./userProfile";
import Events from "./events";
import AdminUser from "./adminUser";
import AddUser from "./addUser";
import UpdateUser from "./updateUser";

const CSS = {
  loggeduser: 'loggeduser',
  menu: 'menu',
  profile: 'profile'
}

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: this.props.users,
      userList: this.props.userList,
      eventList: "show"
    };
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu() {
    if (this.state.openMenu === false) {
      this.setState({ openMenu: !this.state.openMenu });
    }
    else {
      this.setState({ openMenu: !this.state.openMenu })
    }
  }

  updateUser = (userId) => {
    this.handelDisplay('updateUser');
    this.setState({ selectedUserId: userId });
  }

  handelDisplay = (status) => {
    this.setState({
      userProfile: "hide",
      eventList: "hide",
      manageUser: "hide",
      addUser: "hide",
      updateUser: "hide",
      openMenu: false,
    });
    switch (status) {
      case "userProfile":
        this.setState({
          userProfile: "show"
        });
        break;
      case "eventList":
        this.setState({
          eventList: "show"
        });
        break;
      case "manageUser":
        this.setState({
          manageUser: "show"
        });
        break;
      case "addUser":
        this.setState({
          addUser: "show"
        });
        break;
      case "updateUser":
        this.setState({
          updateUser: "show"
        });
        break;
      default:
        this.setState({
          eventList: "show"
        });
    }
  }

  render() {
    let { users, updateUser, userList, selectedUserId, userProfile, addUser, eventList, manageUser, openMenu } = this.state;
    let user = "";

    if (users !== undefined) {
      user = users.map((value, index) => {
        return (
          <div key={value.id}>
            Hallo {value.name} {" "}
            <i
              className="fas fa-user m-2"
              color="#2980B9"
              size="2rem"
              onClick={this.openMenu}>
            </i>
            {openMenu ?
              <ul className={CSS.menu}>
                <li key="userprofile" onClick={(e) => this.handelDisplay('userProfile')}>User Profile</li>
                <li key="eventlist" onClick={(e) => this.handelDisplay('eventList')}>Show Events</li>
              </ul> : null
            }
            {value.userGroup.toLowerCase() === "admin" ?
              <div className="container">
                <div className="row m-4">
                  <button
                    type="submit"
                    className="btn btn-success m-2"
                    onClick={(e) => this.handelDisplay('manageUser')}
                  >Manage User</button>
                  <button
                    type="submit"
                    className="btn btn-success m-2"
                    onClick={(e) => this.handelDisplay('addUser')}
                  >Add User</button>
                </div>
              </div> : null
            }
            {manageUser === "show" ?
              <AdminUser userList={userList} updateUser={(e) => this.updateUser(e)} /> : null
            }
            {addUser === "show" ?
              <AddUser userList={userList} /> : null
            }
            {userProfile === "show" ?
              <UserProfile value={value} index={index} /> : null
            }
            {eventList === "show" ?
              <Events value={value} index={index} /> : null
            }
            {updateUser === "show" ?
              <UpdateUser userId={selectedUserId} userList={userList} /> : null
            }
          </div>
        )
      });
    }
    return (
      <div className={CSS.loggeduser}>
        {user}
      </div>
    );
  }
}

export default Users;
