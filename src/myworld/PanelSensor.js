const Goal = require('../bdi/Goal'); 
const Intention = require('../bdi/Intention'); 
const SolarPanels = require('./SolarPanels'); 



class SensePanelsGoal extends Goal {

    constructor (panels = []) {
        super()
        /** @type {Array<SolarPanels>} car */
        this.panels = panels
    }

}


class SensePanelsIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        /** @type {Array<SolarPanels>} car */
        this.panels = this.goal.panels
    }
    
    static applicable (goal) {
        return goal instanceof SensePanelsGoal
    }
    *exec () {
        var SensorPanelsGoals = []
        for (let p of this.panels){
            let SensorpanelsGoalsPromise = new Promise( async res => {
                while(true){
                    let prod = await p.notifyChange('capacity', 'panels')
                    this.agent.beliefs.declare('capacity ' + prod)
                }
            }); 
            SensorPanelsGoals.push(SensorpanelsGoalsPromise)
        }
            yield Promise.all(SensorPanelsGoals)
    }
}

module.exports = {SensePanelsGoal, SensePanelsIntention}