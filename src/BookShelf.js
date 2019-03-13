import React from 'react'
import Book from './Book'

function BookShelf(props) {
    const {books, title, changeBookShelf, getShelf} = props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book 
                book={book}
                key={book.id}
                changeBookShelf={changeBookShelf}
                getShelf={getShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    )
}

export default BookShelf
