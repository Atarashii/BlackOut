import { sounds as key } from "../Audio/sounds.js";
import { disableinputs, enableControls } from "../Utils/effects.js";
import { getVolOffset as getKeyVol, pause } from "../utils.js";
import { line as l } from "./lines.js";

// Rules
const _MAX_HEIGHT = 300;
const _TYPING_SPEED = 50;

// Internal globals
let CurrentText = '';
let Sentences = [];
let CurrentSentence = 0;
let PreviousCharacter = '';
let PlayVariant = -1;

const story = $('.story');

export function clear() {
    story.html('');
}

function addLine(color = '') {
    const line = l.create(color);

    story.append(line);
    lineHeightCheck();

    return line;
}

function lineHeightCheck() {
    let height = 0;
    let unfit = true;
    while (unfit) {
        const lines = $(story.find('line'));

        if (lines && lines.length > 10) {
            lines.each((i, l) => {
                height += $(l).height();
            });

            if (height >= _MAX_HEIGHT) {
                lines[0].remove();
                height = 0;
            } else
                unfit = false;
        } else
            unfit = false;
    }
}

function preProcessText() {
    Sentences = [];
    let go = true;
    let choppingBoard = CurrentText;

    while (go) {
        if (choppingBoard.length > 250) {
            let stopIndex = choppingBoard.indexOf('...') + 1; // Check for elipses first
            if (stopIndex < 0)
                stopIndex = choppingBoard.indexOf('.') + 1; // Check if we are at the end of a sentence

            let sentence = choppingBoard;
            if (stopIndex > 0) {
                sentence = choppingBoard.substring(0, stopIndex);

                choppingBoard = choppingBoard.replace(sentence, '').trimStart();
            }

            Sentences.push(sentence);
        }
        else {
            Sentences.push(choppingBoard);
            go = false;
        }
    }
}

export async function speak(text, delay = 1000, add = false, color = '') {
    CurrentText = text;
    PreviousCharacter = '';
    CurrentSentence = 0;
    await type(false, add, color);

    await pause(delay);
    enableControls();
}

export async function longSpeak(text, color = '', hasContinue = true) {
    CurrentText = text;
    PreviousCharacter = '';
    CurrentSentence = 0;
    preProcessText();
    await continueSpeak(hasContinue, color);
}

export async function continueSpeak(hasContinue = true, color = '') {
    CurrentText = Sentences[CurrentSentence];
    await type(hasContinue, true, color);

    CurrentSentence++
    if (Sentences.length > CurrentSentence)
        return;
    else {
        CurrentSentence = 0;
        Sentences = [];
    }

    enableControls();
}

async function type(hasContinue = true, add = false, color = '') {
    disableinputs();

    if (!add)
        clear();

    const line = addLine(color);

    const text = line.text() + CurrentText;

    for (let index = 2; index <= text.length; index++) {
        var written = text.substring(0, index);
        var lastChar = written.slice(-1);
        var delay = _TYPING_SPEED + Math.floor(Math.random() * 50);
        typeSound(lastChar);

        line.text(written);
        PreviousCharacter = written.slice(-1);
        await pause(delay);
    }
}

function typeSound(character) {
    switch (character) {
        case ' ': {
            PlayVariant = Math.ceil(Math.random() * 2);

            const sound = key.audio[`space${PlayVariant}`];
            sound.volume = getKeyVol();
            sound.play()
            break;
        }
        case '.': {
            const sound = key.audio['type1'];
            sound.volume = getKeyVol();
            sound.play();
            break;
        }
        default: {
            if (character !== PreviousCharacter)
                PlayVariant = Math.ceil(Math.random() * 10);

            const sound = key.audio[`type${PlayVariant}`];
            sound.volume = getKeyVol();
            sound.play();
            break;
        }
    }
}