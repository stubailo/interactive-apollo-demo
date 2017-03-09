import React from 'react';
import { gql, ApolloClient, ApolloProvider, graphql } from 'react-apollo';

import './App.css';

import { networkInterface } from './schema';

function Benefits({ data: { benefits } }) {
  return (
    <div className="benefits">
      {benefits && benefits.map(benefit => <Benefit benefit={benefit} />)}
    </div>
  );
}

const GraphQLBenefits = graphql(gql`
  {
    benefits(first: 1) {
      title
      content
    }
  }
`)(Benefits);

function Benefit({ benefit }) {
  return (
    <div className="benefit">
      <h3>{benefit.title}</h3>
      <p>{benefit.content}</p>
    </div>
  );
}

function createClient() {
  console.log('created client');
  return new ApolloClient({
    networkInterface,
  });
}

export default function App() {
  return (
    <ApolloProvider client={createClient()}>
      <GraphQLBenefits />
    </ApolloProvider>
  );
}
