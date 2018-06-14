import React from 'react';
import UserEntry from './UserEntry';

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getData();
  }

  render() {
    if (this.props.users.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((u) =>
              <UserEntry key={u.id} user={u} deleteUser={this.props.deleteUser} getById={this.props.getById} selectUser={this.props.selectUser} />
            )}
          </tbody>
        </table>
      );
    } else {
      return (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>        
            </tr>
          </thead>
        </table>
      );
    }
  }
}

export default UsersTable;