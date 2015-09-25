
var router = new Cashew.Router();
var events = new Cashew.Events();

events.on('customevent', function(){
    console.log('Event fired');
});
events.broadcast('customevent');
events.off('customevent');
events.broadcast('customevent');

router.route('/', function(obj){ 

    console.log('This is the home route');

}).route('/about', function(obj){

    console.log('This is the about route');

}).route('/books/:id', function(obj){

    console.log('The id is ' + obj.id + ' and the query string is ' + obj.queryString);

}).init(); 