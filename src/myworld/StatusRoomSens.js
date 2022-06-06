const Observable = require('../utils/Observable');

class StatusRoom extends Observable{
    constructor (house, room) {
        super()
        this.house = house
        this.room = room
        this.set('status', 'clean')
    }
    change_status(){
        var stat = Math.round(Math.random())
        if(stat == 1){
            this.status = 'dirty'
        }
    }

}

module.exports = StatusRoom