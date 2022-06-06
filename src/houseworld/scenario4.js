const Beliefset =  require('../bdi/Beliefset')
const Observable =  require('../utils/Observable')
const Clock =  require('../utils/Clock')
const Agent = require('../bdi/Agent')
const Goal = require('../bdi/Goal')
const Intention = require('../bdi/Intention')
const Person = require('../myworld/Person')
const Light = require('../myworld/Light')
const StatusRoom = require('../myworld/StatusRoomSens')
const VacuumCleaner = require('../myworld/VacuumCleaner')
const {AlarmGoal, AlarmIntention} = require('../myworld/Alarm')
const {SenseLightsGoal, SenseLightsIntention, SenseOneLightGoal, SenseOneLightIntention} = require('../myworld/LightSensor')
const {SensePanelsGoal, SensePanelsIntention} = require('../myworld/PanelSensor')
const {AgentPanelsGoal, AgentPanelsIntention} = require('../myworld/PanelAgent')
const {SensePersonGoal, SensePeopleIntention} = require('../myworld/PersonSensor')
const {SenseConsGoal, SenseConsIntention} = require('../myworld/ConsSensor')
const SolarPanels = require('../myworld/SolarPanels')
const BatterySystem = require('../myworld/BatterySystem')
const ElectricCar = require('../myworld/ElectricCar')
const Window = require('../myworld/Window')
const {SenseCarGoal, SenseCarIntention} = require('../myworld/CarSensor')
const {AgentLightIntention, AgentLightGoal} = require('../myworld/LightAgent')
const {AgentCarGoal, AgentCarIntention} = require('../myworld/CarAgent')
const {SensePresRobotGoal, SensePresRobotIntention} = require('../myworld/VacSensPres')
const {SenseRobotGoal, SenseRobotIntention} = require('../myworld/VacCleanSensor')
const pddlActionIntention = require('../pddl/actions/pddlActionIntention')
const PlanningGoal = require('../pddl/PlanningGoal')






class House {
    constructor () {
        this.people = { 
            stefano: new Person(this, 'Stefano'),
            elisabetta: new Person(this, 'Elisabetta')
        }
        this.rooms = {
            kitchen: { name: 'kitchen', doors_to: ['living_room_0', 'garage', 'laundry_room'] },
            living_room_0: { name: 'living_room_0', doors_to: ['bath_room', 'kitchen', 'garage', 'living_room_1', 'laundry_room']},
            living_room_1: { name: 'living_room_1', doors_to: ['battery_room', 'living_room_0', 'bedroom_1', 'bedroom_2']},
            bath_room: {name: 'bath_room', doors_to: ['living_room_0']},
            garage: { name: 'garage', doors_to: ['kitchen', 'living_room_0'] },
            laundry_room: { name: 'laundry_room', doors_to: ['living_room_0'] },
            bedroom_1: { name: 'bedroom_1', doors_to: ['living_room_1', 'bedroom_2'] },
            bedroom_2: { name: 'bedroom_2', doors_to: ['living_room_1', 'bedroom_1'] },
            battery_room: { name: 'battery_room', doors_to: ['living_room_1'] }                        
        }
        this.devices = {
            kitchen_light: new Light(this, 'kitchen'),
            garage_light: new Light(this, 'garage'),
            living_room_0_light: new Light(this, 'living_room_0'),
            living_room_1_light: new Light(this, 'living_room_1'),
            bedroom_1_light: new Light(this, 'bedroom_1'),
            bedroom_2_light: new Light(this, 'bedroom_2'),
            bath_room_light: new Light(this, 'bath_room'),
            battery_room_light: new Light(this, 'battery_room'),
            laundry_room_light: new Light(this, 'laundry_room'),
            solar_panels: new SolarPanels(this, 0.0),
            battery_system: new BatterySystem(this, 0.0),
            electric_car: new ElectricCar(this),
            window_bathroom: new Window(this, this.rooms.kitchen),
            vacuum_cleaner_0: new VacuumCleaner(this, 'kitchen', 'living_room_0', 'vaccum_cleaner_0'),
            vacuum_cleaner_1: new VacuumCleaner(this, 'battery_room', 'living_room_1', 'vacuum_cleaner_1'),
            kitchen_sens: new StatusRoom(this, 'kitchen'),
            bedroom_1_sens: new StatusRoom(this, 'bedroom_1'),
            bedroom_2_sens: new StatusRoom(this, 'bedroom_2'),
            battery_room_sens: new StatusRoom(this, 'battery_room'),
            living_room_0_sens: new StatusRoom(this, 'living_room_0'),
            living_room_1_sens: new StatusRoom(this, 'living_room_1'),
            laundry_room_sens: new StatusRoom(this, 'laundry_room'),
            bath_room_sens: new StatusRoom(this, 'bath_room')
        }
        this.utilities = {
            electricity: new Observable( { consumption: 0.5 } )
        }
    }
}



