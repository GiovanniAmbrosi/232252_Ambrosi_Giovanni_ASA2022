const Goal = require('../bdi/Goal'); 
const Intention = require('../bdi/Intention'); 
const SolarPanels = require('./SolarPanels'); 
const Clock = require('../utils/Clock');


class AgentPanelsGoal extends Goal {

    constructor (panels = []) {
        super()
        /** @type {Array<SolarPanels>} car */
        this.panels = panels
    }

}


class AgentPanelsIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        /** @type {Array<SolarPanels>} car */
        this.panels = this.goal.panels
    }
    
    static applicable (goal) {
        return goal instanceof AgentPanelsGoal
    }
    *exec () {
        var panelsGoals = []
        for (let p of this.panels){
            let panelsGoalsPromise = new Promise( async res => {
                while(true){
                    let time = await Clock.global.notifyChange('hh', 'solar_panels')
                    //p.house.devices.solar_panels.production_during_time(time)
                    p.production_during_time(time)
                    var consume = p.capacity - p.house.utilities.electricity.consumption
                    console.log('Capacity of panels ', p.capacity)
                    console.log('Consume of the house ', p.house.utilities.electricity.consumption)
                    console.log('Energy stored/required ', consume)
                    if(consume > 0){
                        p.start_store_energy(consume)
                    }else{
                        p.house.devices.battery_system.use_batteries(consume)
                    }            
                
                }
            }); 
            panelsGoals.push(panelsGoalsPromise)
        }
            yield Promise.all(panelsGoals)
    }
}

module.exports = {AgentPanelsGoal, AgentPanelsIntention}