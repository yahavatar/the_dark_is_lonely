console.log("the_dark_is_lonely_rooms.js loaded");

function rooms_load(){
//================================================================================================================================================================
obj_load({
    id: "room_0001",
    desc_full: "This is room 1. It is a featureless, barren room.",
    desc_visited: "Room 1",
    flag_visited: 1,
    contents: [
        {   desc: "A plain doorway leading East.",
            pre_discovery_checks:[],
            commands: [
                {   desc: "Use East doorway",
                    match_phrases: ["e","east","go e","go east"],
                    pre_action_checks: [],
                    actions: [
                        {type: "move", destination: "room_0002"},
                    ],
                }
            ],
        }
    ],
});
//================================================================================================================================================================
lSet("flag.warrior_statue_examined", 0);
lSet("flag.warrior_statue_pushed", 0);

obj_load({
    id: "room_0002",
    desc_full: "This is small antechabmer. The ceilings are high and draped with cobwebs. The walls are covered in a thick layer of dust.",
    desc_visited: "High-celinged antechamber with cobwebs and dust.",
    flag_visited: 0,
    contents: [
        {   desc: "A secured doorway leading east.",
            pre_discovery_checks:[],
            commands: [
                {   desc: "Use East doorway.",
                    match_phrases: ["e","east","go e","go east"],
                    pre_action_checks: [],
                    actions: [
                        {type: "move", destination: "room_0003"},
                    ],
                },
            ]
        },
        {   desc: "A plain doorway leading West.",
            pre_discovery_checks:[],
            commands: [
                {
                    desc: "Use West doorway.",
                    match_phrases: ["w","west","go w","go west"],
                    pre_action_checks: [
                        {type: "flag_check", flag: "flag_wearing_object_0002", value: 1, failed_response: "The door is locked."},
                    ],
                    actions: [
                        {type: "move", destination: "room_0001"},
                    ],
                },
            ]
        },
        {   desc: "A large stone statue of a warrior stands in the corner of the room.",
            pre_discovery_checks:[],
            commands: [
                {
                    desc: "Examine the statue.",
                    match_phrases: ["examine statue","look statue","search statue"],
                    pre_action_checks: [],
                    actions: [
                        {type: "response", text: "The statue is made of stone and depicts a warrior in full armor covered in a thick layer of dust. It appears to be mounted on a movable platform."},
                        {type: "flag_set", flag: "flag.warrior_statue_examined", value: 1},
                    ],
                },
                {
                    desc: "Push the statue.",
                    match_phrases: ["push statue","push the statue","move statue","move the statue"],
                    pre_action_checks: [
                        {type: "flag_check", flag: "flag.warrior_statue_pushed", value: 1, failed_response: "The statue has already been pushed aside."},
                    ],
                    actions: [
                        {type: "response", text: "You push the statue and it slides easily to the side."},
                        {type: "flag_set", flag: "flag.warrior_statue_pushed", value: 1},
                    ],
                }
            ]
        }
    ],
});
//================================================================================================================================================================
obj_load({
    id: "room_0003",
    desc_brief: "Room 3, Treasure Vault.",
    desc_full: "Treasure vault..emptied aeons ago.",
    desc_visited: "Empty Treasure Vault",
    flag_visited: 0,
    contents: [
        {   desc: "A secured doorway leading West.",
            pre_discovery_checks:[],
            commands: [
                {
                    desc: "Use West doorway.",
                    match_phrases: ["w","west","go w","go west"],
                    pre_action_checks: [
                        {type: "flag_check", flag: "flag.wearing_object_0002", value: 1, failed_response: "The door is locked."},
                    ],
                    actions: [
                        {type: "move", destination: "room_0001"},
                    ],
                },
            ]
        },
    ]
});
//================================================================================================================================================================
obj_load({
    id: "room_0004",
    desc_brief: "Room 4, Mouldy crypt.",
    desc_full: "A mouldy crypt with a stone sarcophagus in the center of the room.",
    desc_visited: "Empty Treasure Vault",
    flag_visited: 0,
    contents: [
        {   desc: "A roughly circular hole in the ceiling leading up.",
            match_phrases: ["u","up","go u","go up"],
            pre_action_checks: [],
            actions: [
                { type: "move", destination: "room_0002"},
            ],
        }
    ]
});
//================================================================================================================================================================
}

/*   Blank Room Template
obj_load({
    id: "room_0000",
    desc_full: "Full description.",
    desc_visited: "Short Description.",
    flag_visited: 0,
    contents: [
        {   desc: "East Door Description.",
            pre_discovery_checks:[],
            commands: [
                {   desc: "Use East doorway",
                    match_phrases: ["e","east","go e","go east"],
                    pre_action_checks: [
                        {type: "flag_check", flag: "flag.wearing_object_0002", value: 1, failed_response: "The door is locked."},
                    ],
                    actions: [
                        {type: "response", text: "You push the statue and it slides easily to the side."},
                        {type: "flag_set", flag: "flag.warrior_statue_pushed", value: 1},
                    ],
                }
            ],
        }
    ],
});

*/




/*    Rooms in process

room_0001
    You find yourself at the main gate of a dilap

room_0002

room_0003

room_0004

room_0005

room_0006

room_0007

room_0008

room_0009

room_0010







*/