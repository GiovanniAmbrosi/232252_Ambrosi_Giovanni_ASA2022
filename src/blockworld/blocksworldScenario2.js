const pddlActionIntention = require('../pddl/actions/pddlActionIntention')
const Agent = require('../bdi/Agent')
const Intention = require('../bdi/Intention')
const BlackboxGoal = require('../pddl/BlackboxGoal')
const BlackboxIntentionGenerator = require('../pddl/BlackboxIntentionGenerator')
const Clock = require('../utils/Clock')



/**
 * World agent
 */

const world = require('./world')



/**
 * Gripper agents
 */

class PickUp extends pddlActionIntention {
    static parameters = ['ob'];
    static precondition = [ ['clear', 'ob'], ['on-table', 'ob'], ['empty'] ];
    static effect = [ ['holding', 'ob'], ['not empty'], ['not clear', 'ob'], ['not on-table', 'ob'] ];
    *exec ({ob}=parameters) {
        yield world.pickUp({ob})
    }
}

class PutDown extends pddlActionIntention {
    static parameters = ['ob'];
    static precondition = [ ['holding', 'ob'] ];
    static effect = [ ['not holding', 'ob'], ['empty'], ['clear', 'ob'], ['on-table', 'ob'] ];
    *exec ({ob}=parameters) {
        yield world.putDown({ob})
    }
}

class Stack extends pddlActionIntention {
    static parameters = ['x', 'y'];
    static precondition = [ ['holding', 'x'], ['clear', 'y'] ];
    static effect = [ ['holding', 'x'], ['empty'], ['clear', 'x'], ['not clear', 'y'], ['on', 'x', 'y'] ];
    *exec ({x,y}=parameters) {
        yield world.stack({x: x, y: y})
    }
}

class UnStack extends pddlActionIntention {
    static parameters = ['x', 'y'];
    static precondition = [ ['on', 'x', 'y'], ['clear', 'x'], ['empty'] ];
    static effect = [ ['holding', 'x'], ['not empty'], ['not clear', 'x'], ['clear', 'y'], ['not on', 'x', 'y'] ];
    *exec ({x,y}=parameters) {
        yield world.unStack({x: x, y: y})
    }
}

class TurnOnLight extends pddlActionIntention {
    static parameters = ['x', 'room'];
    static precondition = [ ['off', 'x', 'room'] ];
    static effect = [ ['on', 'x', 'room'], ['not off', 'x', 'room'] ];
    *exec ({x,room}=parameters) {
        yield world.TurnOnLight({x: x, room: room})
    }
}

class ReplanningIntention extends Intention {
    static applicable (goal) {
        return goal instanceof BlackboxGoal
    }
    *exec (parameters) {
        yield new Promise(res=>setTimeout(res,1100))
        yield this.agent.postSubGoal( new BlackboxGoal(parameters) )
    }
}






{
Clock.global.observe('hh', (hh) => {
    var time = Clock.global
    if(time.hh == 8){
        console.log('hour = ', time.hh)
        let a1 = new Agent('a1')
        world.beliefs.observeAny( (value,key,observable)=>{value?a1.beliefs.declare(key):a1.beliefs.undeclare(key)} )
        a1.intentions.push(BlackboxIntentionGenerator([PickUp, PutDown, Stack, UnStack]))
        a1.intentions.push(ReplanningIntention)
        // console.log('a1 entries', a1.beliefs.entries)
        // console.log('a1 literals', a1.beliefs.literals)
        a1.postSubGoal( new BlackboxGoal( { goal: ['holding a'] } ) ) // by default give up after trying all intention to achieve the goal
    }
    })
    Clock.startTimer()
}
{
    let a2 = new Agent('a2')
    world.beliefs.observeAny( (value,key,observable)=>{value?a2.beliefs.declare(key):a2.beliefs.undeclare(key)} )
    a2.intentions.push(BlackboxIntentionGenerator([PickUp, PutDown, Stack, UnStack, TurnOnLight]))
    a2.intentions.push(ReplanningIntention)
    a2.postSubGoal( new BlackboxGoal( { goal: ['holding a'] } ) ) // loop over intentions trying to achieve the goals up to 5 times
}
/*
{
    let a3 = new Agent('a3')
    // a2.beliefs.declare('on-table a')
    // a2.beliefs.declare('on b a')
    // a2.beliefs.declare('clear b')
    // a2.beliefs.declare('empty')
    world.beliefs.observeAny( (value,key,observable)=>{value?a3.beliefs.declare(key):a3.beliefs.undeclare(key)} )
    a3.intentions.push(BlackboxIntentionGenerator([TurnOnLight]))
    a3.intentions.push(ReplanningIntention)
    // console.log('a2 entries', a2.beliefs.entries)
    // console.log('a2 literals', a2.beliefs.literals)
    a3.postSubGoal( new BlackboxGoal( { goal: ['on x kitchen'] } ) ) // loop over intentions trying to achieve the goals up to 5 times
}
*/


world.beliefs.declare('on-table a')
world.beliefs.declare('on b a')
world.beliefs.declare('clear b')
world.beliefs.declare('empty')
world.beliefs.declare('off x kitchen')
