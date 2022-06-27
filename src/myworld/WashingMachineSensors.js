const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const Person = require('./Person')



class SenseWashMachGoal extends Goal {

    constructor (person) {
        super()

        /** @type {Person} light */
        this.person = person

    }

}



class SenseWashMachIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)

        /** @type {Person} light */
        this.person = this.goal.person
    }

    static applicable (goal) {
        return goal instanceof SenseWashMachGoal
    }

    *exec () {
        while (true) {
            let status = yield this.person.notifyChange('pers_in_room', 'Elisabetta')
            if((status == 'laundry_room')){
                this.agent.beliefs.declare('clothes_in clothes')
            }
        }
    }

}



module.exports = {SenseWashMachGoal, SenseWashMachIntention}




