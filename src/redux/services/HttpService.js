class HttpService {
	baseUrl = 'http://localhost:8000/api';

	postApi = async (data, apiRoute) => {
		const token = await localStorage.getItem('userToken');
		let options = {
			method: 'POST',
			headers: {
				Authorization: token,
				'Content-type': 'Application/json'
			},
			body: JSON.stringify(data)
		};

		return fetch(this.baseUrl + apiRoute, options)
			.then((response) => response.json())
			.catch((msg) => new Error(msg));
	};

	getApi = async (apiRoute) => {
		let options = {
			method: 'GET',
			headers: {
				'Content-type': 'Application/json'
			}
		};

		return fetch(this.baseUrl + apiRoute, options)
			.then((response) => response.json())
			.catch((msg) => new Error(msg));
	};

	deleteApi = async (apiRoute) => {
		const token = await localStorage.getItem('userToken');
		let options = {
			method: 'DELETE',
			headers: {
				Authorization: token,
				'Content-type': 'Application/json'
			}
		};

		return fetch(this.baseUrl + apiRoute, options)
			.then((response) => response.json())
			.catch((msg) => new Error(msg));
	};

	patchApi = async (apiRoute, data) => {
		const token = await localStorage.getItem('userToken');
		let options = {
			method: 'PATCH',
			headers: {
				Authorization: token,
				'Content-type': 'Application/json'
			},
			body: JSON.stringify(data)
		};

		return fetch(this.baseUrl + apiRoute, options)
			.then((response) => response.json())
			.catch((msg) => new Error(msg));
	};
}
export default new HttpService();
