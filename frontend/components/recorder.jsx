const React = require('react');
const Track = require('../util/track');
const KeyStore = require('../stores/key_store');

const Recorder = React.createClass({
  getInitialState() {
    return { recording: false, track: new Track() };
  },

  componentDidMount() {
    this.keyListener = KeyStore.addListener(this._keysChanged);
  },

  componentWillUnmount() {
    this.keyListener.remove();
  },

  isDoneRecording() {
    return !this.isTrackNew() && !this.state.recording;
  },

  isRecording() {
    return this.state.recording;
  },

  isTrackNew() {
    return this.state.track.isBlank();
  },

  playClass() {
    let klass = "play-button";
    if(this.isTrackNew()) {
      klass += " disabled";
    }
    return klass;
  },

  playClick(e) {
    if(!this.isTrackNew()) {
      this.state.track.play();
    }
  },

  recordingMessage() {
    if(this.isRecording()) {
      return "Stop recording";
    } else {
      return "Start recording";
    }
  },

  recordClick(e) {
    if(this.state.recording) {
      this.state.track.stopRecording();
      this.setState({ recording: false });
    } else {
      this.setState({ recording: true });
      this.state.track.startRecording();
    }
  },

  saveTrack(e) {
    this.state.track.set('name', prompt("please enter a track name"));
    this.state.track.save();
  },

 trackSavingElements() {
    if (this.isDoneRecording()) {
      return( 
        <div className="track-controls">
          <button key="play" onClick={this.playClick} className={this.playClass()}>
            Play
          </button>
          <button key="save" onClick={this.saveTrack} className="save-button">
            Save Track
          </button> 
        </div>
      );
    }
 },

 _keysChanged() {
   if (this.state.recording) {
     this.state.track.addNotes(KeyStore.all());
   }
 },

 render() {
    const hasTrack = this.isTrackNew();

    return (
      <div className="controls">
        <span className="recorder-header">Record: </span>
        <button onClick={this.recordClick} className="record-button">
          {this.recordingMessage()}
        </button>
        {this.trackSavingElements()}
      </div>
    );
 }
});

module.exports = Recorder;
