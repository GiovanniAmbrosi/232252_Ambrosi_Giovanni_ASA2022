const Observable = require('../utils/Observable');

class Device extends Observable{
    constructor(house, room, consume, name){
        super()
        this.house = house
        this.consume = consume
        this.name = name
        this.set('room', room)
        this.set('prev_status', 'off')
        this.set('status_device', 'off')
    }
    switch_ON_device(){
        this.status_device = 'on'
        this.house.utilities.electricity.consumption += this.consume
        console.log('Device ' + this.name, 'switched on\n')
    }
    switch_OFF_device(){
        this.status_device = 'off'
        this.prev_status = 'on'
        this.house.utilities.electricity.consumption -= this.consume
        console.log('Device ' + this.name, 'switched off\n')
    }
}

module.exports = Device