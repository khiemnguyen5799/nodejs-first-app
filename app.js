// const http = require('http');

// const routes = require('./routes');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./public/routes/admin');
const shopRoutes = require('./public/routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


// thêm lỗi 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// console.log(routes.someText);

// const server = http.createServer(routes.handler);
// const server = http.createServer(app);

// server.listen(3000);
app.listen(3000);

