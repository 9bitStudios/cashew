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

    var BookController = Cashew.Controller.extend({
	initialize: function(){
	    console.log('Book Controller initialized....');
	},
        getBook: function(id) {
            console.log('This is an extending function that will get book ' + id);
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
        book.getBook(obj.id);
        
        var book = new BookModel();
        book.ajax({
            url: "api.php",
            method: "GET",
            headers: {},
            data: {},
            success: function(data) {
                console.log('The data is ' + data);
            },
            error: function(ex) {
                console.log(ex);
            }
        });        
        
    });    
    
})();
