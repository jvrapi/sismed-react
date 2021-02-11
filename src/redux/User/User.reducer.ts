import { AnyAction } from 'redux';

const initialState = {
	id: undefined,
	perfil: undefined,
	name: undefined,
	token: undefined,
};

export default function reducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				id: action.payload.id,
				perfil: action.payload.perfil,
				name: action.payload.name,
				token: action.payload.token,
			};

		case 'LOGOUT':
			localStorage.removeItem('persist:root');
			return initialState;

		default:
			return state;
	}
}