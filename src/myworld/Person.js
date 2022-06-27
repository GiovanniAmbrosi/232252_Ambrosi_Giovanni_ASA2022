const Observable = require('../utils/Observable');



class Person extends Observable {
    constructor (house, name) {
        super()
        this.house = house;             // reference to the house
        this.name = name;
        this.set('prev_room', 'living_room_1')
        this.set('pers_in_room', 'bedroom_1')  // observable
        // this.observe( 'in_room', v => console.log(this.name, 'moved to', v) )    // observe
    }
    moveTo (to) {
        if ( this.house.rooms[this.pers_in_room].doors_to.includes(to) ) { // for object: to in this.house.rooms[this.in_room].doors_to
            this.prev_room = this.pers_in_room
            console.log('\n', this.name, ' moved from', this.pers_in_room, 'to', to, '\n')
            this.pers_in_room = to
            return true
        }
        else {
            console.log('\n', this.name, ' failed moving from', this.pers_in_room, 'to', to, '\n')
            return false
        }
    }

}



module.exports = Person