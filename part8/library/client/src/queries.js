import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    id
    title
    author {
      name
      born
    }
    published
    genres
  }
`;

/* Apollo caching needs to store the id so that it can use it for when the query path is not enough
to determine if 2 queries would return the same query result tree.

An exmple would be when an author is fetched then later updated. A fetch query path could look like
RootQuery -> allAuthors -> born and an update to it would look like RootMutation -> editAuthor(name:
"Alice") -> born Because the query paths are different, it would not know how to cache it if there
wasn't an id associated with the objects

see https://www.apollographql.com/blog/the-concepts-of-graphql-bc68bd819be3
*/
export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      ...bookDetails
    }
    allGenres
  }
  ${BOOK_DETAILS}
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
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const RECOMMEND = gql`
  query recommend {
    me {
      favoriteGenre
    }
    recommend {
      title
      author {
        name
      }
      published
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription onBookAdded {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`;
