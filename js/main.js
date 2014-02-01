(function() {

    var Events = Cashew.Events.extend({});

    var Model = Cashew.Model.extend({

	initialize: function(){
	    console.log('Something');
	}
    });

    var Canvas = Cashew.Canvas.extend({});
    
    var c = new Canvas();
    c.create();
    var events = new Events();
    events.on('form', function(){
	console.log('yay');
    });
    
    events.on('sss', function(){
	console.log('yay');
    });

    events.broadcast('form');
    var m = new Model();
    
    console.log(events.getEventList());
    
    var Router = Cashew.Router.extend({});
    
    var router = new Router();
    
    router.route('/', 'HomeTemplate', function(){
	console.log('Home');
    });
    router.route('/about', 'AboutTemplate', function(){
	console.log('about');
    });    
    
})();
