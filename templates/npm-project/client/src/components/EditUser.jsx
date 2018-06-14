import React from 'react';

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      id: undefined,
      email: undefined,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillMount() {
    const { email, id, name } = this.props.selectedUser;
    this.setState({ email, id, name });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, id, name } = this.state;
    const userInfo = { email, name };
    fetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userInfo),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then(() => this.props.setEdit())
    .catch(e => console.log(e, 'Error updating user'));
  }

  handleUpdate(e) {
    if (e.target.id === 'name') {
      let name = e.target.value;
      this.setState({ name });
    }
    if (e.target.id === 'email') {
      let email = e.target.value;
      this.setState({ email });
    }
  }

  render() {
    return (
      [
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name*: </label>
            <input type="text" id="name" placeholder="Name" onChange={this.handleUpdate} required value={this.state.name}></input>
          </div>
          <div>
            <label htmlFor="email">Email*: </label>
            <input type="email" id="email" placeholder="example@domain.com" onChange={this.handleUpdate} required value={this.state.email}></input>
          </div>
          <div>
            <small>* = required</small>
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
          <div>
            <button type="button" onClick={this.props.setEdit}>Cancel</button>
          </div>
        </form>
      ]
    );
  }
}

export default EditUser;