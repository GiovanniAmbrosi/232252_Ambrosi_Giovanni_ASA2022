const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const VacuumCleaner = require('./VacuumCleaner');
const StatusRoomSens = require('./VacuumCleaner');


class SenseRobotGoal extends Goal {

    constructor (robot = []) {
        super()
        /** @type {Array<VacuumCleaner>} people */
        this.robot = robot

    }

}


class SenseRobotIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        /** @type {Array<VacuumCleaner>} people */
        this.robot = this.goal.robot
    }
    
    static applicable (goal) {
        return goal instanceof SenseRobotGoal
    }

    *exec () {
        var RobotGoals = []
        for (let r of this.robot) {
            let RobotGoalPromise = new Promise( async res => {
                while (true){
                        let status = await r.notifyChange('status', 'rooms')
                        this.agent.beliefs.declare('clean ' + r.room, status == 'clean')
                        this.agent.beliefs.declare('dirty ' + r.room, status == 'dirty')
                    }
                });

            RobotGoals.push(RobotGoalPromise)
        }
        yield Promise.all(RobotGoals)
    }

}


module.exports = {SenseRobotGoal, SenseRobotIntention}