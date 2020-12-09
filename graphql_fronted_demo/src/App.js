import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_MOVIES = gql`
  query {
    movie(id: 1) {
      id
      title
    }
  }
`

const App = () => (
  <Query query={GET_MOVIES}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <div>
          {data.movie.title}
        </div>
      )
    }}
  </Query>
)

export default App;
