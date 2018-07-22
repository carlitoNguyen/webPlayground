const initialState = {
	operation: '',
	result: '',
	user: '',
	history: [],
	historyVisible: false,
	lastOperator: ''
};

export default function counter(state = initialState, action) {
	switch (action.type) {
	case 'RESET_STATE':
		return {
			...state,
			operation: '',
			result: '',
		};
	case 'UPDATE_RESULT_STATE':
		return {
			...state,
			result: action.data,
		};
	case 'UPDATE_OPERATION_STATE':
		return {
			...state,
			operation: action.data,
		};
	case 'UPDATE_USER_STATE':
		return {
			...state,
			user: action.data,
		};
	case 'UPDATE_HISTORY_STATE':
		return {
			...state,
			history: [...state.history, action.data],
		};
	case 'UPDATE_HISTORY_VISIBLE_STATE':
		return {
			...state,
			historyVisible: action.data,
		};
	case 'UPDATE_LAST_OPERATOR_STATE':
		return {
			...state,
			lastOperator: action.data,
		};
	default:
		return state;
	}
}
