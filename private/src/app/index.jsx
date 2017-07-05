// Dependencies.
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';
import App from './App';

ReactGA.initialize('UA-102082775-1');
const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
};

render(
  <Router onUpdate={logPageView}>
    <App />
  </Router>,
  document.getElementById('app'),
);
