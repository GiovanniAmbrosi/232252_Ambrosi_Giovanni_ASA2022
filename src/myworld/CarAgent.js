const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const Clock = require('../utils/Clock')



class AgentCarGoal extends Goal {

    constructor (car = []) {
        super()
        this.car = car

    }

}

class AgentCarIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        
        this.car = this.goal.car
    }
    
    static applicable (goal) {
        return goal instanceof AgentCarGoal
    }

    *exec () {
        var agentCarGoals = []
        for (let c of this.car) {
            let agentCarPromise = new Promise( async res => {
                while(true){
                    await Clock.global.notifyChange('hh', 'car')
                    if(c.in_charge == 'on'){
                        c.get_charge()
                    }
                }
            });

            agentCarGoals.push(agentCarPromise)
        }
        yield Promise.all(agentCarGoals)
    }

}

module.exports = {AgentCarIntention, AgentCarGoal}