import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Calculator from './components/Calculator';
import Layout from './components/Layout';
import reducer from './reducers/reducers';
import rootSaga from './sagas/sagas.watchers';
import { USER, ADMIN, DEVELOPER } from './constant/role.constant';

//FIXME: createSagaMiddleware.default => webpack 4?
const sagaMiddleware = typeof createSagaMiddleware === 'function' ? createSagaMiddleware() : createSagaMiddleware.default();
const store = createStore(
	reducer,
	applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

function render() {
	ReactDOM.render(
		<Provider store={store}>
			<Layout>
				<Calculator/>
			</Layout>
		</Provider>,
		document.getElementById('root'),
	);
}

bootstrap().then(render);
store.subscribe(render);

function bootstrap() {
	// call http to get user roles then update state
	//store.dispatch({ type: 'UPDATE_USER_STATE', data: USER});
	store.dispatch({ type: 'UPDATE_USER_STATE', data: ADMIN });
	//store.dispatch({ type: 'UPDATE_USER_STATE', data: DEVELOPER});
	return new Promise((resolve) => {
		resolve();
	});
}
