const $ = require('jquery');
const Track = require('./track');
const AppDispatcher = require('../dispatcher/dispatcher');
const TrackActions = require('../actions/track_actions');
const OrganConstants = require('../constants/organ_constants');

const TrackAPIUtil = {
	createTrack(track) {
		$.ajax({
			url: '/api/tracks',
			method: 'POST',
			data: JSON.stringify(track),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
			success(track) {
				TrackActions.addTrack(new Track(track));
			}
		});
	},

	fetchTracks() {
		$.getJSON('/api/tracks', trackObjects => {
			const tracks = trackObjects.map(trackData => new Track(trackData));
			TrackActions.resetTracks(tracks);
		});
	},

	deleteTrack(id) {
		$.ajax({
			url: `/api/tracks/${id}`,
			method: 'DELETE',
			dataType: 'JSON',
			beforeSend(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
			success(track) {
				TrackActions.deleteTrack(track.id);
			}
		});
	}
};

AppDispatcher.register(payload => {
	switch(payload.actionType) {
		case OrganConstants.CREATE_TRACK:
			TrackAPIUtil.createTrack(payload.track);
			break;
		default:
	}
});

module.exports = TrackAPIUtil;