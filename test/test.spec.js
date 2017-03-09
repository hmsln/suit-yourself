'use strict';

var suitYourself = require('../src/suit-yourself.js');

var suitYourself = require('../src/suit-yourself.js');

var path = __dirname + '/test-submodules';

var availableSubmodules = {
	'submodule1': {},
    'submodule2': {
    	isFactory: true
    }
};

var argument = 'argument';

var submodules = suitYourself(path, availableSubmodules, [
    {
       name: 'submodule1'
    },
	{
        name: 'submodule2',
        args: argument
    }
]);

describe('suit yourself', function () {
	
	it('loads specified submodule', function () {
        expect(submodules.submodule1('argument')).toEqual('argument');
    });
    
    it('loads specified submodule with specified arguments', function () {
        expect(submodules.submodule2()).toEqual('argument');
    });
    
    it('loads both submodules together', function () {
    	expect(submodules.submodule1('argument')).toEqual('argument');
        expect(submodules.submodule2()).toEqual('argument');
    });
});