// House, which includes rooms and devices
var myHouse = new House()

// Agents
var houseAgent = new Agent('houseAgent')
var carAgent = new Agent('carAgent')
var lightAgent = new Agent('lightAgent')
var VacuumCleanerAgent_0 = new Agent('VacuumCleanerAgent_0')
var VacuumCleanerAgent_1 = new Agent('VacuumCleanerAgent_1')
houseAgent.intentions.push(AlarmIntention)
houseAgent.postSubGoal( new AlarmGoal({hh:6, mm:0}) )

/*

lightAgent.intentions.push(SensePeopleIntention)
lightAgent.postSubGoal( new SensePersonGoal( [myHouse.people.stefano, myHouse.people.elisabetta] ))
lightAgent.intentions.push(AgentLightIntention)
lightAgent.postSubGoal( new AgentLightGoal( [myHouse.devices.bath_room_light, myHouse.devices.living_room_0_light, myHouse.devices.living_room_1_light , myHouse.devices.garage_light, myHouse.devices.kitchen_light, 
    myHouse.devices.battery_room_light, myHouse.devices.bedroom_2_light, myHouse.devices.bedroom_1_light, myHouse.devices.laundry_room_light] ))

houseAgent.intentions.push(SensePanelsIntention)
houseAgent.postSubGoal( new SensePanelsGoal( [myHouse.devices.solar_panels] ) )
houseAgent.intentions.push(AgentPanelsIntention)
houseAgent.postSubGoal( new AgentPanelsGoal([myHouse.devices.solar_panels]))

carAgent.intentions.push(AgentCarIntention)
carAgent.postSubGoal( new AgentCarGoal( [myHouse.devices.electric_car]))
carAgent.intentions.push(SenseCarIntention)
carAgent.postSubGoal( new SenseCarGoal( [myHouse.devices.electric_car]))
*/

/*
houseAgent.intentions.push(AgentPanelsIntention)
houseAgent.postSubGoal( new AgentPanelsGoal([myHouse.devices.solar_panels]))

houseAgent.intentions.push(SenseCarIntention)
houseAgent.postSubGoal( new SenseCarGoal( [myHouse.devices.electric_car]))


houseAgent.intentions.push(SenseConsIntention)
houseAgent.postSubGoal( new SenseConsGoal( [myHouse.utilities.electricity]))


carAgent.intentions.push(AgentCarIntention)
carAgent.postSubGoal( new AgentCarGoal( [myHouse.devices.electric_car]))
*/



VacuumCleanerAgent_0.intentions.push(SenseRobotIntention)
VacuumCleanerAgent_0.postSubGoal( new SenseRobotGoal([myHouse.devices.kitchen_sens, myHouse.devices.living_room_0_sens, myHouse.devices.laundry_room_sens, myHouse.devices.bath_room_sens]))

VacuumCleanerAgent_0.intentions.push(SensePresRobotIntention)
VacuumCleanerAgent_0.postSubGoal( new SensePresRobotGoal([myHouse.devices.vacuum_cleaner_0]))

VacuumCleanerAgent_1.intentions.push(SenseRobotIntention)
VacuumCleanerAgent_1.postSubGoal( new SenseRobotGoal([myHouse.devices.living_room_1_sens, myHouse.devices.bedroom_1_sens, myHouse.devices.bedroom_2_sens, myHouse.devices.battery_room_sens]))

