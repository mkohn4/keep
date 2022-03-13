import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_TODO, UPDATE_TODO } from '../utils/mutations';
import Auth from '../utils/auth';

const ToDo = ({ toDos }) => {

  //set removeToDo as the mutation REMOVE_TODO
  const [removeToDo] = useMutation(REMOVE_TODO);
  const [updateToDo] = useMutation(UPDATE_TODO);
  const [updateText, setUpdateText] = useState('');
  //get user token from auth function
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return <h3>Please Login to Add To-Dos</h3>
  } else if     //if no Todos returned, return this h3
    (!toDos.length) {
    return <h3 className='text-center'>No To-Dos Yet!</h3>
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
      return window.location.reload();
    } catch (err) {
      //else console log error if unsuccessful
      console.error(err);
    }

  };

  const handleUpdateToDo = async (toDoId, toDoText) => {
    //if no token do return out of function
    if (!token) {
      return false;
    }
    //try to async remove the todo by passing in the toDoId param to match _id in db
    console.log(toDoText);
    try {
      await updateToDo({
        variables: { _id: toDoId, text: toDoText, done: false }
      });
      return window.location.reload();
    } catch (err) {
      //else console log error if unsuccessful
      console.error(err);
    }
  }



  return (

    <div>
      <div className="m-1 row justify-content-around">
        {/*  */}
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <h4 className="card-header bg-dark text-light d-flex align-items-center">
              To Do
            </h4>
            <ul id="list-toDo" className="list-group list-group-flush">
              {toDos.map((toDo) => (
                <>
                  <li className='list-group-item d-flex justify-content-between align-items-center' key={toDo._id}>
                    <span className="text" data-bs-toggle="modal" data-bs-target="#update-modal" data-id={toDo.id} > {toDo.text}</span>
                    {/* <span className="bonus-text"> from {toDo.createdAt}</span> */}
                    <br />
                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="update-modal" tabIndex="-1" aria-labelledby="update-modal" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="update-modal">Modify Task</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="form-group" id={toDo._id}>
                                <label htmlFor="modalTaskDescription">Task description</label>
                                <textarea className="form-control" id="modalTaskDescription" onChange={(e) => setUpdateText(e.target.value)} />
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button className="btn btn-add" onClick={() => handleUpdateToDo(toDo._id, updateText)}>Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <button className="btn btn-light btn-sm m-1" data-bs-toggle="modal" data-bs-target="#update-modal" data-id={toDo.id} >Update task</button>
                      <button onClick={() => handleDeleteToDo(toDo._id)} id="remove-tasks" data-bs-toggle='modal' className="btn btn-success m-1 btn-sm"><span className="oi oi-task mr-2"></span>Done</button>
                    </div>
                  </li>
                </>

              ))}

            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ToDo;