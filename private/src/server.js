import Koa from 'koa';
import serve from 'koa-static';
import serverPush from 'koa-server-push';
import convert from 'koa-convert';
import http2 from 'http2';
import fs from 'fs';

const app = new Koa();

app.use(convert(serve('public')));
app.use(serverPush());

const options = {
  key: fs.readFileSync('private/certs/key.pem'),
  cert: fs.readFileSync('private/certs/cert.pem'),
};

const port = 3000;

http2
  .createServer(options, app.callback())
  .listen(port, (err) => {
    if (err) {
      throw new Error(err);
    }

    console.log(`[APP]: Listening on port ${port}.`);
  });
