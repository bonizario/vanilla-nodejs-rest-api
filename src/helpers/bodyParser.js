function bodyParser(request, callback) {
  // Receive the request body chunk by chunk (stream)
  let body = '';
  request.on('data', chunk => {
    body += chunk;
  });
  request.on('end', () => {
    body = JSON.parse(body);
    request.body = body;
    callback();
  });
}

module.exports = bodyParser;
