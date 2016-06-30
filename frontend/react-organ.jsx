const Dispatcher = require('./dispatcher/dispatcher');
const Note = require('./util/note');
const getKey = require('./constants/tones');

document.addEventListener("DOMContentLoaded", () => {
  window.dp = Dispatcher;
  window.Note = Note;
  window.gk = getKey;
});
