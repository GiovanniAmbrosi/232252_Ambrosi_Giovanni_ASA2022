const Goal = require('../bdi/Goal'); 
const Intention = require('../bdi/Intention'); 
const SolarPanels = require('./SolarPanels'); 



class SenseConsGoal extends Goal {

    constructor (panels = []) {
        super()
        /** @type {Array<SolarPanels>} car */
        this.panels = panels
    }

}


class SenseConsIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        /** @type {Array<SolarPanels>} car */
        this.panels = this.goal.panels
    }
    
    static applicable (goal) {
        return goal instanceof SenseConsGoal
    }
    *exec () {
        var SensorConsGoals = []
        for (let p of this.panels){
            let SensorConsGoalsPromise = new Promise( async res => {
                while(true){
                    let warning = await p.notifyChange('intensity', 'solar panels')
                    this.agent.beliefs.declare('intensity ' + warning)
                }
            }); 
            SensorConsGoals.push(SensorConsGoalsPromise)
        }
            yield Promise.all(SensorConsGoals)
    }
}

module.exports = {SenseConsGoal, SenseConsIntention}
 