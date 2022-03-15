import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TODO = gql`
mutation addToDo($text: String!) {
  addToDo(text: $text){
      _id
      username
      toDo {
        _id
        text
        createdAt
        updatedAt
        done
     }
  }
}`;

export const REMOVE_TODO = gql`
mutation removeToDo($_id: ID!) {
  removeToDo(_id: $_id){
      _id
      username
      toDo {
        _id
        text
        createdAt
        updatedAt
        done
     }
  }
}`;

export const UPDATE_TODO = gql`
mutation updateToDo($_id:ID!,$text:String, $done:Boolean) {
  updateToDo(_id:$_id, text: $text, done:$done) {
      _id
      text
      done
      createdAt
      updatedAt
	}
}`;

export const UPDATE_DONE = gql`
mutation updateDone($_id: ID!, $done: Boolean ) {
  updateDone(_id: $_id, done: $done){
        _id
        text
        createdAt
        updatedAt
        done
  }
}`;