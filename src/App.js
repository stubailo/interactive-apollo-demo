import React from 'react';
import './App.css';

import { fetchQuery } from './schema';

export default function App() {
  return (
    <div>Hello world!</div>
  );
}

fetchQuery({
  query: `{ benefits(first: 1) { title } }`,
}).then(( result ) => {
  console.log(result);
});
