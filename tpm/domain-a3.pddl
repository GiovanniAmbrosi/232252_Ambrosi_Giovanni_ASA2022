;; domain file: domain-a3.pddl
(define (domain a3)
    (:requirements :strips)
    (:predicates
        (off ?x ?room)
		(on ?x ?room)              
    )
    
        (:action TurnOnLight
            :parameters (?x ?room)
            :precondition (and (off ?x ?room) )
            :effect (and
                (on ?x ?room)
			(not (off ?x ?room))
            )
        )
)