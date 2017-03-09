import React from 'react';
import { gql, ApolloClient, ApolloProvider, graphql } from 'react-apollo';

import './App.css';

import { networkInterface } from './schema';

const query = `
  {
    benefits(first: 1) {
      title
      content
    }
  }
`;

function Benefits({ data: { benefits } }) {
  return (
    <div className="benefits">
      {benefits && benefits.map(benefit =>
        <Benefit benefit={benefit} key={benefit.title} />)}
    </div>
  );
}

function GraphQLBenefits({ query }) {
  return React.createElement(
    graphql(gql`${query}`)(Benefits)
  );
}

function Benefit({ benefit }) {
  return (
    <div className="benefit">
      {benefit.title && <h3>{benefit.title}</h3>}
      {benefit.content && <p>{benefit.content}</p>}
    </div>
  );
}

function createClient() {
  return new ApolloClient({ networkInterface });
}

export default function App() {
  return (
    <ApolloProvider client={createClient()}>
      <GraphQLBenefits query={query} />
    </ApolloProvider>
  );
}
