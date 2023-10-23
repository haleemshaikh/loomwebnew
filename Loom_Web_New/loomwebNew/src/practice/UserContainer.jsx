import React from 'react'
import UserHeader from './UserHeader'
import UserBody from './UserBody'
import CreateUser from './CreateUser';

function UserContainer(props) {

    console.log(props);

    const {users}=props; //  const users=props.users
    const {removeUser}=props;
   

  return (
    <div  className='container'>
      <UserHeader />
      <UserBody  usersData={users}  rm={removeUser}/>
      <CreateUser />
    </div>
  )
}

export default UserContainer