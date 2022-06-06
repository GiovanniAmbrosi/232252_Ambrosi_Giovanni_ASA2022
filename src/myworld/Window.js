const Observable = require('../utils/Observable');


class Window extends Observable{
    constructor(house){
        super()
        this.house = house
        this.name = this.house.rooms.kitchen.name
        this.set('brightness', 'dark')
        this.set('status', 'close')

    }

    open_window(){
        this.status = 'open'
    }

    close_window(){
        this.status = 'close'
    }

    trasparent_window(){
        this.brightness = 'transparent'
    }

    dark_window(){
        this.brightness = 'dark'
    }
}

module.exports = Window