import { NewEntryService } from '../services/EntryService';

export const addEntry = (data, history) => {
	return (dispatch) => {
		if (data.title.length < 6) {
			return dispatch({ type: 'SHORT_TITLE' });
		}
		if (data.content.length < 18) {
			return dispatch({ type: 'SHORT_CONTENT' });
		}

		NewEntryService(data).then(
			(res) => {
				console.log('recibiendo', res);
				if (res.success) {
					dispatch({ type: 'SUCCESS_POST' });
					setTimeout(() => {
						history.push('/entry/' + res.data);
					}, 2000);
				} else {
					dispatch({ type: 'FAIL_POST', res });
				}
			},
			(error) => {
				dispatch({ type: 'SERVER_ERROR', error });
			}
		);
	};
};
