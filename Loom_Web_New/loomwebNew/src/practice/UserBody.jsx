import React, { useState } from "react";

function UserBody(props) {
  // console.log(props);

    console.log(props.rm);
  //  const
    


  const userTemplate = props.usersData.map((value , index) => {
      const {name, age}=value;
    return (
      <div key={index} className="row border-bottom border-secondary p-2">
        <div className="col">{name}</div>
        <div className="col">{age}</div>
        <div className="col">
          <button className="btn btn-primary"  onClick={()=>{ props.rm(index)}}>Delete</button>
        </div>
      </div>
    );
  });
  
  return <div>
       {userTemplate}
  </div>;
}

export default UserBody;
