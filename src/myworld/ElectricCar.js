const Observable = require('../utils/Observable');



//Car viene messa in carica in brutal force da un umano

class ElectricCar extends Observable {
    constructor(house){
        super()
        this.house = house //reference to house
        this.charge_mode = {AC_mode: false, DC_mode: false} //observable
        this.set('charge', 10) 
        this.set('in_charge', 'on') //observable
    }
    switch_ON_charge(){ //brutal force
        this.in_charge = 'on'
        return this.get_charge()
    }

    switch_OFF_charge(){
        this.in_charge = 'off'
        this.house.utilities.electricity.consumption = 0
        return
    }
    
    get_charge(){
        if(this.in_charge == 'on'){
            if(this.charge < 40){
                return this.charge_DC_mode()
            }else{
                return this.charge_AC_mode()
            }
        } 
    }
    
    decreasing_charge(){
        this.charge = this.charge - Math.round((Math.random() * 80 + 1)) //random descharge of the car
    }
    
   charge_DC_mode(){
        if(this.charge >= 40){
            console.log('\nSwitching to AC mode\n')
            return this.charge_AC_mode()
        }else{
            console.log('\nLevel battery low, DC mode on\n')
            this.house.utilities.electricity.consumption = 5
            this.charge += 30
        }
   }
   charge_AC_mode(){
        if(this.charge >= 100){
            console.log('\nCar totally charged\n')
            //this.house.utilities.electricity.consumption = 3
            return this.switch_OFF_charge()
        }else{
            console.log('\nLevel battery normal, keep charging in AC mode\n')
            console.log('\nConsume of the car is 3kW\n')
            this.house.utilities.electricity.consumption = 3
            var cap = this.house.devices.solar_panels.capacity
            if(cap - this.house.utilities.electricity.consumption < 0){
                var diff = cap - 3
                this.house.devices.battery_system.init_capacity += diff
                console.log('\nCharge of the car covered by the panels ', cap, '\n')
                console.log('\nCharge of the car covered by the battery system ', -diff, '\n')
            }else{
                console.log('\nCharge of the car covered entirely by the panels\n')
            }
            this.charge += 15
        }
        

   }
}

module.exports = ElectricCar