const initialState = {
	authResult: null
};
export default (state = initialState, action) => {
	switch (action.type) {
		case 'SHORT_PASSWORD':
			return {
				...state,
				authResult: 'Password is too short'
			};

		case 'SUCCESS_SIGNUP':
			return {
				...state,
				authResult: 'Successfull register'
			};

		case 'FAIL_SIGNUP':
			return {
				...state,
				authResult: action.res.message
			};

		case 'SUCCESS_LOGIN':
			return {
				...state,
				authResult: 'Successfully LOG IN'
			};

		case 'FAIL_LOGIN':
			return {
				...state,
				authResult: action.res.message
			};

		case 'SERVER_ERROR':
			return {
				...state,
				authResult: 'Unknowed error'
			};
		default:
			return state;
	}
};
