import { fetchQuery } from './schema';

it('runs a basic query', () => {
  return fetchQuery({
    query: `{ benefits(first: 1) { title } }`,
  }).then(( result ) => {
    expect(result).toMatchSnapshot();
  });
});
