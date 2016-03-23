/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// var readline = require('readline');
// var rl = readline.createInterface(process.stdin, process.stdout);



  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  /* 

  if /classes/messages





    sort between gets, posts, options
      
  if /xyz anything else
    go to switch statement

  all else is 404...






  */
var requestHandler = function(request, response) {
  var fs = require('fs');
  var messages = fs.readFileSync('server/messages.txt');
  var path = require('path');
  messages = JSON.parse(messages);

  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  // console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (request.url === '/classes/messages') {
    if (request.method === 'GET' || request.method === 'OPTIONS') {
      var statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify( messages ));
    } else {
      var body = '';

      request.on('data', function(chunk) {
        body += chunk;
      });

      request.on('end', function() {

        messages.results.push(JSON.parse(body));
        if (messages.results.length > 100) {
          messages.results.shift();
        }
        //// write the new message object to disk
        fs.writeFileSync('server/messages.txt', JSON.stringify(messages));
        var statusCode = 201;
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(messages)); 
      });  
    }
  } else if ( request.method === 'GET') {

    var filePath = request.url; //    
    if (filePath === '/') {
      filePath = 'client/index.html';       //       client/in
    } else {                                //    client/styles/css.css
      filePath = 'client/' + filePath;
    }



    var extname = path.extname(filePath);
    var contentType = 'text/html';

    switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;      
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    }
    
    fs.readFile(filePath, function(error, content) {
      if (error) {
        if (error.code === 'ENOENT') {
          response.writeHead(404);
          response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n. Could not find: ' + filePath);
          response.end(); 
        }
      } else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
      }
    });
  } 
};


//error 
     // else {
     //  var statusCode = 404;
     //  response.writeHead(statusCode, headers);
     //  response.end();
     //  }
    // The outgoing status.

    // See the note below about CORS headers.
    // Tell the client we are sending them plain text.
    //
    // You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.

    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    

    // Make sure to always call response.end() - Node may not send
    // anything back to the client until you do. The string you pass to
    // response.end() will be the body of the response - i.e. what shows
    // up in the browser.
    //
    // Calling .end "flushes" the response's internal buffer, forcing
    // node to actually send all the data over to the client.

  


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
exports.requestHandler = requestHandler;
