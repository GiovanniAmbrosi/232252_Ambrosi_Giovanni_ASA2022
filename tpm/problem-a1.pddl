;; problem file: problem-a1.pddl
(define (problem a1)
    (:domain a1)
    (:objects a)
	(:init (holding a) (not (empty)) (not (clear a)) (not (on-table a)))
	(:goal (and (holding a)))
)
