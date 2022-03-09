import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query getMe{
    me {
              _id
              username
              email
              toDo {
                _id
                createdAt
                updatedAt
                text
                done
              }
    }
  }
`;