VacuumCleanerAgent_1.intentions.push(SensePresRobotIntention)
VacuumCleanerAgent_1.postSubGoal( new SensePresRobotGoal([myHouse.devices.vacuum_cleaner_1]))

class Move_to_0 extends pddlActionIntention {
    static parameters = ['vacuum_robot', 'from' ,'to'];
    static precondition = [ ['in_room', 'vacuum_robot', 'from'],['vacuum','vacuum_robot'], ['connected', 'from','to']];
    static effect = [ ['not in_room','vacuum_robot','from'], ['in_room', 'vacuum_robot', 'to']];
    *exec ({vacuum_robot,from,to}=parameters) {
        yield myHouse.devices.vacuum_cleaner_0.moveTo(to)
    }
}

class Clean_0 extends pddlActionIntention {
    static parameters = ['vacuum_robot', 'room'];
    static precondition = [ ['in_room', 'vacuum_robot', 'room'], ['dirty', 'room']];
    static effect = [ ['clean', 'room'], ['not dirty', 'room']];
    *exec ({vacuum_robot}=parameters) {
        yield myHouse.devices.vacuum_cleaner_0.clean();
    }
}




class RetryGoalCleaner extends Goal {}
class RetryFourTimesIntentionCleaner extends Intention {
    static applicable (goal) {
        return goal instanceof RetryGoalCleaner
    }
    *exec ({goal}=parameters) {
        for(let i=0; i<4; i++) {
            let goalAchieved = yield this.agent.postSubGoal( goal )
            if (goalAchieved)
                return;
            this.log('wait for something to change on beliefset before retrying for the ' + (i+2) + 'th time goal', goal.toString())
            yield VacuumCleanerAgent_0.beliefs.notifyAnyChange()
        }
    }
}

let {OnlinePlanning} = require('../pddl/OnlinePlanner')([Move_to_0, Clean_0])
VacuumCleanerAgent_0.intentions.push(OnlinePlanning)
VacuumCleanerAgent_0.intentions.push(RetryFourTimesIntentionCleaner)



class Clean_1 extends pddlActionIntention {
    static parameters = ['vacuum_robot', 'room'];
    static precondition = [ ['in_room', 'vacuum_robot', 'room'], ['dirty', 'room']];
    static effect = [ ['clean', 'room'], ['not dirty', 'room']];
    *exec ({vacuum_robot}=parameters) {
        yield myHouse.devices.vacuum_cleaner_1.clean();
    }
}

class Move_to_1 extends pddlActionIntention {
    static parameters = ['vacuum_robot', 'from' ,'to'];
    static precondition = [ ['in_room', 'vacuum_robot', 'from'],['vacuum','vacuum_robot'], ['connected', 'from','to']];
    static effect = [ ['not in_room','vacuum_robot','from'], ['in_room', 'vacuum_robot', 'to']];
    *exec ({vacuum_robot,from,to}=parameters) {
        yield myHouse.devices.vacuum_cleaner_1.moveTo(to)
    }
}

class RetryGoalCleaner1 extends Goal {}
class RetryFourTimesIntentionCleaner1 extends Intention {
    static applicable (goal) {
        return goal instanceof RetryGoalCleaner1
    }
    *exec ({goal}=parameters) {
        for(let i=0; i<4; i++) {
            let goalAchieved = yield this.agent.postSubGoal( goal )
            if (goalAchieved)
                return;
            this.log('wait for something to change on beliefset before retrying for the ' + (i+2) + 'th time goal', goal.toString())
            yield VacuumCleanerAgent_1.beliefs.notifyAnyChange()
        }
    }
}

let {OnlinePlanning1} = require('../pddl/OnlinePlanner1')([Move_to_1, Clean_1])
VacuumCleanerAgent_1.intentions.push(OnlinePlanning1)
VacuumCleanerAgent_1.intentions.push(RetryFourTimesIntentionCleaner1)




/*-----------VACUUM CLEANER 0-------------*/

