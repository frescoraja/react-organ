import { createStore, applyMiddleWare } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleWare(
			thunkMiddleware
		)
	)
}