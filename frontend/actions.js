const $ = require('jquery')
import fetch from 'isomorphic-fetch'
import OrganConstants from './constants/organ_constants'

export const addTrack = (track) => {
	return {
		type: OrganConstants.ADD_TRACK,
		track
	}
}

export const createTrack = (track) => {
	return {
		type: OrganConstants.CREATE_TRACK,
		track
	}
}

export const deleteTrack = (id) => {
	return {
		type: OrganConstants.DELETE_TRACK,
		id
	}
}

export const resetTracks = (tracks) => {
	type: OrganConstants.RESET_TRACKS,
	tracks
}

export const fetchTracks = () => {
	return dispatch => {
		return fetch('/api/tracks')
						.then(response => response.json())
						.then(json => dispatch(resetTracks(json)))
	}
}

export const submitTrack = track => {
	return dispatch => {
		return $.ajax({
			url: '/api/tracks',
			method: 'POST',
			dataType: 'json',
			data: JSON.stringify(track),
			contentType: 'application/json',
			beforeSend(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"').attr('content')) },
			success(track) {
				dispatch(addTrack(track))
			}
		})
	}
}

export const destroyTrack = id => {
	return dispatch => {
		return $.ajax({
			url: `/api/tracks/${id}`,
			method: 'DELETE',
			dataType: 'json',
			beforeSend(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
			success(track) {
				dispatch(deleteTrack(track.id))
			}
		})
	}
}

export const groupUpdate = notes => {
  return {
    type: OrganConstants.GROUP_UPDATE,
    notes
  }
}

export const keyPressed = note => {
  return {
    type: OrganConstants.KEY_PRESSED,
    note
  }
}

export const keyReleased = note => {
  return {
    type: OrganConstants.KEY_RELEASED,
    note
  }
}