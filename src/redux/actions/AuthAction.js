import SignUpService from '../services/AuthService';
import { LoginUserService } from '../services/AuthService';

export const signUp = (data, history) => {
	return (dispatch) => {
		if (data.password.length < 6) {
			return dispatch({ type: 'SHORT_PASSWORD' });
		}

		SignUpService(data).then(
			(res) => {
				if (res.success) {
					dispatch({ type: 'SUCCESS_SIGNUP' });
					setTimeout(() => {
						history.push('/login');
					}, 2000);
				} else {
					dispatch({ type: 'FAIL_SIGNUP', res });
				}
			},
			(error) => {
				dispatch({ type: 'SERVER_ERROR', error });
			}
		);
	};
};

export const LoginUser = (credentials, history) => {
	return (dispatch) => {
		if (credentials.password.length < 6) {
			return dispatch({ type: 'SHORT_PASSWORD' });
		}
		LoginUserService(credentials).then(
			(res) => {
				if (res.success) {
					localStorage.setItem('userToken', 'Bearer ' + res.token);
					localStorage.setItem('userId', res.id);
					dispatch({ type: 'SUCCESS_LOGIN' });
					setTimeout(() => {
						history.push('/');
					}, 1000);
				} else {
					dispatch({ type: 'FAIL_LOGIN', res });
				}
			},
			(error) => {
				dispatch({ type: 'SERVER_ERROR', error });
			}
		);
	};
};
