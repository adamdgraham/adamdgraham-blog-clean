import React from 'react';
import { IndexRoute, Route } from 'react-router';
import About from './components/About';
import App from './components/App';
import Contact from './components/Contact';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Work from './components/Work';

export default (
  <Route name="app" component={App} path="/">
    <IndexRoute component={Home}/>
    <Route path="about" component={About}/>
    <Route path="work" component={Work}/>
    <Route path="contact" component={Contact}/>
    <Route path="*" component={NoMatch}/>
  </Route>
);
