const Goal = require('../bdi/Goal'); 
const Intention = require('../bdi/Intention'); 
const Person = require('./Person'); 
 
 
 
class SensePersonGoal extends Goal { 
 
    constructor (people = []) { 
        super() 
 
        /** @type {Array<Person>} people */ 
        this.people = people 
    } 
 
} 
 
 
 
class SensePeopleIntention extends Intention { 
     
    constructor (agent, goal) { 
        super(agent, goal) 
         
        /** @type {Array<Person>} people */ 
        this.people = this.goal.people 
    } 
     
    static applicable (goal) { 
        return goal instanceof SensePersonGoal
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
        var peopleGoals = [] 
        for (let p of this.people) {             
            let personGoalPromise = new Promise( async res => { 
                while (true) { 
                    let in_room = await p.notifyChange('in_room', 'people')
                    this.agent.beliefs.declare('in_room '+ p.in_room , in_room == p.in_room)
                    //this.agent.beliefs.declare('in_room glass_robot' + p.in_room, in_room = p.in_room)
                    var current_light = p.in_room + '_light'
                    var prev_light = p.prev_room + '_light'
                    //console.log(p.in_room)
                    //console.log(p.prev_room)
                    this.agent.beliefs.declare('light_on ' + current_light, p.house.devices[current_light].in_room != p.in_room)
                    this.agent.beliefs.declare('light_off ' + prev_light, p.house.devices[prev_light].in_room != p.in_room)
                    p.house.devices[current_light].in_room = p.in_room
                    p.house.devices[current_light].prev_room = p.prev_room
                    //console.log(p.house.devices[current_light].in_room)
                    //console.log(p.house.devices[current_light].prev_room)
                    //this.agent.beliefs.declare('light_on ' , p.house.devices.kitchen_light.status == 'off')
                } 
            }); 
 
            peopleGoals.push(personGoalPromise) 
        } 
        yield Promise.all(peopleGoals) 
    } 
} 
 
 
 
module.exports = {SensePersonGoal, SensePeopleIntention}
