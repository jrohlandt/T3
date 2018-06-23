import axios from 'axios';
import qs from 'qs';


class Ajax {

	constructor(config) {
		this.url = config.url;
		this.urlencode = config.urlencode !== undefined ? config.urlencode : true;
	}

	/**
	 * Send a POST request to the given URL.
	 *
	 * @param {string} url
	 */
	get() {
		return this.send( 'get' );
	}

	/**
	 * Send a POST request to the given URL.
	 *
	 * @param {string} url
	 */
	post( data ) {
		return this.send( 'post', data );
	}

	/**
	 * Send a PUT request to the given URL.
	 *
	 * @param {string} url
	 */
	put( data ) {
		return this.send( 'put', data );
	}

	/**
	 * Send a DELETE request to the given URL.
	 *
	 * @param {string} url
	 */
	delete( data ) {
		return this.send( 'delete', data );
	}

	send( requestType, data={} ) {

		if ( data.length > 0 && this.urlencode ) {
			data = qs.stringify(data);
		}

		return new Promise(
			( resolve, reject ) => {
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