VacuumCleanerAgent_0.beliefs.declare('vacuum vacuum_robot')
VacuumCleanerAgent_0.beliefs.declare('connected kitchen living_room_0')
VacuumCleanerAgent_0.beliefs.declare('connected living_room_0 kitchen')
VacuumCleanerAgent_0.beliefs.declare('connected laundry_room living_room_0')
VacuumCleanerAgent_0.beliefs.declare('connected living_room_0 laundry_room')
VacuumCleanerAgent_0.beliefs.declare('connected bath_room living_room_0')
VacuumCleanerAgent_0.beliefs.declare('connected living_room_0 bath_room')

/*-----------VACUUM CLEANER 1-------------*/

VacuumCleanerAgent_1.beliefs.declare('vacuum vacuum_robot')
VacuumCleanerAgent_1.beliefs.declare('connected bedroom_1 living_room_1')
VacuumCleanerAgent_1.beliefs.declare('connected living_room_1 bedroom_1')
VacuumCleanerAgent_1.beliefs.declare('connected bedroom_2 living_room_1')
VacuumCleanerAgent_1.beliefs.declare('connected living_room_1 bedroom_2')
VacuumCleanerAgent_1.beliefs.declare('connected battery_room living_room_1')
VacuumCleanerAgent_1.beliefs.declare('connected living_room_1 battery_room')




