# Team Dash

## Joining a dash

```javascript
var socket = io(),
    room = 'team5';
socket.on('connect', function() {
  socket.join(v);
});
```

GET /display?room=team5

GET /control?room=team5

## Stoplight

Socket:
```javascript
socket.to(room).emit('stoplight', 'red');

socket.on('stoplight', function(color){
  console.log(color);
});
```

API: /api/stoplight/:room/:color

## IFrame

```javascript
socket.to(room).emit('iframe', 'http://www.svt.se');

socket.on('iframe', function(url){
  console.log(url);
});
```

## Wake

API: /api/wake/:room
