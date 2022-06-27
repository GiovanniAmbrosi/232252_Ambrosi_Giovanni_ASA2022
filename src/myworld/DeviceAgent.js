const Goal = require('../bdi/Goal'); 
const Intention = require('../bdi/Intention'); 
const Person = require('./Person'); 
 
 
 
class SenseDeviceGoal extends Goal { 
 
    constructor (people = []) { 
        super() 
 
        /** @type {Array<Person>} people */ 
        this.people = people 
    } 
 
} 
 
 
 
class SenseDeviceIntention extends Intention { 
     
    constructor (agent, goal) { 
        super(agent, goal) 
         
        /** @type {Array<Device>} people */ 
        this.people = this.goal.people 
    } 
     
    static applicable (goal) { 
        return goal instanceof SenseDeviceGoal
    } 
 
    *exec () { 
        var deviceGoals = [] 
        for (let p of this.people) {             
            let deviceGoalPromise = new Promise( async res => { 
                while (true) { 
                    let in_room = await p.notifyChange('pers_in_room', 'device')
                    switch(in_room){
                        case 'kitchen':
                            if((p.house.appliances[0].status_device == 'off')){
                                p.house.appliances[0].switch_ON_device()  
                            }                       
                            break
                        case 'living_room_0':
                            if((p.house.appliances[1].status_device == 'off') || (p.house.appliances[1].prev_status == 'on')){
                                p.house.appliances[1].switch_ON_device()   
                            }         
                            break
                        case 'laundry_room':
                            if((p.house.appliances[2].status_device == 'off') || (p.house.appliances[2].prev_status == 'on')){
                                p.house.appliances[2].switch_ON_device()    
                            }         
                            break
                    }
                } 
            }); 
 
            deviceGoals.push(deviceGoalPromise) 
        } 
        yield Promise.all(deviceGoals) 
    } 
} 
 
 
 
module.exports = {SenseDeviceGoal, SenseDeviceIntention}