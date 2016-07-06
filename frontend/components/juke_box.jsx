const React = require('react');
const TrackAPIUtil = require('../util/track_api_util');
const TrackPlayer = require('./track_player');
const TrackStore = require('../stores/track_store');

const JukeBox = React.createClass({
	getInitialState() {
		return { tracks: TrackStore.all() };
	},

	componentDidMount() {
		this.trackListener = TrackStore.addListener(this._onChange);
		TrackAPIUtil.fetchTracks();
	},

	componentWillUnmount() {
	   this.trackListener.remove();  
	},

	_onChange() {
		this.setState({ tracks: TrackStore.all() });
	},

	render() {
		let jukebox = "No songs recorded yet";
		if (this.state.tracks.length > 0) {
			jukebox = this.state.tracks.map( track => {
				return <TrackPlayer track={track} key={track.get('id')} />
			});
		}

		return (
			<div className="jukebox">
				<h3>Jukebox</h3>
				{jukebox}
			</div>
		);
	}
});

module.exports = JukeBox;