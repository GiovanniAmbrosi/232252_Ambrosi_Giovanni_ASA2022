const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const Clock = require('../utils/Clock');
const ElectricCar = require('./ElectricCar');


class SenseCarGoal extends Goal {

    constructor (car = []) {
        super()
        /** @type {Array<ElectricCar>} car */
        this.car = car

    }

}


class SenseCarIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        /** @type {Array<ElectricCar>} car */
        this.car = this.goal.car
    }
    
    static applicable (goal) {
        return goal instanceof SenseCarGoal
    }

    *exec () {
        var CarGoals = []
        for (let c of this.car) {
            let CarGoalPromise = new Promise( async res => {
                while (true){
                        let in_charge = await c.notifyChange('in_charge', 'car')
                        if(in_charge == 'on'){
                            this.agent.beliefs.declare('in_charge car', c.in_charge == in_charge)
                        }
                        else if(in_charge == 'off'){
                            this.agent.beliefs.declare('in_charge car', c.in_charge != in_charge)
                        }
                        

                    }
                });

            CarGoals.push(CarGoalPromise)
        }
        yield Promise.all(CarGoals)
    }

}


module.exports = {SenseCarGoal, SenseCarIntention}