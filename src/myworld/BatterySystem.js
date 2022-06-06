const Observable = require('../utils/Observable');

class BatterySystem extends Observable {
    constructor(house){
        super()
        this.init_capacity = 0
        this.surplus = 0
        this.money_earned = 0
        this.current = 0
        this.house = house
        //this.observe('init_capacity',(value)=>{if (this.init_capacity >=) console.log("NOTIFICATION need to refill storage") })
    }

    is_full() {
        if(this.init_capacity >= 15)
        return true
    }

    is_empty(){
        if(this.init_capacity <= 0){
            this.init_capacity = 0
            return true
        }
        
    }

    start_store(diff){
        if (this.is_full()) {
            console.log('\n\nBatteries are full, capacity ', this.init_capacity = 15, '\n')
            console.log('Surplus of energy sold to public authority: ', diff.toFixed(2), '\n')
            this.surplus = diff
            this.money_earned += this.surplus * 0.2
            return
        }
        else{
            console.log('\n\nCharging batteries, capacity', this.init_capacity, '\n')
            this.init_capacity += diff       
            
        }
    }

    use_batteries(cons){
        if(this.is_empty()){
            this.current += (-cons) * 0.1
            console.log('\nBatteries are empty\n')
            console.log('kWs bought from the public line: ', cons, ' total price: ', this.current.toFixed(2))
            return
        }else{
            console.log('Batteries are supplying the house\n')
            this.init_capacity += cons
            console.log('Capacity of the batteries is: ', this.init_capacity)
        }
    }
}

module.exports = BatterySystem