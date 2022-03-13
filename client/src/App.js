import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import About from './components/About';

const token = localStorage.getItem('id_token');

const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {!token ? (
          <header bg='dark' variant='dark' expand='lg' className="col-12  bg-dark text-light sticky-top d-flex flex-column p-4 p-lg-3">
            <div>
              <h1 className='text-center'><span className="oi oi-task d-inline mr-1"></span>KEEP ( PRO EDITION ) </h1>
              <br />
              <h4 className='text-center' style={{ fontFamily: 'calibri' }}>Good order is the foundation of all things.</h4>
              <h5 className='text-center' style={{ fontFamily: 'calibri', fontWeight: 'lighter' }}>Login or sign up to start managing your tasks! </h5>
            </div>
            <LoginForm />
            <SignupForm />
          </header>

        ) : (<>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
        )
        }
      </Router >
    </ApolloProvider >
  );
}

export default App;
