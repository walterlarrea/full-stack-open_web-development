import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      bookCount,
      name,
      born,
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      genres
      title
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      author
      published
      genres
      title
      id
    }
  }
`
