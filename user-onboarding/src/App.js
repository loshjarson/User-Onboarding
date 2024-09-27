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
        <ul style={{listStyle: 'none'}}>
          {users.map(user=>{
          return(<UserList user={user} key={user.name}/>)
        })}
        </ul>
        
        
      </header>
    </div>
  );
}

export default App;
