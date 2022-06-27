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
 
    *exec () { 
        var peopleGoals = [] 
        for (let p of this.people) {             
            let personGoalPromise = new Promise( async res => { 
                while (true) { 
                    let in_room = await p.notifyChange('pers_in_room', 'people')
                    var current_light = p.pers_in_room + '_light'
                    var prev_light = p.prev_room + '_light'
                    this.agent.beliefs.declare('pers_in_room ' + p.pers_in_room , in_room == p.pers_in_room)
                    this.agent.beliefs.declare('light_on ' + current_light, p.house.devices[current_light].in_room != p.in_room)
                    this.agent.beliefs.declare('light_off ' + prev_light, p.house.devices[prev_light].in_room != p.in_room)
                    //p.house.devices[current_light].in_room = p.in_room
                    //p.house.devices[current_light].prev_room = p.prev_room
                } 
            }); 
 
            peopleGoals.push(personGoalPromise) 
        } 
        yield Promise.all(peopleGoals) 
    } 
} 
 
 
 
module.exports = {SensePersonGoal, SensePeopleIntention}
