import http from 'http';
import crypto from 'crypto';
import { exec } from 'child_process';

require('dotenv').config()

const SECRET = process.env.SECRET;

http
  .createServer((req, res) => {
    req.on('data', chunk => {
      const signature = `sha1=${crypto
        .createHmac('sha1', SECRET)
        .update(chunk)
        .digest('hex')}`;

      const isAllowed = req.headers['x-hub-signature'] === signature;

      const body = JSON.parse(chunk);

      const isMaster = body?.ref === 'refs/heads/master';

      if (isAllowed && isMaster) {
        try{
            exec("echo hello");
        }catch(e){
            console.log(e);
        }
      }

    
    }).on('end', () => {
      body = "helo world";
      // BEGINNING OF NEW STUFF
  
      response.on('error', (err) => {
        console.error(err);
      });
  
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      // Note: the 2 lines above could be replaced with this next one:
      // response.writeHead(200, {'Content-Type': 'application/json'})
  
      const responseBody = { headers, method, url, body };
  
      response.write(JSON.stringify(responseBody));
      response.end();
      // Note: the 2 lines above could be replaced with this next one:
      // response.end(JSON.stringify(responseBody))
  
      // END OF NEW STUFF
    });

   

    res.end();
  })
  .listen(8080);