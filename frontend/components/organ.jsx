const React = require('react');
const KeyStore = require('../stores/key_store');
const TONES = require('../constants/tones').TONES;
const NoteKey = require('./note_key');
const AddKeyListeners = require('../util/add_key_listeners');
const Recorder = require('./recorder');
const JukeBox = require('./juke_box');

const Organ = React.createClass({
  getInitialState() {
    return { notes: KeyStore.all() };
  },

  componentDidMount(){
    this.keyListener = KeyStore.addListener(this._onKeyChange);
    AddKeyListeners();
  },

  _onKeyChange() {
    this.setState({ notes: KeyStore.all() });
  },

  componentWillUnmount() {
    this.keyListener.remove();
  },

  render() {
    return (
      <div className="organ-app">
        <h1>React-Organ!</h1>
        <h4>Use keys: qwertyuiop[]\</h4>

        <div className="keys group">
          {
            Object.keys(TONES).map( (noteName, idx) => {
              return <NoteKey
                        idx={idx}
                        noteName={noteName}
                        key={noteName} />
            })
          }
        </div>
        <Recorder />
        <JukeBox />
      </div>
    );
  }
});

module.exports = Organ;
