import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

import './App.css'

class BooksApp extends React.Component {


  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    booksSections: [
      {titleShelf: 'Currently Reading', shelf:'currentlyReading'},
      {titleShelf: 'Want to Read', shelf:'wantToRead'},
      {titleShelf: 'Read', shelf:'read'},
      {titleShelf: 'None', shelf:'none'}
    ],

    showSearchPage: false
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

  render() {

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <ListBooks listBooksApi={ this.state.books } section={ this.state.booksSections } changeShelf={this.changeShelf} />

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
