const pddlActionIntention = require('../pddl/actions/pddlActionIntention')


class FakeAction extends pddlActionIntention {

    *exec () {
        for ( let b of this.effect )
            this.agent.beliefs.apply(b)
        yield new Promise(res=>setTimeout(res,100))
        this.log('effects applied')
        // this.log(this.agent.beliefs)
    }

}

class PickUp extends FakeAction {

    static parameters = ['ob']
    static precondition = [ ['clear', 'ob'], ['on-table', 'ob'], ['empty'] ]
    static effect = [ ['holding', 'ob'], ['not empty'], ['not clear', 'ob'], ['not on-table', 'ob'] ]

}

class PutDown extends FakeAction {

    static parameters = ['ob']
    static precondition = [ ['holding', 'ob'] ]
    static effect = [ ['not holding', 'ob'], ['empty'], ['clear', 'ob'], ['on-table', 'ob'] ]

}

class Stack extends FakeAction {

    static parameters = ['x', 'y']
    static precondition = [ ['holding', 'x'], ['clear', 'y'] ]
    static effect = [ ['holding', 'x'], ['empty'], ['clear', 'x'], ['not clear', 'y'], ['on', 'x', 'y'] ]

}

class UnStack extends FakeAction {

    static parameters = ['x', 'y']
    static precondition = [ ['on', 'x', 'y'], ['clear', 'x'], ['empty'] ]
    static effect = [ ['holding', 'x'], ['not empty'], ['not clear', 'x'], ['clear', 'y'], ['not on', 'x', 'y'] ]

}

class TurnOnLight extends FakeAction {
    static parameters = ['x', 'room']
    static precondition = [ ['off', 'x', 'room'], ['not on', 'x', 'room'] ]
    static effect = [ ['on', 'x', 'room'], ['not off', 'x', 'room'] ]
}


module.exports = {PickUp, PutDown, Stack, UnStack, TurnOnLight}