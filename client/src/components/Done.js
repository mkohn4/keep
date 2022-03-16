import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_TODO, UPDATE_TODO, UPDATE_DONE } from '../utils/mutations';
import Auth from '../utils/auth';

const Done = (props) => {
  const { toDoId, text, done } =
    props;
  const { loading, data } = useQuery(QUERY_ME);
  const toDos = data?.me.toDo || [];
  // set state to pass text and id to mutations
  // const [toDoId, setToDoId] = useState('');
  const [toDoText, setToDoText] = useState('');
  //set removeToDo as the mutation REMOVE_TODO
  const [removeToDo] = useMutation(REMOVE_TODO, { refetchQueries: [QUERY_ME] });
  const [updateToDo] = useMutation(UPDATE_TODO, { refetchQueries: [QUERY_ME] });
  const [updateDone] = useMutation(UPDATE_DONE, { refetchQueries: [QUERY_ME] });
  //get user token from auth function
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token) {
    return <h3>Please Login to Add To-Dos</h3>
  } else if     //if no Todos returned, return this h3
    (!toDos.length) {
    return <h3 className='text-center'>No To-Dos Yet!</h3>
  }
  //state to set value to selected To Do's id
  const passId = (event) => {
    const toDoUpdateText = event.target.innerText
    // const toDoId = event.target.id;
    // setToDoId(toDoId);
    setToDoText(toDoUpdateText)
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setToDoText(value);
  }
  // create function to handle saving a todo to our database
  const handleUpdateToDo = async (event) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    //if user not logged in, return out
    if (!token) {
      return <h3>Please Login to Add To-Dos</h3>;
    }
    try {
      //update todo to DB by passing toDoUpdate state variable as text attribute
      await updateToDo({ variables: { _id: toDoId, text: toDoText } })
    } catch (err) {
      console.log('we got an error bud');
      console.error(err);
    }
    //clear ToDo Input value of state
    setToDoText('');
    // setToDoId('');
  };

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
  }

  const handleUpdateDone = async (toDoId) => {

    //if no token do return out of function
    if (!token) {
      return false;
    }

    //try to async remove the todo by passing in the toDoId param to match _id in db
    try {
      await updateDone({
        variables: { _id: toDoId, done:true }
      });

    } catch (err) {
      //else console log error if unsuccessful
      console.error(err);
    }
  }

  return (
    <>
      <li className='list-group-item d-flex justify-content-between align-items-center' >
        <span className="text" data-bs-toggle="modal" data-bs-target="#update-modal" onClick={passId} value={toDoId} key={toDoId} id={toDoId}> {text} </span>
        {/* <span className="bonus-text"> from {toDo.createdAt}</span> */}
        <br />
        {/* <!-- Modal --> */}
        <div className="modal fade" id="update-modal" tabIndex="-1" role="dialog" aria-labelledby="update-modal" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="update-modal">Modify Task</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="modalTaskDescription">Task description</label>
                    <textarea className="form-control" id="modalTaskDescription" onChange={handleInputChange} value={toDoText}></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type='button' className="btn btn-add" onClick={() => handleUpdateToDo(toDoId, toDoText)} data-bs-toggle='modal' data-bs-target='update-modal'>Save changes</button>
                <button type='button' onClick={() => handleDeleteToDo(toDoId)} id="update-modal" data-bs-toggle='modal' data-bs-target='update-modal' className="btn btn-danger m-1"><span className="oi oi-trash mr-2"></span>Delete Task</button>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          {/* <button onClick={() => handleUpdateDone(toDoId)} id="update-modal" className="btn btn-success m-1 btn-sm"><span className="oi oi-task"></span></button> */}
          <button onClick={() => handleDeleteToDo(toDoId)} id="update-modal" className="btn btn-danger m-1 btn-sm"><span className="oi oi-trash"></span></button>
        </div>
      </li>
    </>
        /*
            <div className="col-12 col-md-6 col-xl-3 mb-3">
              <div className="card">
                <h4 className="card-header bg-dark text-light d-flex align-items-center">
                  In Progress
                </h4>
                <ul id="list-inProgress" className="list-group list-group-flush">
                </ul>
              </div>
            </div> */
        /*  */
        // <div className="col-12 col-md-6 mb-3">
        // <div className="card">
        //     <h4 className="card-header bg-dark text-light d-flex align-items-center">
        //       Done
        //     </h4>
        //     <ul id="list-done" className="list-group list-group-flush">
        //     {toDos.filter(toDo => (toDo.done === true)).map(toDo => (
        //         <>
        //           <li className='list-group-item d-flex justify-content-between align-items-center' >
        //             <span className="text" data-bs-toggle="modal" data-bs-target="#update-modal" onClick={passId} value={toDoId} key={toDo._id} id={toDo._id}> {toDo.text} </span>
        //             {/* <span className="bonus-text"> from {toDo.createdAt}</span> */}
        //             <br />
        //             {/* <!-- Modal --> */}
        //             <div className="modal fade" id="update-modal" tabIndex="-1" role="dialog" aria-labelledby="update-modal" aria-hidden="true">
        //               <div className="modal-dialog modal-dialog-centered" role="document">
        //                 <div className="modal-content">
        //                   <div className="modal-header">
        //                     <h5 className="modal-title" id="update-modal">Modify Task</h5>
        //                     <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
        //                       <span aria-hidden="true">×</span>
        //                     </button>
        //                   </div>
        //                   <div className="modal-body">
        //                     <form>
        //                       <div className="form-group">
        //                         <label htmlFor="modalTaskDescription">Task description</label>
        //                         <textarea className="form-control" id="modalTaskDescription" onChange={handleInputChange} value={toDoText}></textarea>
        //                       </div>
        //                     </form>
        //                   </div>
        //                   <div className="modal-footer">
        //                     <button type='button' className="btn btn-add" onClick={() => handleUpdateToDo(toDoId, toDoText)} data-bs-toggle='modal' data-bs-target='update-modal'>Save changes</button>
        //                     <button type='button' onClick={() => handleDeleteToDo(toDoId)} id="update-modal" data-bs-toggle='modal' data-bs-target='update-modal' className="btn btn-danger m-1"><span className="oi oi-trash mr-2"></span>Delete Task</button>
        //                   </div>
        //                 </div>
        //               </div>
        //             </div>
        //             <div className='d-flex justify-content-center'>
        //               <button onClick={() => handleDeleteToDo(toDo._id)} id="update-modal" className="btn btn-danger m-1 btn-sm"><span className="oi oi-trash"></span></button>
        //             </div>
        //           </li>
        //         </>
        //       ))}
        //     </ul>
        //   </div>
        // </div>
      // </div>
      /* <button id="create-task" className="btn btn-block btn-add" data-toggle="modal" data-target="#task-form-modal">
        <span className="oi oi-plus mr-2"></span>
        Add Task
      </button>
      <button id="remove-tasks" className="btn btn-block btn-delete mb-2 mb-md-4">
        <span className="oi oi-trash mr-2"></span>
        Delete All Tasks
      </button> */
    // </div >
  );
}
export default Done;