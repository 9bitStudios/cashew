(function() {

    var Events = Cashew.Events.extend({});

    var BookModel = Cashew.Model.extend({

	initialize: function(){
	    console.log('Books');
	}
    });


    var HomeController = Cashew.Controller.extend({

	initialize: function(){
	    console.log('Home Controller initialized....');
	}
    });

    var AboutController = Cashew.Controller.extend({

	initialize: function(){
	    console.log('About Controller initialized....');
	}
    });

    var BookController = Cashew.Controller.extend({

	initialize: function(){
	    console.log('Book Controller initialized....');
	}
    });

    var events = new Events();
    events.on('form', function(){
	console.log('yay');
    });
    
    events.on('sss', function(){
	console.log('yay');
    });

    events.broadcast('form');
    console.log(events.getEventList());
	
    var book = new BookModel();
    
    var Router = Cashew.Router.extend({
	
	before:function(){
	    console.log('Custom before route');
	},
	after:function(){
	    console.log('Custom after route');
	}	
	
    });    
    
    var router = new Router();  
    
    router.route('/', function(obj){ 
	
	var home = new HomeController();
	
    }).route('/about', function(obj){
	
	var about = new AboutController();
	
    }).route('/books/:id', function(obj){
        
        console.log('The id is ' + obj.id + ' and the query string is ' + obj.queryString);
        
        var book = new BookController();
        
    });    
    
})();
