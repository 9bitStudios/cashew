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
	var subUid = -1;
	
	var broadcast = function ( topic, args ) {

	    if (!eventList[topic]) {
		return false;
	    }

	    setTimeout(function () {
		var subscribers = eventList[topic];
		var len;
		
		if(subscribers)
		    len = subscribers.length;
		else
		    len = 0;
		
		while (len--) {
		    subscribers[len].func(topic, args);
		}
	    }, 0);
	    
	    return true;
	};

	var on = function ( topic, func ) {

	    if (!eventList[topic]) {
		eventList[topic] = [];
	    }

	    var token = (++subUid).toString();
	    eventList[topic].push({
		token: token,
		func: func
	    });
	    return token;
	};

	var off = function ( token ) {
	    for (var e in eventList) {
		if (eventList[e]) {
		    for (var i = 0, j = eventList[e].length; i < j; i++) {
			if (eventList[e][i].token === token) {
			    eventList[e].splice(i, 1);
			    return token;
			}
		    }
		}
	    }
	    return false;
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
    
    /**** CANVAS ****/
    
    var Canvas = function(){ };
    Canvas.prototype = {
	
	defaults: {
	    width: 500,
	    height: 500
	},
	
	initialize: function(){ 
	    console.log('New canvas initialized');
	},
	create: function(width, height){
	    
	    if(typeof width === 'undefined')
		width = this.defaults.width;
	    
	    if(typeof height === 'undefined')
		height = this.defaults.height;	    
	    
	    var canvas = document.createElement("canvas");
	    var ctx = canvas.getContext("2d");
	    canvas.width = width;
	    canvas.height = height;
	    document.body.appendChild(canvas);
	},
	update: function() {
	    
	},
	render: function() {
	    
	}
    }; 
    
    /**** MODEL ****/
    
    var Model = function(){ };
    
    Model.prototype = {
	initialize: function(){ }
    };
    
    /**** INHERITANCE ****/
    
    /* Simple JavaScript Inheritance
     * By John Resig http://ejohn.org/
     * MIT Licensed.
     */
      
    var extend = function(prop) {
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

      // And make this class extendable
      Class.extend = arguments.callee;

      return Class;
    };      
    
    Events.extend = extend;
    Model.extend = extend;
    Canvas.extend = extend;
    
    /**** RETURN STUFF ****/
    
    return {
	Config: Config,
	Events: Events,
	Model:  Model,
	Canvas: Canvas
    };
    
})();
