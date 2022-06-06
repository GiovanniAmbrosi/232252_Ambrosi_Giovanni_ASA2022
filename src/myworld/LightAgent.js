const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const Light = require('../myworld/Light');



class AgentLightGoal extends Goal {

    constructor (lights = []) {
        super()
        /** @type {Array<Light>} people */
        this.lights = lights

    }

}

class AgentLightIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        
        this.lights = this.goal.lights
    }
    
    static applicable (goal) {
        return goal instanceof AgentLightGoal
    }

    *exec () {
        var agentLightGoals = []
        for (let l of this.lights) {
            let agentLightPromise = new Promise( async res => {
                while(true){
                    let in_room = await l.notifyChange('in_room', 'person')
                    if(l.status == 'off' ){
                        l.switchOnLight(in_room)
                        l.switchOffLight(l.prev_room)
                    }
            }
        });

            agentLightGoals.push(agentLightPromise)
        }
        yield Promise.all(agentLightGoals)
    }

}

module.exports = {AgentLightIntention, AgentLightGoal}