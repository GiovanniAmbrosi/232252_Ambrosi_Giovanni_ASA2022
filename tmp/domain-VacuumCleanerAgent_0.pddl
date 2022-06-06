;; domain file: domain-VacuumCleanerAgent_0.pddl
(define (domain VacuumCleanerAgent_0)
    (:requirements :strips)
    (:predicates
        (in_room ?vacuum_robot ?from)
        (vacuum ?vacuum_robot)
        (connected ?from ?to)
        (dirty ?room)
        (clean ?room)              
    )
    
        (:action Move_to_0
            :parameters (?vacuum_robot ?from ?to)
            :precondition (and
                (in_room ?vacuum_robot ?from)
                (vacuum ?vacuum_robot)
                (connected ?from ?to)
            )
            :effect (and
                (not (in_room ?vacuum_robot ?from))
                (in_room ?vacuum_robot ?to)
            )
        )
        
        (:action Clean_0
            :parameters (?vacuum_robot ?room)
            :precondition (and
                (in_room ?vacuum_robot ?room)
                (dirty ?room)
            )
            :effect (and
                (clean ?room)
                (not (dirty ?room))
            )
        )
)