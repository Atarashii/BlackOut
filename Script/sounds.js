import { addControl } from "./controls.js";
import { say, stateAndWait } from "./screen.js";
import { pause } from "./utils.js";

export let audioReady = 0;
export let audioTotal = 0;

const files = [];

export let keys = {};
const keysPath = './Assets/Audio/Typing/##.mp3';
export let songs = {};
const songsPath = './Assets/Audio/Music/##.mp3';

export function initSound() {
    keys = {
        type1: prepareAudio(keysPath, 'type1'),
        type2: prepareAudio(keysPath, 'type2'),
        type3: prepareAudio(keysPath, 'type3'),
        type4: prepareAudio(keysPath, 'type4'),
        type5: prepareAudio(keysPath, 'type5'),
        type6: prepareAudio(keysPath, 'type6'),
        type7: prepareAudio(keysPath, 'type7'),
        type8: prepareAudio(keysPath, 'type8'),
        type9: prepareAudio(keysPath, 'type9'),
        type10: prepareAudio(keysPath, 'type10'),

        space1: prepareAudio(keysPath, 'space1'),
        space2: prepareAudio(keysPath, 'space2')
    }

    songs = {
        song1: prepareAudio(songsPath, 'song1', 0.5),
        song2: prepareAudio(songsPath, 'song2', 0.5),
        song3: prepareAudio(songsPath, 'song3', 0.5),
        song4: prepareAudio(songsPath, 'song4', 0.5),
        song5: prepareAudio(songsPath, 'song5', 0.5)
    }
}

export async function loadSounds() {
    await stateAndWait('Calibrating emotions...', 500, true);
    await stateAndWait('Stabalizing inner butt-crystals...', 500, true);
    await stateAndWait('', 500, true);
    await stateAndWait('\n\nSound files initializing...', 1000, true);
    let props = Object.getOwnPropertyNames(keys);
    const keysTotal = props.length;
    // Ensure keys are loaded and unhook the events
    let unfinished = true;
    while (unfinished) {
        if (audioReady < keysTotal) {
            await pause(100);
        }
        else
            unfinished = false;
    }
    for (let index = 0; index < keysTotal; index++) {
        const sound = keys[props[index]];
        sound.removeEventListener('canplaythrough', handleAudioPrep());
        if (Math.random() > 0.8) // take a chance, display a thing
            await stateAndWait(files[index], 0, true);
    }

    props = Object.getOwnPropertyNames(songs);
    const songsotal = props.length;
    // Ensure songs are loaded and unhook the events
    unfinished = true;
    while (unfinished) {
        if (audioReady < keysTotal + songsotal) {
            await pause(100);
        }
        else
            unfinished = false;
    }

    for (let index = 0; index < songsotal; index++) {
        const sound = songs[props[index]];
        sound.removeEventListener('canplaythrough', handleAudioPrep());
        if (Math.random() > 0.6) // take a chance, display a thing
            await stateAndWait(files[index + keysTotal], 0, true);
    }

    await stateAndWait('Sound files initialized...', 2000, true);
    await say('would you like some "tunes"?', 'yellow', false);
    addControl('yes', 'playMusic_yes');
    addControl('no', 'playMusic_no', 'red');
}

function prepareAudio(src, index, volume = 1) {
    if (keys && keys[index] && keys[index].src)
        return keys[index];

    audioTotal++;
    const sound = new Audio(src.replace('##', index));
    files.push(src.replace('##', index));
    sound.volume = volume;

    sound.addEventListener('canplaythrough', handleAudioPrep());

    return sound;
}

function handleAudioPrep() {
    audioReady++;
}