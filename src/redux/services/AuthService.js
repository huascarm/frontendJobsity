import httpService from './HttpService';

export default function SignUpService(data) {
	return httpService
		.postApi(data, '/user/register')
		.then((result) => {
			return result;
		})
		.catch((err) => {
			console.log(err);
		});
}

export const LoginUserService = (credentials) => {
	return httpService
		.postApi(credentials, '/user/login')
		.then((result) => {
			return result;
		})
		.catch((err) => {
			console.log(err);
		});
};
