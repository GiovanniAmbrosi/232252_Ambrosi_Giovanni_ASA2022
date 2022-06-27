const Observable = require('../utils/Observable');

class StatusRoom extends Observable{
    constructor (house, room) {
        super()
        this.house = house
        this.room = room
        this.set('status', 'clean')
    }
    change_status(status){
        this.status = status
    }

}

module.exports = StatusRoom