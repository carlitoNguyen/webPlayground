import * as effects from './sagas.effects';

describe('Saga effect', () => {
	it('should put RESET_STATE on reset', () => {
		const gen = effects.reset();
		expect(gen.next().value.PUT.action.type).toBe('RESET_STATE');
		expect(gen.next().done).toBeTruthy();
	});

	it('should put UPDATE_RESULT_STATE on submit', () => {
		const gen = effects.submit();
		expect(gen.next().value.SELECT).toBeDefined();
		const effect = gen.next('7+3').value.PUT.action;
		expect(effect.type).toEqual('UPDATE_RESULT_STATE');
		expect(effect.data).toEqual(10);

		expect(gen.next().value.SELECT).toBeDefined();
		expect(gen.next().done).toBeTruthy();
	});
});
