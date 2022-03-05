import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me{
            _id
            username
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;