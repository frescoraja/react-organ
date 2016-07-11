import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { TONES } from '../constants/tones'
import AddKeyListeners from '../util/add_key_listeners'



class OrganApp extends Component {

	render() {

		return (
			<div className="organ-app">
				<h1>React Organ</h1>

				<h4>use keys: qwertyuiop[]\</h4>
				{
					Object.keys(TONES).map(( noteName, idx) => {
						return <NoteKey
											idx={idx}
											noteName={noteName}
											key={noteName} />
					})
				}
			</div>
		);
	}
}