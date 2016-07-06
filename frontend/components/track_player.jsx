const React = require('react');
const TrackAPIUtil = require('../util/track_api_util');

const TrackPlayer = React.createClass({
	deleteTrack() {
		TrackAPIUtil.deleteTrack(this.props.track.get('id'));
	},

	playClick() {
		this.props.track.play();
	},

	render() {
		return (
			<div className="track">
				<p className="track-name">&#x266C; {this.props.track.get('name')}</p>
				<button className="player-button" onClick={this.playClick}>&#9658; Play</button>
				<button className="player-button" onClick={this.deleteTrack}>Delete</button>
			</div>
		);
	}
});

module.exports = TrackPlayer;