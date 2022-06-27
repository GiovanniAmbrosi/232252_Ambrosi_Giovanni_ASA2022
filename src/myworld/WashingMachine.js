const Observable = require('../utils/Observable');

class WashingMachine extends Observable{
    constructor(house){
        super()
        this.house = house
        this.set('wm', 'empty')
        this.set('clothes_in', 'not')
        this.set('program_set', 'null')
        this.set('wash', 'null')
    }
    fill_water(){
        this.wm = 'full'
    }
    set_program(){
        this.program = 'set'
    }
    wash_cicle(){
        this.wash = 'clothes'
    }
    take_clothes(){
        this.clothes_in = 'not'
    }
}

module.exports = WashingMachine