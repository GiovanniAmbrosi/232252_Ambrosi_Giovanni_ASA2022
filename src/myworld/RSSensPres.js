const Goal = require('../bdi/Goal'); 
const Intention = require('../bdi/Intention'); 
const RollerShutterRobot = require('./RollerShutterRobot'); 
 
 
 
class SensePresRSRobotGoal extends Goal { 
 
    constructor (robot = []) { 
        super() 
 
        /** @type {Array<RollerShutterRobot>} people */ 
        this.robot = robot 
    } 
 
} 
 
 
 
class SensePresRSRobotIntention extends Intention { 
     
    constructor (agent, goal) { 
        super(agent, goal) 
         
        /** @type {Array<RollerShutterRobot>} people */ 
        this.robot = this.goal.robot
    }
    static applicable (goal) { 
        return goal instanceof SensePresRSRobotGoal
    } 

    *exec () { 
        var robotGoals = [] 
        for (let w of this.robot) {             
            let robotGoalPromise = new Promise( async res => { 
                while (true) { 
                    let status = await w.notifyChange('in_room', 'roller_shutter')
                    this.agent.beliefs.declare('in_room roller_shutter_robot ' + w.in_room, status == w.in_room)
                    this.agent.beliefs.declare('in_room roller_shutter_robot ' + w.prev_in_room, status == w.prev_in_room)
                } 
            }); 
 
            robotGoals.push(robotGoalPromise) 
        } 
        yield Promise.all(robotGoals) 
    } 
} 
 
 
 
module.exports = {SensePresRSRobotGoal, SensePresRSRobotIntention}