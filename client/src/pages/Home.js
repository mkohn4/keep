import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TODO } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import ToDo from '../components/ToDo';

const Home = () => {

  // create state for holding our search field data
  const [toDoInput, setToDoInput] = useState('');
  //useQuery for querying users to-dos
  const { loading, data } = useQuery(QUERY_ME);
  //set toDos = returned data from me query in toDo array of user
  const toDos = data?.me.toDo || [];
  //create const of addToDo that holds ADD_TODO mutation
  const [addToDo] = useMutation(ADD_TODO);



  // create function to handle saving a todo to our database
  const handleAddToDo = async (event) => {

    event.preventDefault();
    console.log(toDoInput);

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
    setToDoInput('')
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Add Your To-Dos!</h1>
          <Form onSubmit={handleAddToDo}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='toDoInput'
                  value={toDoInput}
                  onChange={(e) => setToDoInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='What do you need to do?'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Add
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <ToDo
            toDos={toDos}></ToDo>
        )}
      </Container>
    </>
  );
};

export default Home;
