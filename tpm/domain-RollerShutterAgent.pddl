;; domain file: domain-RollerShutterAgent.pddl
(define (domain RollerShutterAgent)
    (:requirements :strips)
    (:predicates
        (in_room ?rs_robot ?from)
        (busy ?to)
        (roller_shutter ?rs_robot)
        (connected ?from ?to)
        (close ?rs ?room)
        (open ?rs ?room)              
    )
    
        (:action Move_to_1
            :parameters (?rs_robot ?from ?to)
            :precondition (and
                (in_room ?rs_robot ?from)
                (not (busy ?to))
                (roller_shutter ?rs_robot)
                (connected ?from ?to)
                (not (busy ?to))
            )
            :effect (and
                (not (in_room ?rs_robot ?from))
                (in_room ?rs_robot ?to)
            )
        )
        
        (:action Roll_Up
            :parameters (?rs_robot ?room ?rs)
            :precondition (and
                (in_room ?rs_robot ?room)
                (close ?rs ?room)
            )
            :effect (and
                (open ?rs ?room)
                (not (close ?rs ?room))
            )
        )
        
        (:action Roll_Down
            :parameters (?rs_robot ?room ?rs)
            :precondition (and
                (in_room ?rs_robot ?room)
                (open ?rs ?room)
            )
            :effect (and
                (close ?rs ?room)
                (not (open ?rs ?room))
            )
        )
)