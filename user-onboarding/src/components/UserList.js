import React from 'react'



const Userlist = props => {
    const {name,userId,email,createdAt} = props.user;
    
    return(
        <li>
            <h2>{name}</h2>
            <p>User ID:{userId}</p>
            <p>Email:{email}</p>
            <p>Created:{createdAt}</p>
        </li>
    )
}

export default Userlist