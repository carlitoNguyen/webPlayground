import { takeEvery, all } from 'redux-saga/effects';
import {
	reset, submit, updateOperation, randomOperationGeneration, toggleHistoryList,
} from './sagas.effects';

export function* watchReset() {
	yield takeEvery('RESET', reset);
}

export function* watchSubmit() {
	yield takeEvery('SUBMIT', submit);
}

export function* watchUpdateOperation() {
	yield takeEvery('UPDATE', updateOperation);
}

export function* watchRandomOperationGeneration() {
	yield takeEvery('RANDOM_OPERATION_GENERATION', randomOperationGeneration);
}

export function* watchToggleHistoryList() {
	yield takeEvery('TOGGLE_HISTORY_LIST', toggleHistoryList);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
	yield all([
		watchReset(),
		watchSubmit(),
		watchUpdateOperation(),
		watchRandomOperationGeneration(),
		watchToggleHistoryList(),
	]);
}
