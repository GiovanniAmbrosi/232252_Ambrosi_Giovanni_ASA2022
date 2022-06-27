;; problem file: problem-VacuumCleanerAgent_0.pddl
(define (problem VacuumCleanerAgent_0)
    (:domain VacuumCleanerAgent_0)
    (:objects vacuum_robot kitchen living_room_0 laundry_room bath_room living_room_1 bedroom_1 bedroom_2 battery_room)
	(:init (vacuum vacuum_robot) (in_room vacuum_robot kitchen) (connected kitchen living_room_0) (connected living_room_0 kitchen) (connected laundry_room living_room_0) (connected living_room_0 laundry_room) (connected bath_room living_room_0) (connected living_room_0 bath_room) (connected living_room_0 living_room_1) (connected living_room_1 living_room_0) (connected living_room_1 bedroom_1) (connected bedroom_1 living_room_1) (connected living_room_1 bedroom_2) (connected bedroom_2 living_room_1) (connected living_room_1 battery_room) (connected battery_room living_room_1) (dirty kitchen) (dirty living_room_0) (dirty laundry_room) (dirty bath_room) (dirty living_room_1) (dirty battery_room) (dirty bedroom_1) (dirty bedroom_2) (in_room vacuum_robot living_room_0) (in_room vacuum_robot laundry_room) (in_room vacuum_robot bath_room) (in_room vacuum_robot living_room_1) (in_room vacuum_robot bedroom_1) (in_room vacuum_robot bedroom_2) (in_room vacuum_robot battery_room))
	(:goal (and (in_room vacuum_robot laundry_room)))
)
lean bath_room) (clean laundry_room) (clean living_room_1) (clean bedroom_1) (clean bedroom_2) (clean battery_room) (in_room vacuum_robot kitchen)))
)
