const Observable = require('../utils/Observable');



class Person extends Observable {
    constructor (house, name) {
        super()
        this.house = house;             // reference to the house
        this.name = name;
        this.set('prev_room', 'living_room_1')
        this.set('in_room', 'bedroom_1')  // observable
        this.set('shower', 'no')
        // this.observe( 'in_room', v => console.log(this.name, 'moved to', v) )    // observe
    }
    moveTo (to) {
        //console.log(this.house.rooms[this.in_room])
        if ( this.house.rooms[this.in_room].doors_to.includes(to) ) { // for object: to in this.house.rooms[this.in_room].doors_to
            this.prev_room = this.in_room
            console.log('\n', this.name, ' moved from', this.in_room, 'to', to, '\n')
            //console.log(this.prev_room)
            this.in_room = to
            return true
        }
        else {
            console.log('\n', this.name, ' failed moving from', this.in_room, 'to', to, '\n')
            return false
        }
    }

    have_shower(){
        var choice = Math.round(Math.random())
        if(this.in_room == 'bathroom' && choice == 1){
            this.shower = 'yes'
            console.log('\n', this.name, 'is having a shower\n')
        }else{
            this.shower = 'no'
            console.log('\n', this.name, 'is not having a shower\n')
        }
    }
}



module.exports = Person