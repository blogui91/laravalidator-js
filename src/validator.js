/* 
 *	Validator JS |
 *	(c) 2017 by Cesar Santana 
 */


import Helpers from './helpers';
import messages_default from './messages_default';

class Validator {
	/**
	 * Create a new instance.
	 *
	 * @param {Object} data required
	 * @param {Object} rules required
	 * @param {Object} messages
	 */
	constructor(data, rules, messages, customValidators = {}) {
		//contains the validation errors.
		if (customValidators.constructor != Object) {
			throw "You must send your validator as a function inside of an object"
			return;
		}

		this.errors = {};

		//the data to be checked out.
		this.data = data;

		//the rules required.
		this.rules = rules;

		//Error messages container.
		this.messages = messages;

		this.loadHelpers(Helpers);
		this.extend(customValidators)
	}



	loadHelpers(helpers) {
		this.helpers = helpers;
	}


	extend(validators) {
		Object.assign(this.helpers, validators);
	}

	/**
	 * Create a new static instance.
	 *
	 * @param {Object} data required
	 * @param {Object} rules required
	 * @param {Object} messages optional
	 */
	static make(data = {}, rules = {}, messages = {}, customValidators = {}) {
		let validate = new Validator(data, rules, messages, customValidators);

		//Validate if 
		if (JSON.stringify(this.data) == '{}') throw "Add some data to validate: we received " + JSON.stringify(this.rules)

		return validate.exec();
	}

	/**
	 * Executes  validations rules.
	 *
	 * @returns {Object}
	 */
	exec() {
		let attr_rules = null;

		if (JSON.stringify(this.rules) == '{}') {
			throw "Add at least a rule: we received " + JSON.stringify(this.rules)
		}


		for (let attr in this.rules) {
			attr_rules =
				this.rules[attr].constructor == Array ? this.rules[attr] : this.rules[attr].split(',');
			this.check(attr, attr_rules);
		}

		return this.createResponse();
	}


	createResponse() {
		var errs = JSON.stringify(this.errors);
		var response = {
			fails() {
				return errs != '{}';
			},
			passes() {
				return errs == '{}'
			},
			messages: this.errors,
			first(attr) {
				if (this.hasErrors(attr)) {
					return this.messages[attr][0];
				}
				return null;
			},
			get(attr) {
				if (this.hasErrors(attr)) {
					return this.messages[attr];
				}
				return [];
			},
			hasErrors(attr) {
				if (this.messages[attr]) {
					if (this.messages[attr].length > 0) {
						return true;
					}
				}
				return false;
			}
		}

		return response
	}

	/**
	 * Validate each required attribute.
	 *
	 * @param {String} attribute
	 * @param {Array} rules
	 * @returns {Array}
	 */
	check(attribute, rules) {
		let value = this.data[attribute];

		for (let index in rules) {
			let err = null;
			let rule = rules[index];

			if (this.helpers[rule] && !this.helpers[rule](value)) { //Something like this.helpers.required && !this.helpers.required(value)

				if (typeof this.messages[attribute] == 'undefined') { //There is not any specific message for this attribute
					err = this.getDefaultMessage(attribute, rule);
				} else if (typeof this.messages[attribute][rule] == 'undefined') { // There is not any specific message for the rule of the attribute
					err = this.getDefaultMessage(attribute, rule);
				} else {
					err = this.messages[attribute][rule]
				}

				this.messageBag({
					key: attribute,
					error: err
				});

			}
		}
	}

	/**
	 * Returns a default message depending of the type of rule.
	 *
	 * @returns Promise
	 */
	getDefaultMessage(attribute, rule) {
		return messages_default[rule].replace(":attribute", attribute);
	}


	/**
	 * Store errors in a bag .
	 *
	 * @param {Object} data
	 * @return {Void}
	 */
	messageBag(data) {
		if (typeof this.errors[data.key] == 'undefined') {
			this.errors[data.key] = [];
		}
		if (this.errors[data.key].indexOf(data.error) == -1) {
			this.errors[data.key].push(data.error);
		}
	}
}


export default Validator;