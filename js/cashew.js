// Cashew.js 0.0.1
// (c) 2013 9bit Studios


var Cashew = window.Cashew = (function(){
    
    /**** CONFIG ****/
    
    var Config = {
	VERSION: '0.0.1',
	DEBUG: true
    };         
    
    /**** EVENTS ****/
         
    var Events = function(){ 
	
	var eventList = {};
	
	var on = function(name, callback) {

	    if(!eventList[name])
		eventList[name] = [];

	    eventList[name].push({callback:callback});

	};
	var off = function(name){
	    if(eventList[name])
		delete eventList[name];

	};
	var broadcast = function(name){

	    for(var i in eventList){
		if(i === name) {
		    var args = Array.prototype.slice.call(arguments);
		    args.splice(0, 1);
		    for(var j=0; j< eventList[name].length; j++) {
			eventList[name][j].callback.apply(this, args);
		    }
		}
	    }
	    
	};

	var getEventList = function(){
	    return eventList;
	};

	return {
	    getEventList: getEventList,
	    broadcast: broadcast,
	    on: on,
	    off: off
	};
    };
    
    /**** MODEL ****/
    
    var Model = function(){ };
    
    Model.prototype = {
	initialize: function(){ },
	destructor: function() { }
    };
    
    /**** CONTROLLER ****/
    
    var Controller = function(){ };
    
    Controller.prototype = {
	initialize: function() { },
	destructor: function() { }
    };    
    
    /**** VIEW ****/
    
    var View = function(){ };
    
    View.prototype = {
	initialize: function() { },
	destructor: function() { }
    };     
    
    
    /**** ROUTER ****/
    
    var routes = {};  
    var Router = function(){ };
    
    Router.prototype = {
	
	initialize: function() { 
	    console.log('Router initialized');
	},

	route: function(path, callback) {
	    
	    routes[path] = { exec: callback, before: this.before, after: this.after };
	    return this;
	},
	
	before: function() {
	    console.log('Called before every route change...');
	},
	
	after: function(){ 
	    console.log('Called after every route change...');
	}
	
    };
    
    function matchRoute(url, definedRoute) {

        // Current route url (getting rid of '#' in hash as well):
        var urlSegments = url.split('/');
        var routeSegments = definedRoute.split('/');
        var routeObject = {};

        if(urlSegments.length !== routeSegments.length) {
            // not a match
            return false;
        }
        else {   

            for(var i = 0; i < urlSegments.length; i++) {
                if(urlSegments[i].toLowerCase() === routeSegments[i].toLowerCase()) {
                    // matched path
                    continue;
                }
                else if (routeSegments[i].indexOf(':') === 0) {
                    // matched a param, remove query string (which is handled below) and push id onto object
                    var val = routeSegments[i].replace(':','');
                    val = val.split('?')[0];
                    routeObject[val] = urlSegments[i].split('?')[0];
                }
                else {
                    // not a match
                    return false;
                }
            }        
        }

        // did we reach the end? Get querystring, if any...
        var hash = window.location.hash.split("?")[1];
        
        if(typeof hash !== "undefined") {
           
           var queryString = hash.split('&'); 
           var queryStringObject = {};

           for(var i = 0; i < queryString.length; i++) {
               var currentParameter = queryString[i].split("=");
               queryStringObject[currentParameter[0]] = currentParameter[1];
           }

           routeObject.queryString = queryStringObject;           
            
        }
        
        // after all is finished, return the route object to pass to router for use by controller
        return routeObject;

    }        
    
    function routerHandler () {  
	
	// Current route url (getting rid of '#' in hash as well):
	var url = location.hash.slice(1) || '/';	
	
        for(var i in routes) {
            
            var routeData = matchRoute(url, i);
            
            // Do we have a route? 
            if (typeof routeData === "object") {
                routes[i].before.call(this, routeData);

                routes[i].exec.call(this, routeData);
                
                routes[i].after.call(this, routeData);
            }
        }
    } 
    
    // Listen on hash change...
    window.addEventListener('hashchange', routerHandler);  
    
    // Listen on page load...
    window.addEventListener('load', routerHandler);        
    
     /**** REDIRECT ****/
     
    var Redirect = function(path){
	if(path)
	    window.location.hash = '#/' + path;
	else
	    window.location.hash = '#';
    }    
    
    /**** INHERITANCE ****/
    
    /* Simple JavaScript Inheritance
     * By John Resig http://ejohn.org/
     * MIT Licensed.
     */
      
    var extend = function extender(prop) {
      var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;  
      var _super = this.prototype;

      // Instantiate a base class (but only create the instance,
      // don't run the init constructor)
      initializing = true;
      var prototype = new this();
      initializing = false;

      // Copy the properties over onto the new prototype
      for (var name in prop) {
	// Check if we're overwriting an existing function
	prototype[name] = typeof prop[name] === "function" &&
	  typeof _super[name] === "function" && fnTest.test(prop[name]) ?
	  (function(name, fn){
	    return function() {
	      var tmp = this._super;

	      // Add a new ._super() method that is the same method
	      // but on the super-class
	      this._super = _super[name];

	      // The method only need to be bound temporarily, so we
	      // remove it when we're done executing
	      var ret = fn.apply(this, arguments);        
	      this._super = tmp;

	      return ret;
	    };
	  })(name, prop[name]) :
	  prop[name];
      }

      // The dummy class constructor
      function Class() {
	// All construction is actually done in the init method
	if ( !initializing && this.initialize )
	  this.initialize.apply(this, arguments);
      }

      // Populate our constructed prototype object
      Class.prototype = prototype;

      // Enforce the constructor to be what we expect
      Class.prototype.constructor = Class;

      // And make this class extendables
      Class.extend = extender;

      return Class;
    };      
    
    Events.extend = extend;
    Model.extend = extend;
    Controller.extend = extend; 
    View.extend = extend;
    Router.extend = extend;
    
    /**** RETURN STUFF ****/
    
    return {
	Config: Config,
	Events: Events,
	Model:  Model,
	Controller:  Controller,
	View: View,
	Router: Router,
	Redirect: Redirect
    };
    
})();
