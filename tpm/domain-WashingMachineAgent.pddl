;; domain file: domain-WashingMachineAgent.pddl
(define (domain WashingMachineAgent)
    (:requirements :strips)
    (:predicates
        (clothes_in ?clothes)
        (empty ?wm)
        (full ?wm)
        (program_set ?wm)
        (wash ?clothes)
        (ready ?wm)              
    )
    
        (:action Fill_Water
            :parameters (?clothes ?wm)
            :precondition (and
                (clothes_in ?clothes)
                (empty ?wm)
            )
            :effect (and
                (full ?wm)
                (clothes_in ?clothes)
            )
        )
        
        (:action Set_Program
            :parameters (?clothes ?wm)
            :precondition (and
                (full ?wm)
                (clothes_in ?clothes)
            )
            :effect (and
                (full ?wm)
                (program_set ?wm)
            )
        )
        
        (:action Wash
            :parameters (?clothes ?wm)
            :precondition (and
                (full ?wm)
                (clothes_in ?clothes)
                (program_set ?wm)
            )
            :effect (and
                (wash ?clothes)
                (not (program_set ?wm))
            )
        )
        
        (:action Take_Clothes
            :parameters (?clothes ?wm)
            :precondition (and
                (wash ?clothes)
            )
            :effect (and
                (not (clothes_in ?clothes))
                (empty ?wm)
                (ready ?wm)
            )
        )
)