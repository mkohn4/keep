import React, {useState} from 'react';
import { useMutation } from '@apollo/client';

import {REMOVE_TODO} from '../utils/mutations';
import Auth from '../utils/auth';

const ToDo = ({toDos}) => {

    //set removeToDo as the mutation REMOVE_TODO
    const [removeToDo] = useMutation(REMOVE_TODO);

    //get user token from auth function
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return <h3>Please Login to Add To-Dos</h3>
    } else if     //if no Todos returned, return this h3
        (!toDos.length) {
        return <h3>No To-Dos Yet!</h3>
    }

// create function that accepts the book's mongo _id value as param and deletes the todo from the database
  const handleDeleteToDo = async (toDoId) => {

    //if no token do return out of function
    if (!token) {
      return false;
    }
    //try to async remove the todo by passing in the toDoId param to match _id in db
    try {
      await removeToDo({
        variables: { _id: toDoId }
      });
    } catch (err) {
        //else console log error if unsuccessful
      console.error(err);
    }
  };

  const handleShowUpdate = async (id) => {
      console.log(id)
    let inputValueId = document.getElementById(id);
    inputValueId.setAttribute("style", "display: flex");

      return;
  }

  const handleUpdateToDo = async (id, event) => {
      //id of todo
    console.log(id);
    //value of updated to do
    console.log(event.target.previousSibling.value);
  }
    


    return (
        <div>
            
                <ul className='list-group'>
                {toDos.map((toDo) => (
                    <>
                        <li onClick={() => handleShowUpdate(toDo._id)} className='list-group-item d-flex justify-content-between align-items-center' key={toDo._id}>
                            <span className="text">{toDo.text}</span>
                            <div id={toDo._id} className="hide">
                                <textarea>{toDo.text}</textarea>
                                <button onClick={(event) => handleUpdateToDo(toDo._id, event)}>Update</button>
                            </div>
                            <span className="bonus-text"> from {toDo.createdAt}</span>
                        <button onClick={() => handleDeleteToDo(toDo._id)} className='badge'>🗑</button>
                    </li>
                    </>

                     ))}
                </ul>
           
        </div>
    )
}

export default ToDo;