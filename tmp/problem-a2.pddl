;; problem file: problem-a2.pddl
(define (problem a2)
    (:domain a2)
    (:objects a b x kitchen)
	(:init (on-table a) (on b a) (clear b) (empty) (off x kitchen))
	(:goal (and (holding a)))
)
