
var chat = {
  add: function(room, msg) {
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }
    this.rooms[room].push(msg);
  },
  get: function(room) {
    if (this.rooms[room]) {
      return this.rooms[room];
    }
    return [];
  },
  rooms: {}
};

module.exports = chat;