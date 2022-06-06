;; problem file: problem-VacuumCleanerAgent_0.pddl
(define (problem VacuumCleanerAgent_0)
    (:domain VacuumCleanerAgent_0)
    (:objects vacuum_robot kitchen living_room_0 laundry_room bath_room)
	(:init (vacuum vacuum_robot) (connected kitchen living_room_0) (connected living_room_0 kitchen) (connected laundry_room living_room_0) (connected living_room_0 laundry_room) (connected bath_room living_room_0) (connected living_room_0 bath_room) (dirty kitchen) (clean living_room_0) (dirty laundry_room) (clean bath_room) (in_room vacuum_robot kitchen))
	(:goal (and (clean living_room_0) (clean kitchen) (clean bath_room) (clean laundry_room) (in_room vacuum_robot kitchen)))
)
