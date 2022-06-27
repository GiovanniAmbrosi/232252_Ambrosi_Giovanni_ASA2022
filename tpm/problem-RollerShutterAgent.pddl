;; problem file: problem-RollerShutterAgent.pddl
(define (problem RollerShutterAgent)
    (:domain RollerShutterAgent)
    (:objects roller_shutter_robot kitchen living_room_0 laundry_room bath_room living_room_1 bedroom_1 bedroom_2 rs)
	(:init (roller_shutter roller_shutter_robot) (in_room roller_shutter_robot kitchen) (connected kitchen living_room_0) (connected living_room_0 kitchen) (connected laundry_room living_room_0) (connected living_room_0 laundry_room) (connected bath_room living_room_0) (connected living_room_0 bath_room) (connected living_room_0 living_room_1) (connected living_room_1 living_room_0) (connected living_room_1 bedroom_1) (connected bedroom_1 living_room_1) (connected living_room_1 bedroom_2) (connected bedroom_2 living_room_1) (open rs kitchen) (open rs laundry_room) (open rs bedroom_1) (close rs bedroom_2) (in_room roller_shutter_robot laundry_room) (in_room roller_shutter_robot living_room_1) (in_room roller_shutter_robot bedroom_1) (in_room roller_shutter_robot bedroom_2))
	(:goal (and (open rs kitchen) (open rs laundry_room) (open rs bedroom_1) (open rs bedroom_2)))
)
