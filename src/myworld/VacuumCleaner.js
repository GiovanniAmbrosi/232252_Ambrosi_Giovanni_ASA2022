const Observable = require('../utils/Observable');



class VacuumCleaner extends Observable {
    constructor (house, room, prev_room, name) {
        super()
        this.house = house;
        this.name = name         // reference to the house
        this.set('status', 'off')   // observable
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
    clean(){
        switch(this.in_room){
            case 'kitchen':
                this.house.devices.kitchen_sens = 'clean'
                break
            case 'living_room_0':
                this.house.devices.living_room_0_sens = 'clean'
                break
            case 'laundry_room':
                this.house.devices.laundry_room_sens = 'clean'
                break
            case 'bath_room':
                this.house.devices.bath_room_sens = 'clean'
                break
            case 'living_room_1':
                this.house.devices.living_room_1_sens = 'clean'
                break
            case 'bedroom_1':
                this.house.devices.bedroom_1_sens = 'clean'
                break
            case 'bedroom_2':
                this.house.devices.bedroom_2_sens = 'clean'
                break
            case 'battery_room':
                this.house.devices.battery_room_sens = 'clean'
                break
                        
        }
    }

}



module.exports = VacuumCleaner

