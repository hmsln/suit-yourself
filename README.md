# Suit Yourself

```suit-yourself``` is an open source module that allows you to load submodules selectively from a source folder, and to pass parameters to them.

## Example
```javascript
var suitYourself = require('suit-yourself');

//path of the folder containing the submodules
var path = __dirname + '/submodules';

//available submodules
var availableSubmodules = {
	'submodule1': {},
    'submodule2': {
    	isFactory: true
    }
};

//submodules to require, with their arguments if applies
var toRequire = [
    {
       name: 'submodule1'
    },
	{
        name: 'submodule2',
        args: 'argument'
    }
];

//import the submodules
var submodules = suitYourself(path, availableSubmodules, toRequire);
```
### Optional middleware function
```javascript
//you can pass a middleware function to define default parameters to pass to all modules
var handleArgumentsElse = function (toRequire) { 
    //here, we want to pass true to all submodules if no toRequire object has been passed
    if (toRequire.length == 0) {
        return true;
    } else {
        return toRequire;
    }
}

//import the submodules
var submodules = suitYourself(path, availableSubmodules, handleArgumentsElse, toRequire);
//use the submodules
//submodules.submodule1...
//submodules.submodule2...

```

## Tests

The test spec is in ```/test/test.spec.js```, and the test suite is ```jasmine-node```, which you can install by
running ```npm install -g jasmine-node```

You can run the tests with the commands ```jasmine-node test``` or ```npm run test```

## Contact
Thank you for reading this far. If you have any bugs to report or improvements to suggest you can send me an email
at hubert.maslin@gmail.com.