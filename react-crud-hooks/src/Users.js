import React, { useState, useEffect } from 'react'
import AddUserForm from './forms/AddUserForm';
import UserTable from "./tables/UserTable";
import EditUserForm from './forms/EditUserForm'

function Users() {

  //const baseUrl = "http://localhost:8080/users/";

  const baseUrl = "http://18.209.19.166:8081/users";
  

  const [users, setUsers] = useState([]);

  const [editing, setEditing] = useState(false);

  const initialFormState = { id: null, name: '', username: '' };

  const [currentUser, setCurrentUser] = useState(initialFormState);

  useEffect(() => {
		getUsersService();
	}, []);

  function addUser(user) {
    addUserService(user);
  }

  function deleteUser(id) {
    removeUserService(id);
  }

  function editRow(user) {
    setEditing(true)
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  function updateUser(id, user) {
    setEditing(false)
    updateUser.id = id;
    updateUserService(user);
  }

  return (
    <div className="container">
      <h1>Users</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  )

  async function addUserService(user) {
    fetch(baseUrl, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			},
			method: "POST",
			body: JSON.stringify(user)
		})
		.then(response => {
			getUsersService();
		})
  }

  async function getUsersService() {
    fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
        setUsers(data);
    });
  }

  async function removeUserService(id) {
    fetch(baseUrl+id, {
      method: "DELETE"
    })
    .then(response => {
      getUsersService();
    })
  }

  async function updateUserService(user){
    fetch(baseUrl+user.id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(user)
    })
    .then(response => {
      setCurrentUser(user);
      getUsersService()
    })
  }
}

export default Users;
