const $ = require('jquery');
const KeyActions = require('../actions/key_actions');
const TONES = require('../constants/tones').TONES;

const NOTE_MAP = {};
const tones = Object.keys(TONES);
const validKeys = [
  81, //q
  87, //w
  69, //e
  82, //r
  84, //t
  89, //y
  85, //u
  73, //i
  79, //o
  80, //p
  219,//[
  221,//]
  220,//\
];

tones.forEach((tone, i) => {
  NOTE_MAP[validKeys[i]] = tone;
});

const _heldKeys = [];

module.exports = function() {
  $(document).on('keydown', (e) => {
    const code = e.keyCode;
    const valid = validKeys.indexOf(code) !== -1;
    if (_heldKeys.indexOf(code) === -1 && valid) {
      _heldKeys.push(code);
      KeyActions.keyPressed(NOTE_MAP[code]);
    }
  });
  
  $(document).on('keyup', (e) => {
    const code = e.keyCode;
    const idx = _heldKeys.indexOf(code);
    if (idx !== -1) {
      _heldKeys.splice(idx, 1);
      KeyActions.keyReleased(NOTE_MAP[code]);
    }
  });
};
