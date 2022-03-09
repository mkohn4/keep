import React from 'react';
import { useMutation } from '@apollo/client';

import {REMOVE_TODO} from '../utils/mutations';
import Auth from '../utils/auth';

const ToDo = ({toDos}) => {

    //set removeToDo as the mutation REMOVE_TODO
    const [removeToDo] = useMutation(REMOVE_TODO);
    //if no Todos returned, return this h3
    if (!toDos.length) {
        return <h3>No To-Dos Yet!</h3>
    }


// create function that accepts the book's mongo _id value as param and deletes the todo from the database
  const handleDeleteToDo = async (toDoId) => {
    //get user token from auth function
    const token = Auth.loggedIn() ? Auth.getToken() : null;
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
    


    return (
        <div>
            {toDos.map((toDo) => (
                <ul className='list-group'>
                    <li className='list-group-item d-flex justify-content-between align-items-center' key={toDo._id}>{toDo.text} from {toDo.createdAt}
                        <button onClick={() => handleDeleteToDo(toDo._id)} className='badge'>🗑</button>
                    </li>
                </ul>
            ))}
        </div>
    )
}

export default ToDo;