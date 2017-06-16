'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	Validator JS |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	(c) 2017 by Cesar Santana 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _messages_default = require('./messages_default');

var _messages_default2 = _interopRequireDefault(_messages_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
	/**
  * Create a new instance.
  *
  * @param {Object} data required
  * @param {Object} rules required
  * @param {Object} messages
  */
	function Validator(data, rules, messages) {
		var customValidators = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

		_classCallCheck(this, Validator);

		//contains the validation errors.
		if (customValidators.constructor != Object) {
			throw "You must send your validator as a function inside of an object";
			return;
		}

		this.errors = {};

		//the data to be checked out.
		this.data = data;

		//the rules required.
		this.rules = rules;

		//Error messages container.
		this.messages = messages;

		this.loadHelpers(_helpers2.default);
		this.extend(customValidators);
	}

	_createClass(Validator, [{
		key: 'loadHelpers',
		value: function loadHelpers(helpers) {
			this.helpers = helpers;
		}
	}, {
		key: 'extend',
		value: function extend(validators) {
			Object.assign(this.helpers, validators);
		}

		/**
   * Create a new static instance.
   *
   * @param {Object} data required
   * @param {Object} rules required
   * @param {Object} messages optional
   */

	}, {
		key: 'exec',


		/**
   * Executes  validations rules.
   *
   * @returns {Object}
   */
		value: function exec() {
			var attr_rules = null;

			if (JSON.stringify(this.rules) == '{}') {
				throw "Add at least a rule: we received " + JSON.stringify(this.rules);
			}

			for (var attr in this.rules) {
				this.createBag(attr);
				attr_rules = this.rules[attr].constructor == Array ? this.rules[attr] : this.rules[attr].split(',');
				this.check(attr, attr_rules);
			}

			return this.createResponse();
		}

		/**
   * Create an empty bag errors for each rule item.
   *
   * @returns {Object}
   */

	}, {
		key: 'createBag',
		value: function createBag(attr) {
			if (typeof this.errors[attr] == 'undefined') {
				this.errors[attr] = [];
			}
		}
	}, {
		key: 'createResponse',
		value: function createResponse() {
			var errs = JSON.stringify(this.errors);
			var response = {
				fails: function fails() {
					var _this = this;

					var keys = Object.keys(this.messages);
					var fails = false;
					keys.forEach(function (key) {
						if (_this.messages[key].length > 0) {
							fails = true;
						}
					});
					return fails;
				},
				passes: function passes() {
					return !this.fails();
				},

				messages: this.errors,
				first: function first(attr) {
					if (this.has(attr)) {
						return this.messages[attr][0];
					}
					return null;
				},
				get: function get(attr) {
					if (this.has(attr)) {
						return this.messages[attr];
					}
					return [];
				},
				has: function has(attr) {
					if (this.messages[attr]) {
						if (this.messages[attr].length > 0) {
							return true;
						}
					}
					return false;
				}
			};

			return response;
		}

		/**
   * Validate each required attribute.
   *
   * @param {String} attribute
   * @param {Array} rules
   * @returns {Array}
   */

	}, {
		key: 'check',
		value: function check(attribute, rules) {
			var value = this.data[attribute];

			for (var index in rules) {
				var err = null;
				var rule = rules[index];

				if (this.helpers[rule] && !this.helpers[rule](value)) {
					//Something like this.helpers.required && !this.helpers.required(value)

					if (typeof this.messages[attribute] == 'undefined') {
						//There is not any specific message for this attribute
						err = this.getDefaultMessage(attribute, rule);
					} else if (typeof this.messages[attribute][rule] == 'undefined') {
						// There is not any specific message for the rule of the attribute
						err = this.getDefaultMessage(attribute, rule);
					} else {
						err = this.messages[attribute][rule];
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

	}, {
		key: 'getDefaultMessage',
		value: function getDefaultMessage(attribute, rule) {
			return _messages_default2.default[rule].replace(":attribute", attribute);
		}

		/**
   * Store errors in a bag .
   *
   * @param {Object} data
   * @return {Void}
   */

	}, {
		key: 'messageBag',
		value: function messageBag(data) {
			if (typeof this.errors[data.key] == 'undefined') {
				this.errors[data.key] = [];
			}
			if (this.errors[data.key].indexOf(data.error) == -1) {
				this.errors[data.key].push(data.error);
			}
		}
	}], [{
		key: 'make',
		value: function make() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
			var customValidators = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

			var validate = new Validator(data, rules, messages, customValidators);

			//Validate if 
			if (JSON.stringify(this.data) == '{}') throw "Add some data to validate: we received " + JSON.stringify(this.rules);

			return validate.exec();
		}
	}]);

	return Validator;
}();

exports.default = Validator;
