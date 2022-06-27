const Goal = require('../bdi/Goal'); 
const Intention = require('../bdi/Intention'); 
const SolarPanels = require('./SolarPanels'); 



class SenseConsAgentGoal extends Goal {

    constructor (panels = []) {
        super()
        /** @type {Array<SolarPanels>} car */
        this.panels = panels
    }

}


class SenseConsAgentIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        /** @type {Array<SolarPanels>} car */
        this.panels = this.goal.panels
    }
    
    static applicable (goal) {
        return goal instanceof SenseConsAgentGoal
    }
    *exec () {
        var SensorConsAgentGoals = []
        for (let p of this.panels){
            let SensorConsGoalsAgentPromise = new Promise( async res => {
                while(true){
                    let warning = await p.notifyChange('intensity', 'panels')
                    if(warning == true){
                        for (var i = 0; i < 4; i++){
                            if(p.house.appliances[i].status_device == 'on'){
                                p.house.appliances[i].switch_OFF_device()
                                p.house.appliances[i].prev_status = 'on'
                            }
                        }
                    }
                    if ((warning == false)){
                        for (var j = 0; j < 4; j++){
                            if((p.house.appliances[j].status_device == 'off') && (p.house.appliances[j].prev_status == 'on')){
                                p.house.appliances[j].switch_ON_device()
                            }
                        }
                    }
                    
                }
            }); 
            SensorConsAgentGoals.push(SensorConsGoalsAgentPromise)
        }
            yield Promise.all(SensorConsAgentGoals)
    }
}

module.exports = {SenseConsAgentGoal, SenseConsAgentIntention}