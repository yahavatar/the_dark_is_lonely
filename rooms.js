console.log("the_dark_is_lonely_rooms.js loaded");

function rooms_load(){
//================================================================================================================================================================
obj_load({
    id: "room_0001",
    flag_visited: 0,
    name: "Room 1",
    desc_brief: "Room 1",
    desc_full: "This is room 1.",
    exits: [
        { 
            cmd: ["e","east","go e","go east","open east door","open e door","open east doorway","open e doorway","open east","open e"],
            desc: "You see a small doorway leading East.",
            dest: "room_0002",
        }
    ],
    features: [],
});
//================================================================================================================================================================
lSet("flag.warrior_statue_examined", 0);
lSet("flag.warrior_statue_pushed", 0);

obj_load({
    id: "room_0002",
    desc_brief: "Room 2, small antechamber.",
    desc_full: "This is small antechabmer. The celinigs are high and draped with cobwebs. The walls are covered in a thick layer of dust.",
    desc_visited: "High-celinged antechamber with cobwebs and dust.",
    flag_visited: 0,
    exits: [
        { 
            cmd: ["e","east","go e","go east","open east door","open e door","open east doorway","open e doorway","open east","open e"],
            desc: "You see a small doorway leading east.",
            dest: "room_0003",
            checks:[],
        },
        {
            cmd: ["w","west","go w","go west","open west door","open w door","open west doorway","open w doorway","open west","open w"],
            desc: "There is a secure doorway leading West.",
            dest: "room_0001",
            checks:[
                {
                    flag: "flag_wearing_object_0002",
                    value: 1,
                    success: "You pass through the doorway with ease.",
                    failure: "You cannot pass through the doorway...The door remains firmly locked.",
                }
            ]
        }
    ],
    features: [
        {
            desc: "A large stone statue of a warrior stands in the corner of the room.",
            conditions: [
                {
                    flag: "flag.warrior_statue_examined",
                    value: 1,
                    true_response: "The warrior statue appears to be mounted on a movable platform.",
                },
                {
                    flag: "flag.warrior_statue_pushed",
                    value: 1,
                    true_response: "The statue appears to have been pushed aside slightly to reveal a small tunnel leading downward.",
                }
            ],
            actions: [
                {
                    cmd: ["examine statue","look statue","search statue"],
                    success_actions: [
                        {type: "response", value: "The statue is made of stone and depicts a warrior in full armor covered in a thick layer of dust. It appears to be mounted on a movable platform."},
                        {type: "flag_set", value: "flag.warrior_statue_examined"},
                    ],
                },
                {
                    cmd: ["push statue"],
                    success_actions: [
                        {type: "response", value: "You push the statue and it slides easily to the side."},
                        {type: "flag_set", value: "flag.warrior_statue_pushed"},
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
    exits: [
        { 
            cmd: ["w","west","go w","go west","open west door","open w door","open west doorway","open w doorway","open west","open w"],
            desc: "Secure doorway leading West.",
            dest: "room_0002",

        }
    ],
    features: [],
});
//================================================================================================================================================================
obj_load({
    id: "room_0004",
    desc_brief: "Room 4, Mouldy crypt.",
    desc_full: "A mouldy crypt with a stone sarcophagus in the center of the room.",
    desc_visited: "Empty Treasure Vault",
    flag_visited: 0,
    exits: [
        {
            cmd: ["w","west","go w","go west","open west door","open w door","open west doorway","open w doorway","open west","open w"],
            desc: "Secure doorway leading West.",
            dest: "room_0002",

        }
    ],
    features: [],
});
//================================================================================================================================================================
}
