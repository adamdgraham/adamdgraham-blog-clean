import 'babel-polyfill';
import React       from 'react';
import Imm from 'immutable';
import { Provider } from 'react-redux';
import { render }  from 'react-dom';
import { Router }  from 'react-router';
import { browserHistory } from 'react-router';
import { createStore } from 'redux';

import blogReducer from '../shared/reducers';
import routes      from '../shared/routes';

// Grab the state from a global injected into server-generated HTML
const initialState = Imm.fromJS(window.__INITIAL_STATE__);

console.log(initialState.toJS());

// Create Redux store with initial state
const store = createStore(blogReducer, initialState);

render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app')
);
