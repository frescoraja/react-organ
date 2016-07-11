import { combineReducers } from 'react-redux'
import OrganConstants from './constants/organ_constants'

function tracks(state = [], action) {
	switch (action.type) {
		case OrganConstants.ADD_TRACK:
			return [
				...state,
				action.track
			]
		case OrganConstants.RESET_TRACKS:
			return [ ...action.tracks ]
		case OrganConstants.DELETE_TRACK:
			let idx;
			for(let track of state) {
				if(action.id === track.id) {
					idx = state.indexOf(track);
				}
			}
			if (idx !== undefined) {
				return [
					...state.slice(0, idx),
					...state.slice(idx + 1)
				];	
			} else {
				return state;
			}
		default:
			return state;
	}
};

function keys(state = [], action) {
	switch(action.type) {
		case OrganConstants.KEY_PRESSED:
			if (state.indexOf(action.note) === -1) {
				return [
					...state,
					action.note
				]
			} else {
				return state;
			}
		case OrganConstants.KEY_RELEASED:
			const idx = state.indexOf(action.note);
			if (idx !== -1) {
				return [
					...state.slice(0, idx),
					...state.slice(idx + 1)
				];
			} else {
				return state;
			}
		case OrganConstants.GROUP_UPDATE:
			return action.notes
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	tracks, keys
})