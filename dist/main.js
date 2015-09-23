
var router = new Cashew.Router();

router.route('/', function(obj){ 

    console.log('This is the home route');

}).route('/about', function(obj){

    console.log('This is the about route');

}).route('/books/:id', function(obj){

    console.log('The id is ' + obj.id + ' and the query string is ' + obj.queryString);

}).init(); 