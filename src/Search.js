import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';
import PropTypes from 'prop-types'

export default class Search extends Component {

  static propTypes = {
    bookList: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
  }

  render() {

    const { bookList, query, update, changeShelf, section } = this.props

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
            onChange={(event) => update(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { bookList.map(book =>
              <li key={ book.id }>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: "url("+ book.imageLinks.smallThumbnail +")"
                    }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={ e => changeShelf(e, book) } value={book.shelf}>
                        <option value="move" disabled>Move to...</option>
                        { section.map(shelf =>
                          <option key={ shelf.shelf } value={ shelf.shelf } > { shelf.titleShelf }</option>
                          ) }
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
    )
  }
}
