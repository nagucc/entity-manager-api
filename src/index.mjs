import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { host, port, secret } from './config';

import { entity } from './controllers';

const app = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(cookieParser(secret));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('*', (req, res, next) => {
  res.success = data => res.json({
    ret: 0,
    data,
  });
  res.final = (msg, err) => {
    res.json({
      ret: -1,
      msg,
      err,
    });
  };
  next();
});
app.use('/entity', entity);

app.listen(port, () => {
  console.log(`The server is running at http://${host}`);
});
