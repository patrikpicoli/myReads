import React, { Component } from 'react'
import fallbackCover from './icons/fallback-cover.png'

class Book extends Component {

  render() {

    const { thisBook, section, changeShelf } = this.props
    const bookCover = thisBook.imageLinks && thisBook.imageLinks.smallThumbnail ? thisBook.imageLinks.smallThumbnail : fallbackCover

    return (
      <li key={ thisBook.id }>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url('${ bookCover }')`
            }}></div>
            <div className="book-shelf-changer">
              <select onChange={ e => changeShelf(e, thisBook) } value={ thisBook.shelf }>
                <option value="move" disabled>Move to...</option>
                {section.map(shelf =>
                  <option key={ shelf.shelf } value={ shelf.shelf } > { shelf.titleShelf }</option>
                )}
              </select>
            </div>
          </div>
          <div className="book-title">{ thisBook.title }</div>
          <div className="book-authors">{ thisBook.authors }</div>
        </div>
      </li>
    )
  }
}

export default Book

