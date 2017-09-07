# Team Dash

## Display

GET /display?room=team5

```javascript
var socket = io();
socket.join('team5');
socket.on('stoplight', function(color){
  console.log(color);
});
```

## Admin GUI

GET /control?room=team5

```javascript
var socket = io();
socket.join('team5');
socket.to('team5').emit('stoplight', 'red');
```

```javascript
var socket = io();
socket.join('team5');
socket.to('team5').emit('news', {tile: 'Senaste', body: 'Nothing'});
```