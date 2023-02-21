import React from 'react'
import Book from './Book'

const ListBooks = props =>
  <div className="list-books-content">
    { props.section.filter(section => section.shelf !== 'none')
      .map((shelf, key) =>
        <div key={key} className="bookshelf">
          <h2 className="bookshelf-title">{ shelf.titleShelf }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">

              {props.listBooksApi.map(book =>

                book.shelf === shelf.shelf ?
                    <Book
                      key={ book.id }
                      thisBook={book}
                      shelf={shelf.shelf}
                      changeShelf={props.changeShelf}
                      section={props.section}
                    />

                  : null
              )}
            </ol>
          </div>
        </div>
      )}
  </div>

export default ListBooks