Clock.global.observe('mm', (mm) => {
    var time = Clock.global

    if(time.hh==6 && time.mm==0){

        myHouse.devices.kitchen_sens.change_status('dirty')
        myHouse.devices.living_room_0_sens.change_status('dirty')
        myHouse.devices.bath_room_sens.change_status('dirty')
        myHouse.devices.laundry_room_sens.change_status('dirty')
        myHouse.devices.living_room_1_sens.change_status('dirty')
        myHouse.devices.battery_room_sens.change_status('dirty')
        myHouse.devices.bedroom_1_sens.change_status('dirty')
        myHouse.devices.bedroom_2_sens.change_status('dirty')

        //myHouse.devices.kitchen_light.switchOnLight()   
        //myHouse.people.stefano.moveTo('living_room_1')
        
        //myHouse.people.stefano.moveTo('living_room_0')
        //myHouse.people.elisabetta.moveTo('living_room_1')
        //myHouse.people.elisabetta.moveTo('living_room_0')
         
    }

    if(time.hh==6 && time.mm==15){
        //myHouse.devices.kitchen_light.switchOnLight()   
        //myHouse.people.stefano.moveTo('living_room_1')
        //myHouse.people.stefano.moveTo('living_room_0')
        //myHouse.people.elisabetta.moveTo('living_room_1')
        //myHouse.people.elisabetta.moveTo('living_room_0')
         
    }


    if(time.hh==6 && time.mm==30){
        
        //myHouse.people.stefano.moveTo('bath_room')
        //myHouse.people.elisabetta.moveTo('living_room_0')
        //myHouse.people.elisabetta.moveTo('kitchen')
        //myHouse.people.stefano.have_shower()
        
    }
    if(time.hh==7 && time.mm==00){
        
        //myHouse.people.elisabetta.moveTo('kitchen')
    }

    if(time.hh==7 && time.mm==30){
        //myHouse.people.stefano.moveTo('living_room_0')       
    }
    if(time.hh==8 && time.mm==0){
        //myHouse.people.stefano.moveTo('garage')
        //myHouse.devices.electric_car.switch_OFF_charge()
        VacuumCleanerAgent_0.postSubGoal( new RetryGoalCleaner( { goal: new PlanningGoal( { goal: ['clean living_room_0', 'clean kitchen',  'clean bath_room', 'clean laundry_room', 'in_room vacuum_robot kitchen']} ) } ) )
    }
    
    if(time.hh==8 && time.mm==30){
        //myHouse.people.elisabetta.moveTo('living_room_0')
        //myHouse.utilities.electricity.consumption += 1 //TV-screen turned on
        //VacuumCleanerAgent_0.postSubGoal( new RetryGoalCleaner( { goal: new PlanningGoal( { goal: ['clean living_room_0', 'clean kitchen',  'in_room vacuum_robot kitchen']} ) } ) )
    }

    if(time.hh==8 && time.mm==45){
        //myHouse.utilities.electricity.consumption -= 1 //TV-screen turned off
        //VacuumCleanerAgent_0.postSubGoal( new RetryGoalCleaner( { goal: new PlanningGoal( { goal: ['clean living_room_0', 'clean kitchen',  'in_room vacuum_robot kitchen']} ) } ) )
    }

    if(time.hh==9 && time.mm==0){
        //myHouse.people.elisabetta.moveTo('laundry_room')
        //myHouse.utilities.electricity.consumption += 1 //washing machine is turned on
        //VacuumCleanerAgent_0.postSubGoal( new RetryGoalCleaner( { goal: new PlanningGoal( { goal: ['clean living_room_0', 'clean kitchen',  'in_room vacuum_robot kitchen']} ) } ) )
    }
    if(time.hh==10 && time.mm==00){
        //myHouse.people.elisabetta.moveTo('living_room_0')
        //myHouse.utilities.electricity.consumption += 1 //washing machine is turned off
        

    }
    if(time.hh==12 && time.mm==0){
        //myHouse.people.elisabetta.moveTo('kitchen')

    }

    if(time.hh==14 && time.mm==30){
        //myHouse.people.elisabetta.moveTo('living_room_0')           
    }


    if(time.hh==14 && time.mm==45){
        //myHouse.people.elisabetta.moveTo('living_room_1') 
    }

    if(time.hh==14 && time.mm==45){
        //myHouse.people.elisabetta.moveTo('bedroom_2')
        //myHouse.devices.bedroom_2_light.switchOffLight() //light turned off in order to sleep     
    }
    

    if(time.hh==15 && time.mm==30){
        //myHouse.people.elisabetta.moveTo('living_room_1')
         
    }

    if(time.hh==16 && time.mm==00){
        //myHouse.people.elisabetta.moveTo('living_room_0')
         
    }

    if(time.hh==17 && time.mm==15){
        //myHouse.people.elisabetta.moveTo('bath_room')
        //myHouse.utilities.electricity.consumption += 1
    }

    if(time.hh==17 && time.mm==45){
        //myHouse.people.elisabetta.moveTo('living_room_0')
        //myHouse.utilities.electricity.consumption -= 1 
    }

    if(time.hh==18 && time.mm==30){
        //myHouse.people.elisabetta.moveTo('kitchen')
        //myHouse.utilities.electricity.consumption += 1 //oven turned on to prepare dinner 
    }

    if(time.hh==19 && time.mm==30){
        /*
        myHouse.devices.electric_car.decreasing_charge()
        myHouse.devices.electric_car.switch_ON_charge()
        myHouse.people.stefano.moveTo('kitchen')
        myHouse.utilities.electricity.consumption -= 1
        */
        VacuumCleanerAgent_1.postSubGoal( new RetryGoalCleaner1( { goal: new PlanningGoal( { goal: ['clean living_room_1', 'clean bedroom_1',  'clean bedroom_2', 'clean battery_room', 'in_room vacuum_robot bedroom_2']} ) } ) )
    }

    if(time.hh==19 && time.mm==45){
        //myHouse.people.stefano.moveTo('living_room_0')
        
    }


    if(time.hh==20 && time.mm==30){
        //myHouse.people.stefano.moveTo('living_room_1')
        //myHouse.people.elisabetta.moveTo('living_room_0')
    }

    if(time.hh==20 && time.mm==45){
        //myHouse.people.elisabetta.moveTo('living_room_1')
    }

    if(time.hh==21 && time.mm==00){
        //myHouse.people.stefano.moveTo('bedroom_1')
        //myHouse.people.elisabetta.moveTo('bedroom_1')
        
    }

    if(time.hh==21 && time.mm==45){
        //myHouse.devices.bedroom_1_light.switchOffLight('bedroom_1') 
    }

    if(time.hh==23 && time.mm==30){
        /*
        console.log('Daily report of current sold and bought:\n')
        console.log('Current sold (€): ', myHouse.devices.battery_system.money_earned.toFixed(2))
        console.log('Current bought (€): ', myHouse.devices.battery_system.current.toFixed(2))
        */
        
    }
})




// Start clock
Clock.startTimer()