const Goal = require('../bdi/Goal'); 
const Intention = require('../bdi/Intention'); 
const Window = require('./Window'); 
 
 
 
class SenseWindowGoal extends Goal { 
 
    constructor (window = []) { 
        super() 
 
        /** @type {Array<Window>} people */ 
        this.window = window 
    } 
 
} 
 
 
 
class SenseWindowIntention extends Intention { 
     
    constructor (agent, goal) { 
        super(agent, goal) 
         
        /** @type {Array<Window>} people */ 
        this.window = this.goal.window 
    } 
     
    static applicable (goal) { 
        return goal instanceof SenseWindowGoal
    } 
 
    /** 
     * To run code in parallel use postSubGoal without wait or yield. For example: 
     *  
     * for (let l of this.people) { 
     *      let lightGoalPromise = this.agent.postSubGoal( new SenseOneLightGoal(l) ) 
     *      lightsGoals.push(lightGoalPromise) 
     * } 
     * Or put paraller code in Promises callback and do not wait or yield for them neither. For example: 
     *  
     * for (let l of this.people) { 
     *      let lightGoalPromise = new Promise( async res => { 
     *          while (true) { 
     *              let status = await l.notifyChange('status') 
     *              this.log('sense: light ' + l.name + ' switched ' + status) 
     *              this.agent.beliefs.declare('light_on '+l.name, status=='on') 
     *              this.agent.beliefs.declare('light_off '+l.name, status=='off') 
     *          } 
     *      }); 
     * } 
     */ 
    *exec () { 
        var windowGoals = [] 
        for (let w of this.window) {             
            let windowGoalPromise = new Promise( async res => { 
                while (true) { 
                    let brightness = await w.notifyChange('brightness', 'window')
                    console.log(w.name)
                    this.agent.beliefs.declare('bright ',  brightness == 'bright')
                    this.agent.beliefs.declare('dark ', brightness == 'dark')
                } 
            }); 
 
            windowGoals.push(windowGoalPromise) 
        } 
        yield Promise.all(windowGoals) 
    } 
} 
 
 
 
module.exports = {SenseWindowGoal, SenseWindowIntention}