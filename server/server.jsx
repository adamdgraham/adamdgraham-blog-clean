import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import routes from '../shared/routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/static'));

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
      <RouterContext {...renderProps} />
    );
    const componentHTML = renderToString(InitialComponent);
    const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Adam D. Graham's Blog Party</title>
        </head>
        <body>
          <div id="app">${componentHTML}</div>
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
