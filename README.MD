# Team Dash


# Avaialable screens

## Dash screen

GET /display?screen=team5

## Constroller screen

GET /control?screen=team5


## Joining as a team screen

```javascript
var socket = io(),
    screen = 'team5';
socket.on('connect', function() {
  socket.on('state', state); //Current room state
  socket.join(screen);
});
```

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

Motion sensor wake up

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
