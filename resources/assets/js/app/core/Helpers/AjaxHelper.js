import axios from 'axios';
import qs from 'qs';


class Ajax {

	constructor(config) {
		this.url = config.url;
		this.urlencode = config.urlencode !== undefined ? config.urlencode : true;
	}

	/**
	 * Send a Get request.
	 *
	 * @param {object} data
	 */
	get() {
		return this.send( 'get' );
	}

	/**
	 * Send a POST request.
	 *
	 * @param {object} data
	 */
	post( data ) {
		return this.send( 'post', data );
	}

	/**
	 * Send a PUT request.
	 *
	 * @param {object} data
	 */
	put( data ) {
		return this.send( 'put', data );
	}

	/**
	 * Send a DELETE request.
	 *
	 * @param {object} data
	 */
	delete( data ) {
		return this.send( 'delete', {params: data} );
		// Note: When sending 'params' instead of data, Axios will add ?id=177 to this.url. (If you data is {id: 177}).
		// And then if using Express you can get the params in the query (req.query.id).
	}

	send( requestType, data={} ) {

		if ( data.length > 0 && this.urlencode ) {
			data = qs.stringify(data);
		}

		return new Promise(
			( resolve, reject ) => {
				axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'; // Tell server that this is a ajax request.
				// axios.defaults.headers['Access-Control-Request-Headers'] = 'Content-Type';
				axios.defaults.withCredentials = true; // Send cookie to server.
				axios[ requestType.toLowerCase() ]( this.url, data )
				.then(
					response => resolve( response.data ) 
				)
				.catch(
					error => reject( error.response.data )
				);
		});
	}
}

export default Ajax;
