import { addControl } from "./controls.js";
import { getVolOffset, pause } from "./utils.js";

var currentText = '';
var sentences = [];
var curSentence = 0;
var speed = 10;
var prevChar = '';
var play = -1;

const screen = $('.story');

const typing1 = new Audio('./Assets/Audio/Typing/type1.mp3');
typing1.loop = true;
const typing2 = new Audio('./Assets/Audio/Typing/type2.mp3');
const typing3 = new Audio('./Assets/Audio/Typing/type3.mp3');
const typing4 = new Audio('./Assets/Audio/Typing/type4.mp3');
const typing5 = new Audio('./Assets/Audio/Typing/type5.mp3');
const typing6 = new Audio('./Assets/Audio/Typing/type6.mp3');
const typing7 = new Audio('./Assets/Audio/Typing/type7.mp3');
const typing8 = new Audio('./Assets/Audio/Typing/type8.mp3');
const typing9 = new Audio('./Assets/Audio/Typing/type9.mp3');
const typing10 = new Audio('./Assets/Audio/Typing/type10.mp3');

const spacebar1 = new Audio('./Assets/Audio/Typing/space1.mp3');
const spacebar2 = new Audio('./Assets/Audio/Typing/space2.mp3');

export function clear() {
    screen.text('');
}

export function say(text) {
    currentText = text;
    prevChar = ' ';
    curSentence = 0;
    preprocessText();
    typeNextSentence();
}

export async function stateAndWait(text, delay = 1000) {
    currentText = text;
    prevChar = ' ';
    curSentence = 0;
    type(false);

    await pause(delay);
}

export function typeNextSentence() {
    currentText = sentences[curSentence];
    type();

    curSentence++
    if (sentences.length > curSentence)
        return;
    else {
        curSentence = 0;
        sentences = [];
    }
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

async function type(hasContinue = true) {
    for (var i = 0; i <= currentText.length; i++) {
        var curtext = currentText.substring(0, i)
        var curChar = curtext.slice(-1);
        var s = playTyping(curChar, prevChar);
        screen.text(curtext);

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
        s = s * 2;

        play = Math.ceil(Math.random() * 4)
        switch (play) {
            case 1: {
                spacebar1.volume = getVolOffset();
                spacebar1.play();
                break;
            }
            case 2: {
                spacebar2.volume = getVolOffset();
                spacebar2.play();
                break;
            }
            case 3: {
                spacebar1.volume = getVolOffset();
                spacebar1.play();
                break;
            }
            case 4: {
                spacebar2.volume = getVolOffset();
                spacebar2.play();
                break;
            }
        }
    }
    else {
        if (curChar !== prevChar)
            play = Math.ceil(Math.random() * 10)

        switch (play) {
            case 1: {
                typing1.volume = getVolOffset();
                typing1.play();

                break;
            }
            case 2: {
                typing2.volume = getVolOffset();
                typing2.play();
                break;
            }
            case 3: {
                typing3.volume = getVolOffset();
                typing3.play();
                break;
            }
            case 4: {
                typing4.volume = getVolOffset();
                typing4.play();
                break;
            }
            case 5: {
                typing5.volume = getVolOffset();
                typing5.play();
                break;
            }
            case 6: {
                typing6.volume = getVolOffset();
                typing6.play();
                break;
            }
            case 7: {
                typing7.volume = getVolOffset();
                typing7.play();
                break;
            }
            case 8: {
                typing8.volume = getVolOffset();
                typing8.play();
                break;
            }
            case 9: {
                typing9.volume = getVolOffset();
                typing9.play();
                break;
            }
            case 10: {
                typing10.volume = getVolOffset();
                typing10.play();
                break;
            }
        }
    }

    return s;
}