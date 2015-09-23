export class Utilities {
 
    constructor(){
          
        
    }    
    
    static log(msg) {
        console.log(msg);
    }     
    
    static StripTrailingSlash(str){

        // string is probably single '/', no need to strip last '/'
        if(str.length === 1) {
            return str;
        }
        else {
            if(str.charAt(str.length-1) === "/") { 
                str = str.substr(0, str.length - 1);
            }
            return str;
        }
    }    
    
}