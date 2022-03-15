import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import './style.css';
import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg' className="col-12 col-lg-3 bg-dark text-light sticky-top d-flex flex-column p-4 p-lg-3">

        <Navbar.Brand as={Link} to='/' className='mr-0 text-center'>
          <h1><span className="oi oi-task d-inline d-lg-none mr-1"></span>KEEP ( PRO EDITION )</h1>
        </Navbar.Brand>

        <Nav>
          {Auth.loggedIn() ? (
            <>
              <Nav.Link onClick={Auth.logout} className='text-center'>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={() => setShowModal(true)} className='text-center'>Login/Sign Up</Nav.Link>
          )}
        </Nav>
        <br />
        <button id="create-task" className="btn btn-block btn-add" data-bs-toggle="modal" data-bs-target="#task-form-modal">
          <span className="oi oi-plus mr-2"></span>
          Add Task
        </button>
        {/* <button id="remove-tasks" className="btn btn-block btn-delete mb-2 mb-md-4">
          <span className="oi oi-trash mr-2"></span>
          Delete All Tasks
        </button> */}
        <div className='mt-auto'>
          <span className="oi oi-task display-1 text-center mb-2 d-none d-lg-block mt-auto"></span>
          <p className="d-none d-lg-block">“For every minute spent organizing, an hour is earned.” -Anonymous </p>
          <p className="d-none d-lg-block"> “It takes as much energy to wish as it does to plan.” -Eleanor Roosevelt</p>
        </div>

      </Navbar>

      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
