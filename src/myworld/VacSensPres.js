const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const StatusRoomSens = require('./VacuumCleaner');


class SensePresRobotGoal extends Goal {

    constructor (robot = []) {
        super()
        this.robot = robot

    }

}


class SensePresRobotIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        this.robot = this.goal.robot
    }
    
    static applicable (goal) {
        return goal instanceof SensePresRobotGoal
    }

    *exec () {
        var PresRobotGoals = []
        for (let r of this.robot) {
            let PresRobotGoalPromise = new Promise( async res => {
                while (true){
                        let status = await r.notifyChange('in_room', 'vacuum_cleaner')
                        this.agent.beliefs.declare('in_room vacuum_robot ' + r.in_room, status == r.in_room)
                        this.agent.beliefs.declare('in_room vacuum_robot ' + r.prev_in_room, status == r.prev_in_room)
                    }
                });

            PresRobotGoals.push(PresRobotGoalPromise)
        }
        yield Promise.all(PresRobotGoals)
    }

}


module.exports = {SensePresRobotGoal, SensePresRobotIntention}