import React from 'react'

class Book extends React.Component {
  changeShelf(changeBookShelf, book, shelf) {
    changeBookShelf(book, shelf)
  }
  render() {
    const { book, changeBookShelf } = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{width: 140, height: 200, backgroundImage: `url("${book.imageLinks.thumbnail}")`}}></div>
            <div className="book-shelf-changer">
              <select 
                onChange={(e) => (this.changeShelf(changeBookShelf, book, e.target.value))} 
                defaultValue={book.shelf === undefined ? "none" : book.shelf}
              >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.author}</div>
        </div>
      </li>
    )
  }
}

export default Book
