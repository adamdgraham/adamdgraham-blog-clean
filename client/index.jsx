import React       from 'react';
import { render }  from 'react-dom';
import { Router }  from 'react-router';
import { browserHistory } from 'react-router'
import routes      from '../shared/routes';

render(
  <Router children={routes} history={browserHistory} />,
  document.getElementById('app')
);
