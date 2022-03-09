import React from 'react';
import { useMutation } from '@apollo/client';

import {REMOVE_TODO} from '../utils/mutations';
import Auth from '../utils/auth';

const ToDo = ({toDos}) => {

    //set removeToDo as the mutation REMOVE_TODO
    const [removeToDo] = useMutation(REMOVE_TODO);

    if (!toDos.length) {
        return <h3>No To-Dos Yet!</h3>
    }


// create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteToDo = async (toDoId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeToDo({
        variables: { _id: toDoId }
      });
      // upon success, remove book's id from localStorage
      //removeBookId(bookId);
    } catch (err) {
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