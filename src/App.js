import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Search from './Search'

import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    searchBook: [],

    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (e, bookTobeUpdated) => {

    // Receive value option selected on book
    const shelf = e.target.value;

    // tmp array to receive book that was change selection
    let updatedBooks = [];

    // Call API to update Book pass book to be updated and shelf value
    BooksAPI.update(bookTobeUpdated, shelf)
      .then(() => {

        // Change book to selected shelf
        const updatedBook = {
          ...bookTobeUpdated,
          shelf
        }

        const bookSearchTobeUpdated = this.state.searchBook.filter(b => b.id === updatedBook.id)
        bookSearchTobeUpdated.shelf = shelf

        this.setState({ searchBook: this.state.searchBook.map(b =>
            b.id === bookTobeUpdated.id ?
              {
                ...b,
                shelf
              } :
              {
                ...b,
                shelf: 'none'
              }
          )
        })

        // Get all books !== of book selected
        updatedBooks = this.state.books.filter(book => book.id !== updatedBook.id)


        // Change updatedBooks with updated list
        updatedBooks.push(updatedBook)

        // Change state with book updated
        this.setState({ books: updatedBooks })
      });
  };

  updateQuery = (query) => {
    if(query) {
      BooksAPI.search(query).then((books) => {

        if(books.length > 0) {

          const myListbooks = this.state.books

          this.setState({
            searchBook: books.map(book => {
              const bookExists = myListbooks.find(b => b.id === book.id)
              if(bookExists) {
                book.shelf = bookExists.shelf
              } else {
                book.shelf = 'none'
              }
              return book
            }),
            query: query
          })
        }

      })
    } else {
      this.setState({
        searchBook: [],
        query: query
      })
    }
  }

  clearQuery = () => {
    this.setState({
      searchBook: [],
      query: ''
    })
  }

  render() {

    // Books shelf
    const booksSections = [
      {titleShelf: 'Currently Reading', shelf:'currentlyReading'},
      {titleShelf: 'Want to Read', shelf:'wantToRead'},
      {titleShelf: 'Read', shelf:'read'},
      {titleShelf: 'None', shelf:'none'}
    ]

    return (
      <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <ListBooks
                listBooksApi={ this.state.books }
                changeShelf={this.changeShelf}
                section={ booksSections }
              />

              <div className="open-search">
                <Link to="/search" onClick={ this.clearQuery }>Add a book</Link>
              </div>
            </div>
          )} />

          <Route path='/search' render={({ history }) => (
            <Search
            bookList={ this.state.searchBook }
            query={ this.state.query }
            update={ this.updateQuery }
            changeShelf={this.changeShelf}
            section={ booksSections }
            />
          )} />


      </div>
    )
  }
}

export default BooksApp
