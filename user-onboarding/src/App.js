import './App.css';
import Form from './components/Form';
import React, { useState } from 'react';
import UserList from './components/UserList'

function App() {
  const [users, setUsers] = useState([])

  return (
    <div className="App">
      <header className="App-header">
        <Form users={users} setUsers={setUsers}/>
        {users.map(user=>{
          return(<UserList user={user} />)
        })}
        
      </header>
    </div>
  );
}

export default App;
