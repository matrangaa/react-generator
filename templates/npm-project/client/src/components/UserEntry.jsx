import React from 'react';

class UserEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const user = this.props.user;
    e.preventDefault();
    if (e.target.id === 'edit') {
      this.props.selectUser(user);
    }
    if (e.target.id === 'delete') {
      this.props.deleteUser(user);
    }
    if (e.target.id === 'view') {
      this.props.getById(user.id);
    }
  }

  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <button type="button" id="view" onClick={this.handleClick}>View</button>
          <button type="button" id="edit" onClick={this.handleClick}>Edit</button>
          <button type="button" id="delete" onClick={this.handleClick}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default UserEntry;