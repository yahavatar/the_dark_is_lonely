console.log("mj_if_engine.js loaded");

function lGet(key){
    key = window.game_key + "." + key;
    console.log("lGet(" + key + ")");
    return localStorage.getItem(key);
}
function lSet(key, value){
    console.log("lSet(" + key + ", " + value + ")");
    localStorage.setItem(window.game_key + "." + key, value);
}
function lDel(key){
    localStorage.removeItem(window.game_key + "." + key);
}
//Mark:: parse_input
function parse_input(){
    console.log("parse_input()");
    let took_action = 0;
    let input_original = document.getElementById("user-input").value;
    let input = document.getElementById("user-input").value.toLowerCase().trim();   //Lowercase() and trim() the input
    input = input.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');               //Remove punctuation
    let input_array = input.split(/[\s,]+/);                                        //Split input
    response_show(input_original);
    lSet("last_line", input_original)
    user_input_clear();

    //Look for generic commands
    switch(input){
        case "l":
        case "look":
        
        case "search":
            room_look();
            took_action = 1;
            return;
    }

    //Check for exit commands:
    let room_id = lGet("current_room");
    let room = JSON.parse(lGet(room_id));
    let exits = room.exits;
    console.log(exits.length);
    for (let i = 0; i < exits.length; i++){
        for (let j = 0; j < exits[i].cmd.length; j++){
            if (input == exits[i].cmd[j]){
                took_action = 1;
                let dest = exits[i].dest;
                lSet("current_room", dest);
                room_look();
                return;
            }
        }
    }

    //Look for feature commands
    let features = room.features;
    console.log(features);
    for (let i = 0; i < features.length; i++){
        console.log(features[i]);
        for (let j = 0; j < features[i].actions.length; j++){
            console.log(features[i].actions[j]);
            for (let k = 0; k < features[i].actions[j].cmd.length; k++){
                console.log(features[i].actions[j].cmd[k]);
                if (input == features[i].actions[j].cmd[k]){
                    took_action = 1;
                    console.log("Match!" + input);
                    let success_actions = features[i].actions[j].success_actions;
                    for (let l = 0; l < success_actions.length; l++){
                        console.log(success_actions[l]);
                        let action = success_actions[l];
                        switch(action.type){
                            case "response":
                                response_show(action.value);
                                break;
                            case "flag_set":
                                lSet(action.value, 1);
                                break;
                        }
                    }
                }
            }
        }
    }
    if (took_action == 1){ return; }

    response_show("That command is either unknown or can't be executed here.");

}
function obj_load(obj){
    let obj_id = obj.id;
    console.log("object loaded: " + obj_id );
    lSet(obj_id,  JSON.stringify(obj));
}
function room_look(){
    console.log("room_look()");
    //Describe the room, exits, and features
    let room_id = lGet("current_room");
    let room = JSON.parse(lGet(room_id));
    //console.log(room);
    
    let response = room.desc_full;

    //Add all exit descriptions to the response
    let exits = room.exits;
    for (let i = 0; i < exits.length; i++){
        response += " " + exits[i].desc;
    }

    //Add all feature descriptions to the response
    let features = room.features;
    for (let i = 0; i < features.length; i++){
        response += " " + features[i].desc;
        //Process feature conditions
        let conditions = features[i].conditions;
        for (let j = 0; j < conditions.length; j++){
            let flag = conditions[j].flag;
            let value = conditions[j].value;
            let true_response = conditions[j].true_response;
            if (lGet(flag) == value){
                response += " " + true_response;
            }
        }
    }

    response_show(response);
}
function screen_setup(){
    document.body.innerHTML = `
        <div id="header">
        </div>
        <div id="content">
            <div id="history"></div>
            <br>
            <div>
                <table border=0 cellpadding=0 cellspacing=0>
                    <tr><td>></td><td><input type="text" id="user-input" onfocusout="user_input_setfocus();" autofocus size="100"></td></tr>
                </table>
            </div>
        </div>
        <div id="footer">
            
        </div>
    `;
    user_input_clear();                     //Clear user-input field

    //Add event listener to user-input field
    document.getElementById("user-input").addEventListener("keyup", (event) => {
        if (event.key == "Enter"){
            parse_input();
        }
        if (event.key == "ArrowUp"){
            user_input_repeat();
        }
    });
}
function response_show(message){
    console.log("response_show(" + message+ ")");
    let history = document.getElementById("history");
    history.innerHTML += "<br>" + message

}
function user_input_clear(){
    document.getElementById("user-input").value = "";
}
function user_input_repeat(){
    document.getElementById("user-input").value = lGet("last_line");
}
function user_input_setfocus(){
    setTimeout(() => {
        //console.log("user_input_setfocus()");
        document.getElementById("user-input").focus();    
    }, 1000);
}