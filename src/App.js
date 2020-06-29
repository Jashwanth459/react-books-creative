import React from 'react';
import ApolloClient from 'apollo-boost';

import './index.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main" className="App">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
