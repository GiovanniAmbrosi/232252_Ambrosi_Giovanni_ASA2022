const Observable = require('../utils/Observable');



class Light extends Observable {
    constructor (house, name) {
        super()
        this.house = house;         // reference to the house
        this.name = name;
        this.set('prev_room', 'living_room_1');
        this.set('in_room', 'bedroom_1');
        this.set('status', 'off');   // observable
    }
    switchOnLight (room) {
        this.status = 'on'
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log('\n', room + ' light turned on\n')
    }
    switchOffLight (room) {
        this.status = 'off'
        this.house.utilities.electricity.consumption -= 1;
        // Include some messages logged on the console!
        console.log('\n', room + ' light turned off\n')
    }
}



module.exports = Light