# Team Dash

## Joining a dash

```javascript
var socket = io(),
    room = 'team5';
socket.on('connect', function() {
  socket.join(v);
});
```

## Display

GET /display?room=team5

```javascript
socket.on('stoplight', function(color){
  console.log(color);
});
socket.on('iframe', function(url){
  console.log(url);
});
```

## Admin GUI

GET /control?room=team5

```javascript
socket.to(room).emit('stoplight', 'red');

socket.to(room).emit('iframe', 'http://www.svt.se');
```