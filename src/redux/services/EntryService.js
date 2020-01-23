import httpService from './HttpService';

function NewEntryService(data) {
	data.token = localStorage.getItem('userToken');
	return httpService
		.postApi(data, '/entries')
		.then((result) => {
			return result;
		})
		.catch((err) => {
			console.log('catch of Entry service', err);
		});
}

export { NewEntryService };
