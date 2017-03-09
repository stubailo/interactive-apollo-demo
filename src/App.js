import React from 'react';
import { gql, ApolloClient, ApolloProvider, graphql } from 'react-apollo';

import './App.css';

import { networkInterface } from './schema';

function Benefits({ data: { benefits, error } }) {
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="benefits">
      {benefits && benefits.map(benefit =>
        <Benefit benefit={benefit} key={benefit.title} />)}
    </div>
  );
}

function GraphQLBenefits({ query }) {
  let queryAst;
  try {
    queryAst = gql`${query}`;
    return React.createElement(
      graphql(queryAst)(Benefits)
    );
  } catch (e) {
    return <div>Error</div>;
  }
}

function Benefit({ benefit }) {
  return (
    <div className="benefit">
      {benefit.title && <h3>{benefit.title}</h3>}
      {benefit.content && <p>{benefit.content}</p>}
    </div>
  );
}

class QueryBenefitSplit extends React.Component {
  constructor() {
    super();
    this.state = {
      query: `
        {
          benefits(first: 1) {
            title
            content
          }
        }
      `,
    };

    this._handleQueryChange = this._handleQueryChange.bind(this);
  }

  _handleQueryChange(event) {
    this.setState({
      query: event.target.value,
    });
  }

  render() {
    return (
      <div className="query-benefit-container">
        <textarea
          onChange={this._handleQueryChange}
          rows="10"
          cols="40"
          value={this.state.query}
        />
        <GraphQLBenefits query={this.state.query} />
      </div>
    )
  }
}

function createClient() {
  return new ApolloClient({ networkInterface });
}

export default function App() {
  return (
    <ApolloProvider client={createClient()}>
      <QueryBenefitSplit />
    </ApolloProvider>
  );
}
