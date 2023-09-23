const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
    res.write('</html>')

    return res.end();
  }

  /////////////////////////////////////////////////////////////////////////////

  // Chuyển hướng request
  if (url === '/message' && method === 'POST') {
    // đọc body
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  ///////////////////////////////////////////////////////////////////
  console.log(req.url, req.method, req.headers);
  res.setHeader('Content-Type', 'text/html');

  res.write('<html>');
  res.write('<head><title>Trang dau tien</title><head>');
  res.write('<body><h1>Xin chao node js!</h1></body>')
  res.write('</html>')

  res.end();
};

// module.exports = {
//   handler: requestHandler,
//   someText: 'xin chao ba con co bac !'
// };

module.exports.handler = requestHandler;
module.exports.someText = 'xin chao ba con';