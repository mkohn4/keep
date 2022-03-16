import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Footer from '../components/Footer';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TODO } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import ToDo from '../components/ToDo';
import Done from '../components/Done';

const Home = () => {

  // create state for holding our search field data
  const [toDoInput, setToDoInput] = useState('');
  //useQuery for querying users to-dos
  const { loading, data } = useQuery(QUERY_ME);
  //set toDos = returned data from me query in toDo array of user
  const toDos = data?.me.toDo || [];
  //create const of addToDo that holds ADD_TODO mutation
  const [addToDo] = useMutation(ADD_TODO);


  const handleInputChange = (event) => {
    const { value } = event.target;
    setToDoInput(value);
  }

  // create function to handle saving a todo to our database
  const handleAddToDo = async (event) => {

    event.preventDefault();
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    //if user not logged in, return out
    if (!token) {
      return <h3>Please Login to Add To-Dos</h3>;
    }

    try {
      //add todo to DB by passing toDoInput state variable as text attribute
      await addToDo({ variables: { text: toDoInput } })
    } catch (err) {
      console.log('we got an error bud');
      console.error(err);
    }
    //clear ToDo Input value
    setToDoInput('');

  };


  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <Jumbotron fluid className='col-12 col-lg-9 d-flex flex-column h-auto'>
      <Container>
        <div className="modal fade" id="task-form-modal" tabIndex="-1" role="dialog" aria-labelledby="task-form-modal"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="task-form-modal">Add New Task</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="modalTaskDescription">Task description</label>
                    <textarea className="form-control" id="modalTaskDescription" onChange={handleInputChange} value={toDoInput}>{toDoInput}</textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-close" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-save" data-bs-toggle='modal' data-bs-target='task-form-modal' onClick={handleAddToDo}>Save Task</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container>
      <div className="m-1 row justify-content-around">
        {/*  */}
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <h4 className="card-header bg-dark text-light d-flex align-items-center">
              To Do
            </h4>
            <ul id="list-toDo" className="list-group list-group-flush">
          {toDos.filter(toDo => (toDo.done === false)).map((toDo) => {
            return (
              <ToDo
                key={toDo._id}
                toDoId={toDo._id}
                text={toDo.text}
                done={toDo.done}
              />
             );
            })}
            </ul>
          </div>
        </div>
      </div>
      <div className="m-1 row justify-content-around">
        {/*  */}
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <h4 className="card-header bg-dark text-light d-flex align-items-center">
              Done
            </h4>
            <ul id="list-toDo" className="list-group list-group-flush">
          {toDos.filter(toDo => (toDo.done === true)).map((toDo) => {
            return (
              <Done
                key={toDo._id}
                toDoId={toDo._id}
                text={toDo.text}
                done={toDo.done}
              />
             );
            })}
            </ul>
          </div>
        </div>
      </div>
      </Container>
    </Jumbotron>
  );
};

export default Home;
