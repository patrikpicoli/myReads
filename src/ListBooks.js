import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

export default class ListBooks extends Component {

  static propTypes = {
    listBooksApi: PropTypes.array.isRequired,
    section: PropTypes.array.isRequired
  }

  state = {
    readed: 'None'
  }

  componentDidUpdate() {
    console.log('Rodei lista no did')
  }

  render() {

    const { listBooksApi, section } = this.props
    console.log("Rodei a lista")

    return (
      <div className="list-books-content">
        {section.map((shelf, key) =>
          <div key={key} className="bookshelf">
            <h2 className="bookshelf-title">{ shelf }</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {listBooksApi.map(book =>
                  <Book
                    key={ book.id }
                    thisBook={book}
                    select={section}
                    statusRead={this.state.readed}
                    shelf={shelf}
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