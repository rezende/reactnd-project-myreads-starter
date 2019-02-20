import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    wantToRead: [],
    currentlyReading: [],
    read: [],
    none: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }
  removeFromShelf(book, shelf) {
    const bookId = book.id
    return shelf.filter(b => b.id !== bookId)
  }
  changeBookShelf = (book, shelf) => {
    const newShelf = shelf
    this.state[newShelf].push(book)
    const previousShelf = book.shelf
    if (previousShelf !== undefined) {
      this.setState((previousState) => {{
        let obj = {}
        obj[previousShelf] = this.removeFromShelf(book, previousState[previousShelf])
        return obj
      }})
    }
    BooksAPI.update(book, shelf)
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
          read: books.filter((book) => book.shelf === 'read'),
          currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
        })
      })
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                  title='Currently Reading'
                  books={this.state.currentlyReading}
                  changeBookShelf={this.changeBookShelf}
                />
                <BookShelf 
                  title='Want To Read'
                  books={this.state.wantToRead}
                  changeBookShelf={this.changeBookShelf}
                />
                <BookShelf 
                  title='Read'
                  books={this.state.read}
                  changeBookShelf={this.changeBookShelf}
                />
              </div>
            </div>
            <div className='open-search'>
              <Link to='/search'>
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
          <SearchBooks 
            changeBookShelf={this.changeBookShelf}
          />
        )} /> 
      </div>
    )
  }
}

export default BooksApp
