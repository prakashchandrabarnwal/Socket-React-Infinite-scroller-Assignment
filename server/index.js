var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var path = require("path");

var io = require('socket.io')(http);



app.use(express.static(__dirname + '/../client'));


io.on('connection', function(socket){
    
    
 var filepath=path.resolve(__dirname) + '/data/';
 
  var fs = require('fs');
  
var traverseFileSystem = function (currentPath) {
   var files = fs.readdirSync(currentPath);
	console.log("length",files.length);
	io.emit("No of files",files.length)
	for (var i in files) {
        
        (function(j){
        
      var currentFile = currentPath + '/' + files[j];
      var fileName = files[j];
      var stats = fs.statSync(currentFile);
       
      if (stats.isFile()) {
           fs.readFile(currentFile, function (err, data) {
               
                if (err)
                    throw err;
                if (data){
					var fileAndData=files[j]+" :"+data.toString('utf8')
                    io.emit('file data',fileAndData);
                    
                }
                    
            });
           }
     else if (stats.isDirectory()) {
            traverseFileSystem(currentFile);
          }
    }
     )( i );
     
     }
     
  };
  
 traverseFileSystem(filepath);
 
});


http.listen( process.env.PORT || 8080, function(){
 console.log('listening on *:8080');
});