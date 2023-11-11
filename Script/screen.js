import { color as colorEnum } from "./enums.js";
import { sounds as keys } from "./Audio/sounds.js";
import { getVolOffset, pause } from "./utils.js";
import { addControl } from "./controls.js";
import { disableControls, disableinputs, enableControls } from "./Utils/effects.js";

var currentText = '';
var sentences = [];
var curSentence = 0;
var speed = 50;
var prevChar = '';
var play = -1;

const maxheight = 300;

const screen = $('.story');

export function clear() {
    screen.html('');
}

function addLine(color = '') {
    const line = $(`<line${(color.length > 0 ? ` style="--accent-color: ${colorEnum[color]};"` : ` style="--accent-color: ${colorEnum.green};"`)}>> </line>`);
    
    // Fit lines in the screen area
    let height = 0;
    let unfit = true;
    while(unfit) {
        const lines = $(screen.find('line'));
        if (lines && lines.length > 10){
            lines.each((i, line) => {
                height += $(line).height();
            });

            if (height >= maxheight) {
                lines[0].remove();
                height = 0;
            }
            else
                unfit = false;

        } else
            unfit = false;
    } 

    screen.append(line);

    return line;
}

export async function say(text, color = '', hasContinue = true) {
    currentText = text;
    prevChar = ' ';
    curSentence = 0;
    preprocessText();
    await typeNextSentence(hasContinue, color);
}

export async function stateAndWait(text, delay = 1000, add = false, color = '') {
    currentText = text;
    prevChar = ' ';
    curSentence = 0;
    await type(false, add, color);

    await pause(delay);
    enableControls();
}

export async function typeNextSentence(hasContinue = true, color = '') {
    currentText = sentences[curSentence];
    await type(hasContinue, true, color);

    curSentence++
    if (sentences.length > curSentence)
        return;
    else {
        curSentence = 0;
        sentences = [];
    }
    enableControls();
}

function preprocessText() {
    sentences = [];
    var go = true;

    var mangleMe = currentText;

    while (go) {
        if (mangleMe.length > 250) {
            var stop = mangleMe.indexOf('.') + 1;
            var sentence = mangleMe.substring(0, stop);

            mangleMe = mangleMe.replace(sentence, '').trimStart();
            sentences.push(sentence);
        }
        else {
            sentences.push(mangleMe);
            go = false;
        }
    }
}

async function type(hasContinue = true, add = false, color = '') {
    disableinputs();
    if (!add) 
        clear();

    const line = addLine(color);

    currentText = line.text() + currentText;

    for (var i = 2; i <= currentText.length; i++) {
        var curtext = currentText.substring(0, i)
        var curChar = curtext.slice(-1);
        var s = playTyping(curChar, prevChar);
        
        line.text(curtext);
        prevChar = curtext.slice(-1);
        await pause(s);
    }

    // spawn continue
    if(hasContinue)
        addControl('Continue...', 'continue');
}

function playTyping(curChar) {
    var s = speed + Math.floor(Math.random() * 51);

    if (curChar === ' ') {
        play = Math.ceil(Math.random() * 2)

        const sound = keys.audio[`space${play}`];
        sound.volume = getVolOffset();
        sound.play();
    } else if (curChar === '.') {
        const sound = keys.audio['type1'];
        sound.volume = getVolOffset();
        sound.play();
    } else {
        if (curChar !== prevChar)
            play = Math.ceil(Math.random() * 10);

        const sound = keys.audio[`type${play}`];
        sound.volume = getVolOffset();
        sound.play();
    }

    return s;
}