
import React from 'react'
import Person from './Person'

import  { Component } from 'react'
import UserContainer from './UserContainer'
import CreateUser from './CreateUser'

export default class Practice extends Component {
  state ={
    userData :[
      {
        name:'jhon',
        age:24
      },
      {
        name:'Jill',
        age:26
      },
      {
        name:'jhJackon',
        age:28
      },

    ]
    
  }

    removeUser =(index)=>{
      const {userData} =this.state;
    const data=  userData.filter((value , i)=>{
        return  index !=i
    })

    this.setState({userData:data});
   }
  render() {
      const {userData} =this.state
   
    return (
      <div>
         <UserContainer  users={userData} removeUser={this.removeUser} />
       
      </div>
    )
  }
}

