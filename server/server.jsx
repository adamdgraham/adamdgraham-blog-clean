import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import routes from 'routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).send('Not found.');
    }

    const InitialComponent = (
      <RoutingContext {...renderProps} />
    );
    const componentHTML = renderToString(InitialComponent);
    const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Isomorphic Redux Demo</title>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
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
