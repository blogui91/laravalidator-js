export default {
	/**
	 * Check if the field is blank.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	empty(value) {
		if(value != null){
			value = value.toString()
		}
		return value == null || value.length == 0 || value.trim() == '';
	},
	
	/**
	 * No blank fields.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	required(value) {
		if (typeof value == 'boolean')
			return value;

		return !this.empty(value);
	},

	/**
	 * Numeric rule.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	numeric(value) {
		let regexp = /^(-?[1-9]\d*|0)$/
		return regexp.test(value);
	},



	/**
	 * Email rule.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	email(value) {
		let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return regexp.test(value);
	},

	/**
	 * Only URL.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	url(value) {
		let regexp = /^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i
		return regexp.test(value);
	},


	/**
	 * Get first item.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	first(array = []) {
		if (array.constructor == Array) {
			if (array.length > 0) {
				return array[0];
			}
		}
		throw "Error getting first element, array is needed but we get " + array.constructor.name;
	}
}