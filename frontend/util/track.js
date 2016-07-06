const $ = require('jquery');
const KeyActions = require('../actions/key_actions');

const Track = function(attrs) {
  const defaults = {
    name: "",
    roll: []
  };

  this.attributes = $.extend(defaults, attrs || {});
};

Track.prototype = {
  constructor: Track,

  addNotes(notes) {
    const timeSlice = { time: this._timeDelta() };
    if (notes.length > 0) {
      timeSlice.notes = notes;
    }
    this.attributes.roll.push(timeSlice);
  },

  get(attr) {
    return this.attributes[attr];
  },

  isBlank() {
    return this.attributes.roll.length === 0;
  },

  play() {
    if (this.interval) { return; }

    let currentNote = 0, delta;
    const playBackStartTime = Date.now();
    const roll = this.attributes.roll;

    this.interval = setInterval(() => {
      if (currentNote < roll.length) {
        delta = Date.now() - playBackStartTime;

        if (delta >= roll[currentNote].time) {
          const notes = roll[currentNote].notes || [];
          KeyActions.groupUpdate(notes);
          currentNote++;
        }
      } else {
        clearInterval(this.interval);
        delete this.interval;
      }
    }, 1);
  },

  set(attr, val) {
    this.attributes[attr] = val;
  },

  save() {
    if(this.isBlank()) {
      throw "Track can't be blank!";
    } else if(this.attributes.name === "") {
      throw "Name can't be blank!";
    } else {
      TrackActions.createTrack(this.attributes);
    }
  },

  startRecording() {
    this.attributes.roll = [];
    this.start = Date.now();
  },

  stopRecording() {
    this.addNotes([]);
  },

  _timeDelta() {
    return Date.now() - this.start;
  }
};

module.exports = Track;
