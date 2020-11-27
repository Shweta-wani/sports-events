import React, { Component } from 'react';

const UserProfile = (props) => {
    let { value, index } = props;
    return (
        <table className="table table-borderless usertable">
            <tbody>
                <tr key={index + value.name} >
                    <td >
                        User Name :
                    </td>
                    <td>
                        <input type="text" className="form-control" value={value.name} readOnly />
                    </td>
                </tr>
                <tr key={index + value.surname} >
                    <td>
                        User Surname :
                    </td>
                    <td>
                        <input type="text" className="form-control" value={value.surname} readOnly />
                    </td>
                </tr>
                <tr key={index + value.Email} >
                    <td>
                        User Email :
                    </td>
                    <td>
                        <input type="text" className="form-control" value={value.Email} readOnly />
                    </td>
                </tr>
                <tr key={index + value.userGroup} >
                    <td>
                        User Group :
                    </td>
                    <td>
                        <input type="text" className="form-control" value={value.userGroup} readOnly />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default UserProfile;