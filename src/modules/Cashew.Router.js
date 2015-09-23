import { Utilities } from './Cashew.Utilities';

export class Router {
 
    constructor(){

        this.routes = {};
             
    }
    
    init(){
        
        var self = this;
        
        function routerHandler() {  

            // Current route url (getting rid of '#' in hash as well):
            var url = location.hash.slice(1) || '/';

            for(var i in self.routes) {

                var routeData = self.matchRoute(url, i);

                // Do we have a route? 
                if (typeof routeData === "object") {
                    self.routes[i].before.call(self, routeData);

                    self.routes[i].exec.call(self, routeData);

                    self.routes[i].after.call(self, routeData);

                    // we found our route, no need to continue...
                    break;
                }
            }
        }      
        
        // Listen on hash change...
        window.addEventListener('hashchange', routerHandler);  
    
        // Listen on page load...
        window.addEventListener('load', routerHandler);         
    }
    
    static getCurrentRoutes(){
        return this.routes;
    }    
    
    route(path, callback) {

        this.routes[path] = { exec: callback, before: this.before, after: this.after };
        return this;
    }

    before() {
        Utilities.log('Called before every route change...');
    }

    after(){ 
        Utilities.log('Called after every route change...');
    }    
    
    Redirect(path){
	if(path) {
	    window.location.hash = '#/' + path;
        }
	else {
	    window.location.hash = '#';
        }
    }       
    
    matchRoute(url, definedRoute) {
        
        // Current route url (getting rid of '#' in hash as well):
        var urlSegments = Utilities.StripTrailingSlash(url).split('/');
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
    
}