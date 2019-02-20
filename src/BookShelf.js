import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  render() {
    const {books, title, changeBookShelf} = this.props
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
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
