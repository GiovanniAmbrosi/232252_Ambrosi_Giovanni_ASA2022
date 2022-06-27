;; problem file: problem-WashingMachineAgent.pddl
(define (problem WashingMachineAgent)
    (:domain WashingMachineAgent)
    (:objects wm clothes)
	(:init (empty wm) (clothes_in clothes))
	(:goal (and (empty wm) (ready wm)))
)
