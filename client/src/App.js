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
           <>
          <LoginForm />
          <SignupForm />
          </>
        ) : ( <>
          <Navbar />
          <Switch>
            <Route exact path='/'> 
           <Home />
            </Route>
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
            </Switch>
        </>
        )}
        
      </Router>
    </ApolloProvider>
  );
}

export default App;
