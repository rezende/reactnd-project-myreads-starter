import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {
  state = {
    query: '',
    foundBooks: []
  }
  updateQuery = (event) => {
    const query = event.target.value
    this.setState(() => ({
      query: query
    }))
    BooksAPI.search(query).then((books) => {
      this.setState({
        foundBooks: books
      })
    })
  }
  render() {
    const { foundBooks } = this.state
    const { changeBookShelf, getShelf } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {foundBooks !== undefined && foundBooks.error === undefined ? foundBooks.map((book) => (
              <Book 
                book={book}
                key={book.id}
                changeBookShelf={changeBookShelf}
                getShelf={getShelf}
              />
            )) : ""}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
