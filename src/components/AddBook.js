import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { getAuthorsQuery, getBooksQuery, addBookMutation} from '../queries/queries'

class AddBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }
    displayAuthors() {
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return(
                <option>Loading authors...!</option>
            );
        } else {
            return data.authors.map((author) => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            } )
        }
    }
    displayBooks() {
        var data = this.props.data;
        if(data.loading){
            return(
                <div>
                    Loading books....!
                </div>
            )
        } else {
            return data.books.map((book) => {
                return (
                    <li key={book.id}>
                        {book.name}
                    </li>
                )
            })
        }
    }
    submitForm(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
        console.log('this.state ', this.state);
    }

    render() {
        console.log('this.props', this.props);
        return (
           <form id="add-book" onSubmit={this.submitForm.bind(this)}>
            <div className="field">
             <label>Book name:</label>
             <input type="text" onChange={ (e)=> this.setState({name: e.target.value}) }/>
            </div>
            <div className="field">
             <label>Genre:</label>
             <input type="text" onChange={ (e)=> this.setState({genre: e.target.value}) }/>
            </div >
            <div className="field">
             <label>Author:</label>
             <select onChange={ (e)=> this.setState({authorId: e.target.value}) }>
                 <option>Select author</option>
                 {this.displayAuthors()}
             </select>
            </div>
            <button>+</button>
           </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}), 
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
