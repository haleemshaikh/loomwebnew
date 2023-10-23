import React, { Component } from 'react'

export default class CreateUser extends Component {
    initialState={
        name:"",
        age: ""
    }

    state=this.initialState;


  render() {
     const {name,age} =this.initialState;
    return (
      <div className='m-2'>
          <form>
             <div>
             <label htmlFor='' >Name</label>
              <input  type='text' name='name' id='name'  value={name}/>
             </div>

             <div className='m-2'>
             <label htmlFor='' >Age</label>
              <input  type='text' name='age' id='age'  value={age}/>
             </div>

             <div >
           <button className="btn btn-primary" >Submit</button>
           </div>
          </form>
      </div>
    )
  }
}
