// ==UserScript==
// @name         zyBooks Autocomplete
// @version      0.1
// @description  One click to speed up the boring parts
// @author       Evanito
// @match        https://learn.zybooks.com/zybook/*
// @namespace https://github.com/Evanito/zyBAuto
// @run-at document-idle
// ==/UserScript==
// TO USE: Click Autocomplete! on a zyBooks page <-----

// ==== SETTINGS ====
var autoRun = false;
// == END SETTINGS ==

// Do not edit below this line!
// ==========================================
(function() {
    console.log(timeString() + " [zBA] Begin zyBooks Autocomplete by Evanito, Edited By Cbass.");
    if (autoRun) {
        run();
    } else {
        document.getElementsByClassName('right-buttons')[0].innerHTML += '<button id="zbaButton" type="button">Autocomplete!</button>';
        document.getElementById("zbaButton").addEventListener ("click", zBAStartButton, false);
    }
})();


function zBAStartButton (zEvent) {
    console.log(timeString() + " [zBA] Running...");
    run();
}
var o = 0;
function run() {
    //click_speeds();
    click_plays();
    click_starts();
    console.log("loop");
    if (o == 0){
        //   textIn();
        multChoice();
    }
    o= o +1;
    setTimeout(function(){ run(); }, 1000);
}

function click_speeds() { // Checks speed boxes. Doesn't work but isn't a necessary feature.
    var speed = document.getElementsByClassName("speed-control");
    for (var i = 0; i < speed.length; i++) {
        if ((speed[i].innerHTML).includes("false")) {
            //speed[i].click();
            speed[i].getElementsByClassName("zb-checkbox")[0].innerHTML = "\n<input type=\"checkbox\" value=\"true\" aria-label=\"2x speed\">\n<label aria-hidden=\"true\">2x speed</label>\n"
            console.log(timeString() + " Checked a speed box.");
        }
    }
}

function click_plays() { // Clicks all Play buttons
    var plays = document.getElementsByClassName("play-button");
    for (var i = 0; i < plays.length; i++) {
        if (!(plays[i].classList).contains("rotate-180")){
            plays[i].click();
            console.log(timeString() + " Clicked a play button.");
        }
    }
}

function click_starts() { // Clicks all Start buttons
    var starts = document.getElementsByClassName("start-button");
    for (var i = 0; i < starts.length; i++) {
        starts[i].click();
        console.log(timeString() + " Clicked a start button.");
    }
}

function timeString() {
    let d = new Date();
    let h = (d.getHours()<10?'0':'') + d.getHours();
    let m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    let s = (d.getSeconds()<10?'0':'') + d.getSeconds();
    let dstr = h + ':' + m + ":" + s;
    return dstr;
}
function textIn(){
    var checker = document.getElementsByClassName("show-answer-button");
    var exp = document.getElementsByClassName("explanation");
    var c = 0;
    var targText = document.getElementsByClassName("forfeit-answer");
    var paster = document.getElementsByClassName("zb-text-area");
    console.log(checker);
    for (var i = 0; i < checker.length; i++) {
        checker[i].click();
        checker[i].click();
        console.log(timeString() + " Clicked a get answer button.");
        console.log(targText[c].textContent);
        paster[i].value = targText[c].textContent;
        console.log((exp[i].getElementsByClassName("answers")[0].getElementsByClassName("or-text")).length);
        var skips = exp[i].getElementsByClassName("answers")[0].getElementsByClassName("or-text").length;
        if (skips!=0){
            c=c+skips;
            c++;
        }
        else{
            c++;
        }
    }
}
function multChoice(){
    var allQ = document.getElementsByClassName("question-set-question multiple-choice-question");
    var button = allQ[0].getElementsByClassName("zb-radio-button");
    var incorrect = document.getElementsByClassName("explanation");
    console.log(button.length);
    for (var b = 0; b < allQ.length; b++) {
        if(allQ[b].innerHTML.includes("Question completed")){
            b++;
        }
        else{
            console.log("here");
            var buttonQ = allQ[b].getElementsByClassName("zb-radio-button");
            for(var c =0; c<buttonQ.length;c++){
                buttonQ[c].click();
            }
            b++;

        }
    }

}