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

# Extending Validator

Using the validator as seen above may be tricky if your data to validate has many fields and then maybe you should create your own Validator, for example:

```js
//validators/Client.validator.js
import Validator from 'laravalidator-js'

export class ClientValidator extends Validator
{
    constructor(data){
        super()

        this.rules = {
		'fullname' : 'required',
		'email' : 'emailSometimes',
		'phone' : 'required',
        }

        this.data = data

        this.messages = {
           fullname :{
			   required : 'The fullname is required! :)'
		   },
		   email : {
			   emailSometimes : 'This is not an email, malformed email blablabla'
		   }
		   //as we have not defined a message for phone, the default will be 'The field phone is required'
         }

		//Extending Custom validators
        this.extend({
            emailSometimes(data){
                if(!data) return true

                let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		        return regexp.test(data);
            }
        })
    }

    static make(data = {})
    {
        let validate = new ClientValidator(data);
        return validate.exec()
    }


}
```

Finally in your main file you can use it like this:

```js
import ClientValidator from 'validators/Client.validator'


let data_to_validate = {
	email : 'wrongemal.com',
	phone : null,
	fullname : 'Cesar Santana'
}

let validator = ClientValidator.make(data_to_validate);

if(validator.fails()){
	console.log(validator.messages) //Show errors
}


```

The variable ```validator```  returns an object with these properties:

``` has() : Boolean //Verify if a specified item has error. ```

``` first() : Array //Get the first field with error. ```

``` get() : Array //Get a specified field with error. ```

``` passes() : Boolean //Check if the validation does not have errors. ```

``` fails() : Boolean // Check if validation has errors. ```



# Contributing

Please feel free in openning an issue if you have any problem or have any idea to improve, even in creating pull requests :)

