(function() {

    var Events = Cashew.Events.extend({});
    var events = new Events();
    
    var HomeController = Cashew.Controller.extend({

	initialize: function(){
	    console.log('Home Controller initialized....');
	}
    });

    var AboutView = Cashew.View.extend(); 
    var AboutController = Cashew.Controller.extend({

	initialize: function(){
	    var view = new AboutView(null, 'about-template', 'container');
            view.render();
	}
    });
    
    var BookModel = Cashew.Model.extend();
    var BookView = Cashew.View.extend();  
    var BookController = Cashew.Controller.extend({
	initialize: function(){
            console.log('Book Controller initialized....');
            var book = new BookModel();
            book.set({title: "The Grapes of Wrath"});
            events.broadcast('bookupdated', book);
            var view = new BookView(book, 'book-template', 'container');
	    view.render();
	}
    });

    events.on('bookupdated', function(book){
        
	console.log('Updated book model: ' + book.get().title);
    });
	
    
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
