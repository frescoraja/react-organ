const React = require('react');
const KeyStore = require('../stores/key_store');
const Note = require('../util/note');
const GetKeyFreq = require('../constants/tones').getKeyFreq;

const NoteKey = React.createClass({
  getInitialState() {
    return { pressed: this.thisKeyPressed(), octave: this.props.octave };
  },

  componentDidMount() {
    const octave = this.props.octave || 5;
    const freq = GetKeyFreq(this.props.noteName, octave);
    this.note = new Note(freq);
    this.keyListener = KeyStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.keyListener.remove();
  },

  thisKeyPressed() {
    const keys = KeyStore.all();
    return keys.indexOf(this.props.noteName) !== -1;
  },

  _onChange() {
    const pressed = this.thisKeyPressed();
    if (pressed) {
      this.note.start();
    } else {
      this.note.stop();
    }
    this.setState({ pressed: pressed });
  },

  render() {
    let classes = ["note-key", `key-${this.props.idx}`];
    if(this.props.noteName.length > 1) classes.push("sharp");
    if(this.state.pressed) classes.push("pressed");

    return <div className={classes.join(" ")}>{this.props.noteName}</div>
  }
});

module.exports = NoteKey;
