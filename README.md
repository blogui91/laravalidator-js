# JS Validator

JS validator is a small library inspired in Laravel Validator, it's minimal but powerful, allowing you validating some kind of data. However, it allows you extend custom validators in easy manner!.

# Instalation
```
    npm install laravalidator-js
	
```

# Example

```js
	import Validator from 'laravalidator-js'

	let data = {
		first_name: "Cesar.23@@santana.com", //Wrong
		email: "Cesar A",
		last_name: "",
	};

	let rules = {
		first_name: ['email'],
		age: ['customvalidator']
	};
	let messages = {
		last_name: {
			required: "last_name is required"
		},
		age: {
			required: "Este campo es requerido , dude",
			numeric: "Este campo debe ser numérico, dude",
			customvalidator: "Only custom numbers dude"
		}
	};

	let custom_validators = {
		customvalidator(value) {
			//enter your validation here
			return true
		},
		anothervalidator(value) {

		}
	}

	let validator = Validator.make(data, rules, messages, custom_validators);

	if (validator.passes()) {
		console.log("Congratulations!")
	}

	if (validator.fails()) {
		console.log(validator.messages)
	}

```

# Contributing

Please feel free in openning an issue if you have any problem or have any idea to improve, even in creating pull requests :)

