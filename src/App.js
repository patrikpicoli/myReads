import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import escapeRegExp from 'escape-string-regexp'

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

    showSearchPage: false,
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
    BooksAPI.search(query).then(
      console.log(query)
    )
    this.setState({ query: query.trim() })
  }

  render() {

    const { query, books } = this.state
    let bookListed

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      bookListed = books.filter((book) => match.test(book.title))
    } else {
      bookListed = books
    }

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text"
                  value={query}
                  placeholder="Search by title or author"
                  onChange={(event) => this.updateQuery(event.target.value)}
                  />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {bookListed.map(book =>
                  <li key={ book.id }>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{
                          width: 128,
                          height: 193,
                          backgroundImage: "url("+ book.imageLinks.smallThumbnail +")"
                        }}></div>
                        <div className="book-shelf-changer">
                          <select onChange={ e => this.changeShelf(e, book) } value={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            {this.state.booksSections.map(shelf =>
                              <option key={ shelf.shelf } value={ shelf.shelf } > { shelf.titleShelf }</option>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{ book.title }</div>
                      <div className="book-authors">{ book.authors }</div>
                    </div>
                  </li>
                  )}
              </ol>
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
