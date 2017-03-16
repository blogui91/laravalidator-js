import Validator from './validator.js'

var data = {
	first_name: "Cesar.23@@santana.com", //Wrong
	email: "Cesar A",
	last_name: "",
};

var rules = {
	first_name: ['email'],
	age: ['onlycustomnumbers']
};
var messages = {
	last_name: {
		required: "last_name is required"
	},
	age: {
		required: "Este campo es requerido , compi",
		numeric: "Este campo debe ser numérico, compi",
		onlycustomnumbers: "Only custom numbers compi"
	}
};

var custom_validators = {
	onlycustomnumbers(value) {
		//enter your validation here
		return true
	},
	anothervalidator(value) {

	}
}

var validator = Validator.make(data, rules, messages, custom_validators);

if (validator.passes()) {
	console.log("Congratulations!")
}

if (validator.fails()) {
	console.log(validator.get('first_name'))
	console.log(validator.messages)
}