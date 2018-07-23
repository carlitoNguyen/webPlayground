import { put, select } from 'redux-saga/effects';
import { ADMIN } from '../constant/role.constant';

const operator = ['+', '-', '*', '/', '.', ''];

export function* reset() {
	yield put({ type: 'RESET_STATE' });
}

export function* submit() {
	const operation = yield select(state => state.operation);
	if (operation.includes('/0') || !operation) {
		yield* handleInvalidOperation(operation);
	} else {
		yield put({ type: 'UPDATE_RESULT_STATE', data: eval(operation) });
	}

	const role = yield select(state => state.user);
	if (role === ADMIN) {
		const result = yield select(state => state.result);
		yield put({ type: 'UPDATE_HISTORY_STATE', data: `${operation} = ${result}` });
	}
}

export function* updateOperation({ data }) {
	const lastOperator = yield select(state => state.lastOperator);
	const lastOperation = yield select(state => state.operation);
	if (operator.indexOf(data) > -1  && operator.indexOf(lastOperator) > -1) { //if 2 operators in the row
		yield* handleInvalidOperation(lastOperation + data);
	}
	else {
		yield put({ type: 'UPDATE_OPERATION_STATE', data: lastOperation + data });
		yield put({ type: 'UPDATE_LAST_OPERATOR_STATE', data});
	}
}

export function* toggleHistoryList() {
	const visible = yield select(state => state.historyVisible);
	yield put({ type: 'UPDATE_HISTORY_VISIBLE_STATE', data: !visible });
}

export function* randomOperationGeneration() {
	yield* reset();
	yield put({ type: 'UPDATE_OPERATION_STATE', data: generateRandomOperation() });
	yield* submit();
}

function generateRandomOperation() {
	let randomOperation = `${getRandomNumber()}`;
	for (let i = 0; i < getRandomNumber(); i++) {
		randomOperation = randomOperation + getRandomOperator() + getRandomNumber();
	}
	return randomOperation;
}

function getRandomNumber() {
	return Math.floor((Math.random() * 100) + 1); // [1..100]
}

function getRandomOperator() {
	const operators = ['+', '-', '*', '/'];
	return operators[Math.floor(Math.random() * 4)];
}

function* handleInvalidOperation (operation) {
	alert(`'${operation}'` + ' is an operation invalid');
	yield put({ type: 'RESET_STATE' });
}