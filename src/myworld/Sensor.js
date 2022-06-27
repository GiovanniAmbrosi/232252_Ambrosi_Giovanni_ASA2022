const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const Clock = require('../utils/Clock');


class SenseSensorGoal extends Goal {
    constructor (robot) {
        super()
        this.robot = robot
    }
}


class SenseSensorIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        this.robot = this.goal.robot
    }
    
    static applicable (goal) {
        return goal instanceof SenseSensorGoal
    }

    *exec () {
        while(true){
            let status = yield this.robot.notifyChange('in_room', 'robot_cleaner')
        }
    }
}

module.exports = {SenseSensorGoal, SenseSensorIntention}