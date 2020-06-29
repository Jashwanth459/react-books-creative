import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries'


class BookDetails extends Component{
    constructor(props){
        super(props);
        this.displayBookDetails = this.displayBookDetails.bind(this);
    }
    displayBookDetails() {
        const { book } = this.props.data
        console.log('books is',this.props)
        if(book) {
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className='other-books'>
                        { book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })

                        }
                    </ul>
                </div>
            )
        } else {
            return(
                <p>No book selected.....</p>
            )
        }
    }
    render() {
        return (
            <div id="book-details">
                <p>Output book details here</p>
                {this.displayBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
            return {
                variables: {
                    id: props.bookID
                }
            }
    }
})(BookDetails);
