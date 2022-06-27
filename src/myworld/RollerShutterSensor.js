const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const RollerShutterRobot = require('./RollerShutterRobot');



class SenseRobotShutterGoal extends Goal {

    constructor (robot = []) {
        super()
        /** @type {Array<RollerShutterRobot>} people */
        this.robot = robot

    }

}


class SenseRobotShutterIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        /** @type {Array<RollerShutterRobot>} people */
        this.robot = this.goal.robot
    }
    
    static applicable (goal) {
        return goal instanceof SenseRobotShutterGoal
    }

    *exec () {
        var RobotGoals = []
        for (let r of this.robot) {
            let RobotGoalPromise = new Promise( async res => {
                while (true){
                        let status = await r.notifyChange('status', 'roller_shutter')
                        this.agent.beliefs.declare('open rs ' + r.room, status == 'open')
                        this.agent.beliefs.declare('close rs ' + r.room, status == 'close')
                    }
                });

            RobotGoals.push(RobotGoalPromise)
        }
        yield Promise.all(RobotGoals)
    }

}


module.exports = {SenseRobotShutterGoal, SenseRobotShutterIntention}