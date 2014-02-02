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
	},	
	
    });    
    
    var router = new Router();  
    
    router.route('/', function(url){ 
	
	var home = new HomeController();
	
    }).route('/about', function(url){
	
	var about = new AboutController();
	
    });    
    
})();
