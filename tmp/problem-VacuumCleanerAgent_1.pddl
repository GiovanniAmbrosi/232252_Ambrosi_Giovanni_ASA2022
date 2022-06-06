;; problem file: problem-VacuumCleanerAgent_1.pddl
(define (problem VacuumCleanerAgent_1)
    (:domain VacuumCleanerAgent_1)
    (:objects vacuum_robot bedroom_1 living_room_1 bedroom_2 battery_room)
	(:init (vacuum vacuum_robot) (connected bedroom_1 living_room_1) (connected living_room_1 bedroom_1) (connected bedroom_2 living_room_1) (connected living_room_1 bedroom_2) (connected battery_room living_room_1) (connected living_room_1 battery_room) (dirty living_room_1) (clean bedroom_1) (dirty bedroom_2) (dirty battery_room) (in_room vacuum_robot battery_room))
	(:goal (and (clean living_room_1) (clean bedroom_1) (clean bedroom_2) (clean battery_room) (in_room vacuum_robot bedroom_2)))
)
