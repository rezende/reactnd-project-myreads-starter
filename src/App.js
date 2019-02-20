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
  }
  getShelf = (book) => {
    // If it's a user's book, it will have a shelf 
    // property
    if (book.shelf !== undefined) {
      return book.shelf
    }
    // If it comes from the search results we need
    // to check if it's already on the user's library
    // to display the right option on the dropdown on 
    // the search results.
    const bookId = book.id
    return (
      this.state.wantToRead.filter((b) => b.id === bookId).length > 0 ? 
        "wantToRead" : this.state.currentlyReading.filter((b) => b.id === bookId).length > 0 ? 
          "currentlyReading" : this.state.read.filter((b) => b.id === bookId).length > 0 ? 
            "read" : "none"
    )
  }
  removeFromShelf(book, shelf) {
    const bookId = book.id
    return shelf.filter(b => b.id !== bookId)
  }
  changeBookShelf = (book, newShelf) => {
    if (newShelf !== "none") {
      this.state[newShelf].push(book)
    }
    const previousShelf = book.shelf
    if (previousShelf !== undefined) {
      this.setState((previousState) => {{
        let obj = {}
        obj[previousShelf] = this.removeFromShelf(book, previousState[previousShelf])
        return obj
      }})
    }
    BooksAPI.update(book, newShelf)
    book.shelf = newShelf
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
                  getShelf={this.getShelf}
                />
                <BookShelf 
                  title='Want To Read'
                  books={this.state.wantToRead}
                  changeBookShelf={this.changeBookShelf}
                  getShelf={this.getShelf}
                />
                <BookShelf 
                  title='Read'
                  books={this.state.read}
                  changeBookShelf={this.changeBookShelf}
                  getShelf={this.getShelf}
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
            getShelf={this.getShelf}
          />
        )} /> 
      </div>
    )
  }
}

export default BooksApp
