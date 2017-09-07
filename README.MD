# Team Dash

## Joining a dash

```javascript
var socket = io(),
    room = 'team5';
socket.on('connect', function() {
  socket.on('state', state); //Current room state
  socket.join(room);
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


## Web Hook

API: /api/github/:room

Emits a chat message on repo push


## Led Colors

Changes color on LED-list, supported colors currently:
 * green
 * yellow
 * red
 * black (turns LED off)
 * rainbow (party mode)

```javascript
socket.on('color', function(url){
  console.log(url);
});
```
