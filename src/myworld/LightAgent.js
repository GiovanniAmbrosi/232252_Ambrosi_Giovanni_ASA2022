const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const Light = require('../myworld/Light');



class AgentLightGoal extends Goal {

    constructor (people = []) {
        super()
        /** @type {Array<Light>} people */
        this.people = people

    }

}

class AgentLightIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        
        this.people = this.goal.people
    }
    
    static applicable (goal) {
        return goal instanceof AgentLightGoal
    }

    *exec () {
        var agentPeopleGoals = []
        for (let p of this.people) {
            let agentPeoplePromise = new Promise( async res => {
                while(true){
                    let in_room = await p.notifyChange('pers_in_room', 'person')
                    var current_light = p.pers_in_room + '_light'
                    var prev_light = p.prev_room + '_light'
                    if(p.house.devices[current_light].status == 'off' ){
                        p.house.devices[current_light].switchOnLight()
                        p.house.devices[prev_light].switchOffLight(p.prev_room)
                    }
                
                    
            }
        });

            agentPeopleGoals.push(agentPeoplePromise)
        }
        yield Promise.all(agentPeopleGoals)
    }

}

module.exports = {AgentLightIntention, AgentLightGoal}