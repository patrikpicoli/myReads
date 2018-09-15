import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

export default class ListBooks extends Component {

  static propTypes = {
    listBooksApi: PropTypes.array.isRequired,
    section: PropTypes.array.isRequired
  }

  render() {

    const { listBooksApi, section, changeShelf } = this.props

    return (
      <div className="list-books-content">
        {section.map((shelf, key) =>
          <div key={key} className="bookshelf">
            <h2 className="bookshelf-title">{ shelf.titleShelf }</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {listBooksApi.map(book =>
                  <Book
                    key={ book.id }
                    thisBook={book}
                    shelf={shelf.shelf}
                    changeShelf={changeShelf}
                    section={section}
                    />
                )}
              </ol>
            </div>
          </div>
        )}
      </div>
    )
  }
}