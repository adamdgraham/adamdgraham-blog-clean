import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'

import blogReducer from '../shared/reducers';
import routes from '../shared/routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/static'));

app.use((req, res) => {
  // initial state should really be pulled from the backend...
  const initialState = {
    loading: true, // Set false when done loading blog entries from back end.
    pages: [{content: 'Dummy content', creation_date: null}], // Blog content.
    currentPage: null // Current blog entry ID. Not needed for other static content.
  };
  const store = createStore(blogReducer, initialState);

  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).send('Not found.');
    }

    const InitialComponent = (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );
    const componentHTML = renderToString(InitialComponent);
    // Grab the initial state from our Redux store
    const initialState = store.getState();
    const HTML = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="">
          <meta name="author" content="">
          <title>Adam D. Graham's Blog Party</title>
          <!-- Bootstrap Core CSS -->
          <link href="/css/bootstrap.min.css" rel="stylesheet">
          <!-- Custom CSS -->
          <link href="/css/clean-blog.min.css" rel="stylesheet">
          <link href="/css/cosmic-custom.css" rel="stylesheet">
          <!-- Custom Fonts -->
          <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
          <link href="//fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css">
          <link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css">
          <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
          <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
          <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
          <![endif]-->
        </head>
        <body>
          <div id="app">${componentHTML}</div>
          <script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)} </script>
          <script src="/js/jquery.min.js"></script>
          <script src="/js/bootstrap.min.js"></script>
          <script src="/js/clean-blog.min.js"></script>
          <script type="application/javascript" src="bundle.js"></script>
        </body>
      </html>
    `;

    res.send(HTML);
  });
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on ${PORT}`);
  }
});
