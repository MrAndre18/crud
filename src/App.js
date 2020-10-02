import React, { Component } from 'react';
import Table from './components/table/Table';
//import usersData from './users.json';

class App extends Component {
  state = {
    table : [],
    isEditing : false
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const url = 'http://178.128.196.163:3000/api/records';
    let response = await fetch(url);
    if (response.ok) {
      let json =  await response.json();
      this.setState({
        table: json
      });
    } else {
      alert("Ошибка HTTP: " + response.status);}
  }

  async putData(data) {
    const url = 'http://178.128.196.163:3000/api/records';
    
    let response = await fetch(url, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ data })
      });
    if (response.ok) {
      return true;
    } else {
      alert("Ошибка HTTP: " + response.status);
      return false;
    }
  }

  async postData(data, id) {
    
    const url = `http://178.128.196.163:3000/api/records/${id}`;
    let response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ data })
      });
    if (response.ok) {
      return true;
    } else {
      alert("Ошибка HTTP: " + response.status);
      return false;
    }
  }

  async deleteData(id) {
    const url = `http://178.128.196.163:3000/api/records/${id}`;
    
    let response = await fetch(url, {
        method:'DELETE'
      });
    if (response.ok) {
      return true;
    } else {
      alert("Ошибка HTTP: " + response.status);
      return false;
    }
  }

  /* creationTable() {
    const users = usersData;
    let usersWithID = [];

    users.forEach(element => {
      const user = {
        _id: `f${(+new Date()*(~~(Math.random()*1e8))).toString(16)}key`,
        description: element.description
      }
      usersWithID.push(user);
    });
    return usersWithID;
  } */
  
  addUser = (userDescription) => {
    const users = [...this.state.table];

    const user = {
      _id: `f${(+new Date()*(~~(Math.random()*1e8))).toString(16)}key`,
      data: userDescription
    };

    if(this.putData(user.data)) {
      users.push(user);

      this.setState({
        table: users
      });
    }
  }

  setEditingFlag = (flag) => {
    this.setState({ isEditing: flag });
  }

  editUser = (editedDescription, id) => {
    const users = [...this.state.table];

    users.map(user => 
      user.data = (user._id === id && this.postData(editedDescription, id) ?
                    editedDescription :
                    user.data));

    this.setState({
      table: users
    });
  }

  delUser = (key) => {
    if(this.deleteData(key)) {
      this.setEditingFlag(false);
      const users = [...this.state.table];
      const updatedUsers = users.filter(item => item._id !== key);

      this.setState({ 
        table: updatedUsers
      });
    }
  }

  render() {
    return (
      <div className="container">
        <Table
          users = { this.state.table }
          setEditingFlag = { this.setEditingFlag }
          delUser = { this.delUser }
          addUser = { this.addUser }
          editUser = { this.editUser }
          isEditing = { this.state.isEditing }
        />
      </div>
    );
  }
}

export default App;