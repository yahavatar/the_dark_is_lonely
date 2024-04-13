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

    //Check for contents
    let room_id = lGet("current_room");
    let room = JSON.parse(lGet(room_id));
    let contents = room.contents;
    for (let i = 0; i < contents.length; i++){
        console.log("contents: ", contents[i].desc);
        for (let j = 0; j < contents[i].commands.length; j++){
            console.log("command: ", contents[i].commands[j].desc);
            for (let k = 0; k < contents[i].commands[j].match_phrases.length; k++){
                let match_phrase = contents[i].commands[j].match_phrases[k];
                console.log("match_phrase:", match_phrase);
                if (input == match_phrase){
                    took_action = 1;
                    //Make sure no pre-action checks fail
                    let pre_action_checks = contents[i].commands[j].pre_action_checks;
                    for (let l = 0; l < pre_action_checks.length; l++){
                        let check = pre_action_checks[l];
                        switch(check.type){
                            case "flag_check":
                                if (lGet(check.flag) == check.value){
                                    response_show(check.failed_response);
                                    return;
                                }
                                break;
                        }
                    }
                    //Execute all actions
                    let actions = contents[i].commands[j].actions;
                    for (let l = 0; l < actions.length; l++){
                        let action = actions[l];
                        switch(action.type){
                            case "response":
                                response_show(action.text);
                                break;
                            case "flag_set":
                                lSet(action.flag, action.value);
                                break;
                            case "move":
                                lSet("current_room", action.destination);
                                room_look();
                                return;
                        }
                    }
                }
            }
        }
    }


    /*
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
        console.log("feature: ", features[i].desc);
        for (let j = 0; j < features[i].commands.length; j++){
            console.log("command: ", features[i].commands[j].desc);
            for (let k = 0; k < features[i].commands[j].match_phrases.length; k++){
                let match_phrase = features[i].commands[j].match_phrases[k];
                console.log("check command phrase:", match_phrase);
                if (input == match_phrase){
                    took_action = 1;

                    //Make sure no pre-action checks fail
                    let pre_action_checks = features[i].commands[j].pre_action_checks;
                    for (let l = 0; l < pre_action_checks.length; l++){
                        let check = pre_action_checks[l];
                        switch(check.type){
                            case "flag_check":
                                if (lGet(check.flag) == check.value){
                                    response_show(check.failed_response);
                                    return;
                                }
                                break;
                        }
                    }
                    //Execute all actions
                    let actions = features[i].commands[j].actions;
                    for (let l = 0; l < actions.length; l++){
                        console.log("action:", actions[l].type);
                        let action = actions[l];
                        switch(action.type){
                            case "response":
                                response_show(action.text);
                                break;
                            case "flag_set":
                                lSet(action.flag, action.value);
                                break;
                        }
                    }
                }
            }
        }
    }
    */

    if (took_action == 1){ return; }
    response_show("That command is unknown or meaningless at this time...");

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

    //Add all content descriptions to the response
    let contents = room.contents;
    for (let i = 0; i < contents.length; i++){
        console.log("contents: ", contents[i].desc);
        //Make sure there are no pre-discovery checks that fail
        let pre_discovery_checks = contents[i].pre_discovery_checks;
        for (let j = 0; j < pre_discovery_checks.length; j++){
            let check = pre_discovery_checks[j];
            console.log("pre_discovery check: ", check);
            switch(check.type){
                case "flag_check":
                    if (lGet(check.flag) == check.value){
                        response += " " + check.failed_response;
                        return;
                    }
                    break;
            }
        }
        //response += " " + contents[i].desc;
    }


    /*
    //Add all exit descriptions to the response
    let exits = room.exits;
    for (let i = 0; i < exits.length; i++){
        response += " " + exits[i].desc;
    }

    //Add all feature descriptions to the response
    let features = room.features;
    for (let i = 0; i < features.length; i++){
        response += " " + features[i].desc;
        //Process feature checks
        let checks = features[i].checks;
        for (let j = 0; j < checks.length; j++){
            let flag = checks[j].flag;
            let value = checks[j].value;
            let true_response = checks[j].true_response;
            if (lGet(flag) == value){
                response += " " + true_response;
            }
        }
    }
    */

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