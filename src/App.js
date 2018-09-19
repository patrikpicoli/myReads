import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Search from './Search'

import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    booksSections: [
      {titleShelf: 'Currently Reading', shelf:'currentlyReading'},
      {titleShelf: 'Want to Read', shelf:'wantToRead'},
      {titleShelf: 'Read', shelf:'read'},
      {titleShelf: 'None', shelf:'none'}
    ],

    searchBook: [],

    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (e, bookUpdate) => {
    const shelf = e.target.value;
    let updatedBooks = [];

    // Call API to update Book
    BooksAPI.update(bookUpdate, shelf)
      .then(res => {

        // Change bookShelf to selected shelf
        bookUpdate.shelf = shelf

        // Get all books !== of book selected
        updatedBooks = this.state.books.filter(book => book.id !== bookUpdate.id)

        // Change updatedBooks with updated list
        updatedBooks.push(bookUpdate)

        // Change state with book updated
        this.setState({ books: updatedBooks })
      });
  };

  updateQuery = (query) => {
    if(query) {
      BooksAPI.search(query).then((books) => {
        books.length > 0 ?
          this.setState({
            searchBook: books,
            query: query
          }) :
          this.setState({
            searchBook: [],
            query: query
          })
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

    return (
      <div className="app">

          <Route path='/search' render={({ history }) => (
            <Search
            bookList={ this.state.searchBook }
            query={ this.state.query }
            update={ this.updateQuery }
            changeShelf={this.changeShelf}
            section={ this.state.booksSections }
            />
          )} />

          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <ListBooks
                listBooksApi={ this.state.books }
                section={ this.state.booksSections }
                changeShelf={this.changeShelf}
              />

              <div className="open-search">
                <Link to="/search" onClick={ this.clearQuery }>Add a book</Link>
              </div>
            </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
