import axios from 'axios';
import qs from 'qs';


module.exports = {

	/**
	 * Send a Get request.
	 *
	 * @param {object} data
	 */
	get(url, urlencode=true) {
		return this.send( url, 'get', {}, urlencode);
	},

	/**
	 * Send a POST request.
	 *
	 * @param {object} data
	 */
	post(url, data, urlencode=true ) {
		return this.send(url, 'post', data, urlencode);
	},

	/**
	 * Send a PUT request.
	 *
	 * @param {object} data
	 */
	put(url, data, urlencode=true ) {
		return this.send(url, 'put', data, urlencode);
	},

	/**
	 * Send a DELETE request.
	 *
	 * @param {object} data
	 */
	delete(url, data, urlencode=true ) {
		return this.send(url, 'delete', {params: data}, urlencode);
		// Note: When sending 'params' instead of data, Axios will add ?id=177 to this.url. (If you data is {id: 177}).
		// And then if using Express you can get the params in the query (req.query.id).
	},

	send( url, requestType, data={}, urlencode=true ) {

		if ( data.length > 0 && urlencode === true) {
			data = qs.stringify(data);
		}

		return new Promise(
			( resolve, reject ) => {
				axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'; // Tell server that this is a ajax request.
				const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
				if (token) {
					axios.defaults.headers['CSRF-Token'] = token;
				}
				axios.defaults.withCredentials = true; // Send cookie to server.
				axios[ requestType.toLowerCase() ]( url, data )
					.then(response => resolve(response.data))
					.catch(error => {
						if (error.response.status == 403) {
							console.log('Ajax error: ', error);
							window.location.href = '/login';
							return;
						}						
						reject( error.response.data )
					});
		});
	},
};
