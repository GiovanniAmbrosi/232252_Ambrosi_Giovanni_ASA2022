const Observable = require('../utils/Observable');


class RollerShutterRobot extends Observable{
    constructor(house, name, room, prev_room){
        super()
        this.house = house
        this.name = name
        this.set('status', 'close')
        this.set('prev_in_room', prev_room)
        this.set('in_room', room)

    }

    moveTo (to) {
        if ( this.house.rooms[this.in_room].doors_to.includes(to) ) { // for object: to in this.house.rooms[this.in_room].doors_to
            this.prev_room = this.in_room
            console.log(this.name, '\t moved from', this.in_room, 'to', to)
            this.in_room = to
            return true
        }
        else {
            console.log(this.name, '\t failed moving from', this.in_room, 'to', to)
            return false
        }
    }

    roll_up(){
        switch(this.in_room){
            case 'kitchen':
                this.house.devices.kitchen_rs.status = 'open'
                break
            case 'bedroom_1':
                this.house.devices.bedroom_1_rs.status = 'open'
                break
            case 'bedroom_2':
                this.house.devices.bedroom_2_rs.status = 'open'
                break
            case 'laundry_room':
                this.house.devices.laundry_room_rs.status = 'open'
                break
                        
        }
    }

    roll_down(){
        switch(this.in_room){
            case 'kitchen':
                this.house.devices.kitchen_rs.status = 'close'
                break
            case 'bedroom_1':
                this.house.devices.bedroom_1_rs.status = 'close'
                break
            case 'bedroom_2':
                this.house.devices.bedroom_2_rs.status = 'close'
                break
            case 'laundry_room':
                this.house.devices.laundry_room_rs.status = 'close'
                break
                        
        }
    }
}

module.exports = RollerShutterRobot