# Team Dash

## Display

GET /display?room=team5

```javascript
var socket = io('team5');
socket.on('stoplight', function(color){
  console.log(color);
});
```

## Admin GUI

GET /control?room=team5