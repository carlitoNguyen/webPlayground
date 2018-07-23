import React from 'react';
import Calculator from './Calculator';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'

describe('Connected Calculator',()=> {
	const initialState = { result: 10, operation: "7+3" };
	const mockStore = configureStore();

	it('render a calculator', () => {
		const store = mockStore(initialState);
		const wrapper = mount(<Provider store={store}><Calculator/></Provider>);
		expect(wrapper).toMatchSnapshot();
	});
});
