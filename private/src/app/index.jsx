// Dependencies.
import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-102082775-1');

const App = () => (
  <div className={'page'}>
    <h1>Works!</h1>
    <p>Yup yup.</p>
  </div>
);

render(<App />, document.getElementById('app'));
