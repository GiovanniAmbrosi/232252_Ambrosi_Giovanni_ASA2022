const Observable = require('../utils/Observable');


class SolarPanels extends Observable{
    constructor(house, capacity){
        super()
        this.house = house
        this.set('intensity', false)
        this.set('capacity', capacity) //observable
    }
    production_during_time(time) {
        if((time < 6 || time > 18)){
            this.capacity = 0
            
            
        }
        else if((time >= 6 && time <= 12)){
            this.capacity = 3
            
        }
        else if((time > 12 && time <= 18)){
            this.capacity = 6
            
        }
    }

    get_capacity(){
        return this.capacity
    }

    return_overall_capacity(){
        var cons
        cons = this.capacity - this.house.utilities.electricity.consumption
        return cons
    }
    
    start_store_energy(diff){
        console.log('\nStoring energy in the batteries')
        return this.house.devices.battery_system.start_store(diff)
    }
        
}

module.exports = SolarPanels

