;; problem file: problem-a3.pddl
(define (problem a3)
    (:domain a3)
    (:objects a b x kitchen)
	(:init (on-table a) (on b a) (clear b) (empty) (off x kitchen))
	(:goal (and (on x kitchen)))
)
