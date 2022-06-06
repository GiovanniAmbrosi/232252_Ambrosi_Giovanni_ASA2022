const Goal = require('../bdi/Goal'); 
const Intention = require('../bdi/Intention'); 


class SenseConsGoal extends Goal {

    constructor (cons ) {
        super()
        this.cons = cons
    }
}


class SenseConsIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        this.cons = this.goal.cons
    }
    
    static applicable (goal) {
        return goal instanceof SenseConsGoal
    }
    *exec () {

        var consGoals
        for (let c of this.cons){
            let consGoalsPromise = new Promise( async res => {
                while(true){
                    let cons = await c.notifyChange('consumption')
                    this.agent.beliefs.declare("consumption " + cons)
                }
            });
        consGoals.push(consGoalsPromise)
        }
        yield Promiseall(consGoals)
    }
}

module.exports = {SenseConsGoal, SenseConsIntention}
 