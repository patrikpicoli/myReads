import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

let bookStatus = null
class Book extends Component {

  state = {
    bookState: this.props.statusRead
  }

  handleChange(e, thisBook) {
    bookStatus = e.target.value
    const bookId = thisBook.id

    BooksAPI.update(bookId, bookStatus).then(
      console.log('Updated....')
    )
  }

  render() {

    const { thisBook, select, shelf, statusRead } = this.props

    return  statusRead === shelf ?
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url("+ thisBook.imageLinks.smallThumbnail +")" }}></div>
            <div className="book-shelf-changer">
              <select onChange={ e => this.handleChange(e, thisBook) }>
                <option value="move" disabled>Move to...</option>
                {select.map(maped =>
                  <option key={maped} value={maped} > {maped}</option>
                )}
              </select>
            </div>
          </div>
          <div className="book-title">{ thisBook.title }</div>
          <div className="book-authors">{ thisBook.authors }</div>
        </div>
      </li>
      :
      ''
  }
}

export default Book

