console.log("the_dark_is_lonely_objects.js loaded");

function objects_load(){

obj_load({
    id: "object_0001",
    desc: "Golden Key",
    inv: 1,
    type: "key",
    weight: 0
});
obj_load({
    id: "object_0002",
    desc: "Silver Ring",
    inv: 1,
    type: "ring",
    weight: 0,
    actions: [
        {
            desc: "You put on the Silver Ring.",
            flag: "flag_wearing_object_0002",
            value: 1,
            commands: ["wear ring","wear silver ring","put on ring", "put on silver ring","equip ring","equip silver ring"],
            pre_actions:[
                {
                    action: "enequip",
                    object_type: "ring"
                }
            ],
            post_actions:[
                {
                    action: "set_flag",
                    flag: "flag_wearing_object_0002",
                    value: 1
                }
            ]
        }
    ]

});

}
