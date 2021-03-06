export class Events {
 
    constructor(){ 
        this.eventList = { }; 
    }
    
    on(name, callback) {
        
        if(!this.eventList[name]) {
            this.eventList[name] = [];
        }
        this.eventList[name].push({callback:callback});
        console.log('Event ' + name + ' added');
    }
    off(name){
        if(this.eventList[name]) {
            delete this.eventList[name];
        }
    }   
    broadcast(name){
        for(let i in this.eventList){
            if(i === name) {
                let args = Array.prototype.slice.call(arguments);
                args.splice(0, 1);
                for(let j=0; j< this.eventList[name].length; j++) {
                    this.eventList[name][j].callback.apply(this, args);
                }
            }
        }        
    }    
    getEventList(){
        return this.eventList
    }
}