const Observable = require('../utils/Observable');

class StatusRollerShutter extends Observable{
    constructor (house, room, pos) {
        super()
        this.house = house
        this.room = room
        this.set('pos', pos)
        this.set('status', 'close')
    }
}

module.exports = StatusRollerShutter