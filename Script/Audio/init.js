import { addControl } from "../controls.js";
import { say, stateAndWait } from "../screen.js";
import { pause } from "../utils.js";
import { music as m} from "./music.js";
import { sounds as s } from "./sounds.js";

export const gameAudio = {
    audioReady: 0,
    audioTotal: 0,
    songs: {},
    files: [],
    init: function() {
        s.init();
        m.init();
    },
    loadSounds: async function() {
        const ga = gameAudio;

        await stateAndWait('Calibrating emotions...', 500, true);
        await stateAndWait('Stabalizing inner butt-crystals...', 500, true);
        await stateAndWait('', 500, true);
        await stateAndWait('\n\nSound files initializing...', 1000, true);

        // Ensure keys are loaded and unhook the events
        let unfinished = true;
        while (unfinished) {
            if (ga.audioReady < s.total()) {
                await pause(100);
            }
            else
                unfinished = false;
        }

        const types = s.props();
        const chance = (types.length / 10).toFixed(1);

        for (let index = 0; index < s.total(); index++) {
            const sound = s.audio[types[index]];
            sound.removeEventListener('canplaythrough', handleAudioPrep());
            if (Math.random() > chance) // take a chance, display a thing
                await stateAndWait(ga.files[index], 0, true);
        }

        await stateAndWait('Sound files initialized...', 1000, true);
        await stateAndWait('', 500, true);
    },
    loadMusic: async function () {
        const ga = gameAudio;

        await stateAndWait('Moving cat off keyboard...', 500, true);
        await stateAndWait('', 500, true);
        await stateAndWait('\n\nMusic files initializing...', 1000, true);
        
        // Ensure songs are loaded and unhook the events
        let unfinished = true;
        while (unfinished) {
            if (ga.audioReady < m.total()) {
                await pause(100);
            }
            else
                unfinished = false;
        }
    
        const songs = m.props();
        const chance = (songs.length / 10).toFixed(1);

        for (let index = 0; index < m.total(); index++) {
            const sound = m.audio[songs[index]];
            sound.removeEventListener('canplaythrough', handleAudioPrep());
            if (Math.random() > chance) // take a chance, display a thing
                await stateAndWait(ga.files[index + s.total()], 0, true);
        }

        await stateAndWait('Music files initialized...', 1000, true);
        await stateAndWait('', 500, true);
        await say('would you like some "tunes"?', 'yellow', false);
        addControl('yes', 'playMusic_yes');
        addControl('no', 'playMusic_no', 'red');
    }
}

export function handleAudioPrep() {
    gameAudio.audioReady++;
}