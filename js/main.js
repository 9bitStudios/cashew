(function() {

    var Events = Cashew.Events.extend({});
    var BookModel = Cashew.Model.extend({});

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
      
    var BookView = Cashew.View.extend({});  

    var BookController = Cashew.Controller.extend({
	initialize: function(){
            console.log('Book Controller initialized....');
            var book = new BookModel();
            book.set({title: "The Grapes of Wrath"});
            var view = new BookView(book, 'book-template', 'container');
	    view.render();
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
	
	new HomeController();
	
    }).route('/about', function(obj){
	
	new AboutController();
	
    }).route('/books/:id', function(obj){
        
        console.log('The id is ' + obj.id + ' and the query string is ' + obj.queryString);
        
        new BookController();    
        
        
    });    
    
})();
