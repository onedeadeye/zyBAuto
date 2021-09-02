// ==UserScript==
// @name         zyBooks Autocomplete
// @version      0.1
// @description  One click to speed up the boring parts
// @author       Evanito, Cbass and Liam Daley
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
(function () {
    console.log(timeString() + " [zBA] Begin zyBooks Autocomplete by Evanito.");
    if (autoRun) {
        run();
    } else {
        document.getElementsByClassName('right-buttons')[0].innerHTML += '<button id="zbaButton" type="button">Autocomplete!</button>';
        document.getElementById("zbaButton").addEventListener("click", zBAStartButton, false);
    }
})();


function zBAStartButton(zEvent) {
    console.log(timeString() + " [zBA] Running...");
    run();
}

function run() {
    click_speeds();
    multChoice();
    textIn();
  	other();
}
function other() {
    click_plays();
    click_starts();
    setTimeout(function () {
        other();
    }, 1000);
}

function click_speeds() { // Checks speed boxes.
    var speed = document.getElementsByClassName("speed-control");
    for (var i = 0; i < speed.length; i++) {
        console.log(speed[i].firstElementChild);
        speed[i].firstElementChild.firstChild.click();
        console.log(" Checked a speed box.");
    }
  	console.log(" checked " + speed.length + " speed boxes")
}

function click_plays() { // Clicks all Play buttons
    var plays = document.getElementsByClassName("play-button");
    for (var i = 0; i < plays.length; i++) {
        if (!(plays[i].classList).contains("rotate-180")) {
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
    let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
    let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    let s = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    let dstr = h + ':' + m + ":" + s;
    return dstr;
}

function textIn() {
    var checker = document.getElementsByClassName("show-answer-button");
    var targText = document.getElementsByClassName("forfeit-answer");
    var checkButton = document.getElementsByClassName("check-button");
    var paster = document.getElementsByClassName("zb-text-area");
  	var c = 0;
    for (var i = 0; i < checker.length; i++) {
      	console.log("on text loop " + i);
        checker[i].click();
        checker[i].click();
        /*var exp = document.getElementsByClassName("explanation has-explanation forfeit");
        var hold = exp[i].getElementsByClassName("answers")[0];
        var skips = hold.getElementsByClassName("or-text").length;
        if (skips != 0) {
            c = c + skips;
            c++;
        } else {
            c++;
        }*/
      	paster[i].focus();
        paster[i].value = targText[i].textContent;
      	//checkButton[i].click();
      	c = 0;
    }
  	for (var j = 0; j < checker.length; j++) {
      	console.log("on j loop " + j);
    		checkButton[j].click(); 
    }
}

function multChoice() {
    var allQ = document.getElementsByClassName("question-set-question multiple-choice-question");
    var button = allQ[0].getElementsByClassName("zb-radio-button");
    console.log(button.length);
    console.log(allQ.length);
    for (var b = 0; b < allQ.length; b++) {
        console.log(b);
        if (allQ[b].innerHTML.includes("Question completed")) {
        } else {
            var buttonQ = allQ[b].getElementsByClassName("zb-radio-button");
            console.log(buttonQ.length);
            for (var c = 0; c < buttonQ.length; c++) {
                buttonQ[c].getElementsByTagName('input')[0].click();
            }

        }
    }


}
