'use strict';

// require Express and Socket.io
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var config = require('./config.js');
var statcontroller = require('./controllers/statcontroller');
var config = require('./config.js');

// the object that will hold information about the active users currently
// on the site
var visitorsData = {};

app.set('port', (process.env.PORT || 1919));

// serve the static assets (js/dashboard.js and css/dashboard.css)
// from the public/ directory
app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.static(path.join(__dirname, 'node_modules/')));

// serve the index.html page when someone visits any of the following endpoints:
//    1. /
//    2. /about
//    3. /contact
app.get(/\/(about|contact)?$/, function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// serve up the dashboard when someone visits /dashboard
app.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

app.get('/controller', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/controller.html'));
});

app.get('/display', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/display.html'));
});

io.of('/controllers').on('connection', (socket) => {
    console.log('Controllers: ' + socket.id);
    
    // var dddd = {
    //     value: '/images/Ratchada18/POOL_SUNKEN_FINAL.png',
    //     controller: 'c1'
    // };

    // io.of('/displayers').emit('change image', dddd);

    socket.on('change image', (data) => {
        //console.log("data: " + data.value + " from " + data.controller);
        console.log(JSON.stringify(data));

        // needs to emits to displayers
        io.of('/displayers').emit('change image', data);
    });

    socket.on('set image', (data) => {
        //console.log("data: " + data.value + " from " + data.controller);
        console.log(JSON.stringify(data));

        // needs to emits to displayers
        io.of('/displayers').emit('set image', data);
    });
});

io.of('/displayers').on('connection', (socket) => {
    console.log('Displayer: ' + socket.id);


})

io.on('connection', function(socket) {
    //console.log('a user connected '+ socket.id);

    socket.on('change image', (data) => {
        console.log("data: " + data.value + " from " + data.controller);
        console.log(JSON.stringify(data));

        // needs to emits to displayers
        io.broadcast.to('displayers').emit('change image', data);   
    });

    if (socket.handshake.headers.host === config.host
        && socket.handshake.headers.referer.indexOf(config.host + config.dashboardEndpoint) > -1) {
      
            // if someone visits '/dashboard' send them the computed visitor data
            io.emit('updated-stats', statcontroller.computeStats(visitorsData));
    }
      
    // a user has visited our page - add them to the visitorsData object
    socket.on('visitor-data', (data) => {
        visitorsData[socket.id] = data;
    
        // compute and send visitor data to the dashboard when a new user visits our page
        io.emit('updated-stats', statcontroller.computeStats(visitorsData));
    });
    
    socket.on('disconnect', () => {
        // a user has left our page - remove them from the visitorsData object
        delete visitorsData[socket.id];
    
        // compute and send visitor data to the dashboard when a user leaves our page
        io.emit('updated-stats', statcontroller.computeStats(visitorsData));
        console.log("goodbye");
    });    
});

http.listen(app.get('port'), function() {
  console.log('listening on *:' + app.get('port'));
});