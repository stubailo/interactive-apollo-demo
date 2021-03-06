import { graphql, print } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

const data = [
  {
    title: 'ASDF',
    content: 'ASDF [link](example.com) other content',
  },
];


const typeDefs = `
  type Query {
    benefits(first: Int!): [Benefit]
  }

  type Benefit {
    title: String!
    content: String!
  }
`;

const resolvers = {
  Query: {
    benefits(root, { first }) {
      if (first < 1 || first > data.length) {
        throw new Error('first argument out of range.');
      }

      return data.slice(0, first);
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

export function fetchQuery({ query, variables }) {
  return graphql(schema, query, null, null, variables);
}

export const networkInterface = {
  query({ query: queryAst, variables }) {
    return fetchQuery({ query: print(queryAst), variables });
  },
};
