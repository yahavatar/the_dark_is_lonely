console.log("the_dark_is_lonely_rooms.js loaded");

function rooms_load(){

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
            actions: [
                {
                    desc: "You push the statue.",
                    commands: ["push statue"],
                    pre_actions: [
                        {
                            action: "check_flag",
                            flag: "flag_statue_pushed",
                            value: 0,
                            success: "The statue moves easily.",
                            failure: "The statue does not move.",
                        }
                    ],
                    post_actions: [
                        {
                            action: "set_flag",
                            flag: "flag_statue_pushed",
                            value: 1
                        }
                    ]
                }
            ]
        }
    ],
});
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

}
