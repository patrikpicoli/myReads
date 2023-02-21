import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input';
import Book from './Book'

import PropTypes from 'prop-types'

export default class Search extends Component {

  static propTypes = {
    bookList: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
  }

  render() {

    const { bookList, query, update, shelf, changeShelf, section } = this.props

    return (

      <div className="search-books">

        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>

          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              value={ query }
              placeholder="Search by title or author"
              onChange={(event) => update(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">

            { bookList.map(book =>
              <Book
              key={ book.id }
              thisBook={book}
              shelf={shelf}
              changeShelf={changeShelf}
              section={section}
              />
            )}

          </ol>
        </div>
      </div>
    )
  }
}
