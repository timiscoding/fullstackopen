import { gql } from "@apollo/client";
/* Apollo caching needs to store the id so that it can use it for when the query path is not enough
to determine if 2 queries would return the same query result tree.

An exmple would be when an author is fetched then later updated. A fetch query path could look like
RootQuery -> allAuthors -> born and an update to it would look like RootMutation -> editAuthor(name:
"Alice") -> born Because the query paths are different, it would not know how to cache it if there
wasn't an id associated with the objects

see https://www.apollographql.com/blog/the-concepts-of-graphql-bc68bd819be3
*/
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
    }
  }
`;
