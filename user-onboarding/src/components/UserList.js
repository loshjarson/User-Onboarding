import React, { useImperativeHandle } from 'react'

const Userlist = props => {
    const {user} = props;
    
    return(
        <div>
            <h2>{user.name}</h2>
            <p>User ID:{user.id}</p>
            <p>Email:{user.email}</p>
            <p>Created:{user.createdAt}</p>
        </div>
    )
}

export default Userlist