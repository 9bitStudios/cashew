import {Utilities} from './Cashew.Utilities';
import {Events} from './Cashew.Events';
import {Router} from './Cashew.Router';
import {Model} from './Cashew.Model';
import {Controller} from './Cashew.Controller';

class Cashew {
    
    constructor(){
        this.Utilities = Utilities;
        this.Events = Events;
        this.Router = Router;
        this.Model = Model;
        this.Controller = Controller;
    }
}

global.Cashew = new Cashew();
