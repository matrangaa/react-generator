import React from 'react';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.name;
    const email = this.state.email;
    const userInfo = { name, email };
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).then(response => {
      return response.json();
    })
    .catch(e => console.log(e, 'Error posting to /users'));

    this.props.getData();
    this.setState({ name: '', email: '' });
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
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Name*: </label>
          <input type="text" id="name" placeholder="Name" onChange={this.handleUpdate} required value={this.state.name} autoFocus></input>
        </div>
        <div>
          <label htmlFor="email">Email*: </label>
          <input type="email" id="email" placeholder="example@domain.com" onChange={this.handleUpdate} required value={this.state.email}></input>
        </div>
        <div>
          <small>* = required</small>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default AddUser;