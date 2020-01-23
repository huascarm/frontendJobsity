const initialState = {
	entryResult: null
};
export default (state = initialState, action) => {
	switch (action.type) {
		case 'SHORT_TITLE':
			return {
				...state,
				entryResult: 'Title must be at least 6 characteres'
			};

		case 'SHORT_CONTENT':
			return {
				...state,
				entryResult: 'Content must be at least 18 characteres'
			};

		case 'SUCCESS_POST':
			return {
				...state,
				entryResult: 'Post published successfully'
			};

		case 'FAIL_POST':
			return {
				...state,
				entryResult: action.res.message
			};

		case 'SERVER_ERROR':
			return {
				...state,
				entryResult: 'Unknowed error'
			};
		default:
			return state;
	}
};
