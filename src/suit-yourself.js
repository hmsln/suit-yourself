'use strict';

module.exports = function () {

    var args = Array().slice.call(arguments);

	var path = args[0];   
    var availableSubmodules = args[1];
    
    var handleArgumentsElse;
    
    if (Object.prototype.toString.call(args[2]) == '[object Function]') {
	    handleArgumentsElse = args[2];
	}
	
	if (path === undefined || availableSubmodules === undefined) {
		throw new TypeError('Invalid parameters have been passed to module flexible-toolkit');
	}
	
	if (handleArgumentsElse === undefined) {
		var toRequireArgs = args.slice(2);
	} else {
		var toRequireArgs = args.slice(3);
	}
	
	//arguments to pass to submodules
	var toRequire = [];
	
	//check if an array of submodules has been passed
    if (Object.prototype.toString.call(toRequireArgs[0]) === '[object Array]') {
    	toRequire = toRequireArgs[0];
    } else{
    	/*
    	else: some arguments other than an array have been passed; use the user-supplied handleArgumentsElse function to parse them and return
    	appropriate submodules
    	*/
        
        //if no function has been supplied: error
        if (handleArgumentsElse === undefined) {
        	throw new Error('');
        }
		
		try {
			//use user-supplied function to parse arguments
            var argsToSubmodules = handleArgumentsElse(toRequireArgs);
			
			//parsed arguments are to be applied to all submodules
            for (var name in availableSubmodules) {
                toRequire.push({name: name, args: argsToSubmodules});
            }
		
        } catch (e) {
        	//if there's an error in the parsing of arguments other than an array
    		throw new TypeError('Invalid parameters have been passed');
        }
    }
    
    //object containing the submodules that are to be returned
    var toReturn = {};
    
	//require submodules from
    toRequire.forEach(function (s) {
    
		//require submodule
    	var submodule =  require(path + '/' + s.name + '.js');
    	
    	//if 'require' returns a factory, and arguments are to be passed, call it with those arguments
    	if (availableSubmodules[s.name].isFactory === true && s.args) {
    	
    		//if arguments aren't already an array, place them in one
    		toRequire[s.name] = Object.prototype.toString.call(s.args) != '[object Array]' ?
    			[s.args]:
    			s.args;
			
			//apply arguments to the factory that was supplied by the 'require' call
    		toReturn[s.name] = submodule.apply(null, toRequire[s.name]);
    	} else {
    		//else, just return the submodule
    		toReturn[s.name] = submodule;	
    	}
	});
	
    return toReturn;
};