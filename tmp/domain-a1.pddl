;; domain file: domain-a1.pddl
(define (domain a1)
    (:requirements :strips)
    (:predicates
        (clear ?ob)
		(on-table ?ob)
		(empty )
		(holding ?ob)
		(on ?x ?y)              
    )
    
        (:action PickUp
            :parameters (?ob)
            :precondition (and (clear ?ob) (on-table ?ob) (empty ) )
            :effect (and
                (holding ?ob)
			(not (empty ))
			(not (clear ?ob))
			(not (on-table ?ob))
            )
        )
		
        (:action PutDown
            :parameters (?ob)
            :precondition (and (holding ?ob) )
            :effect (and
                (not (holding ?ob))
			(empty )
			(clear ?ob)
			(on-table ?ob)
            )
        )
		
        (:action Stack
            :parameters (?x ?y)
            :precondition (and (holding ?x) (clear ?y) )
            :effect (and
                (holding ?x)
			(empty )
			(clear ?x)
			(not (clear ?y))
			(on ?x ?y)
            )
        )
		
        (:action UnStack
            :parameters (?x ?y)
            :precondition (and (on ?x ?y) (clear ?x) (empty ) )
            :effect (and
                (holding ?x)
			(not (empty ))
			(not (clear ?x))
			(clear ?y)
			(not (on ?x ?y))
            )
        )
)