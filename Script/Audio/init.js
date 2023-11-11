import { get } from "../Utils/jsonFile.js";
import { getRandomIndex as getDex} from "../Utils/numbers.js";
import { addControl } from "../controls.js";
import { say, stateAndWait } from "../screen.js";
import { pause } from "../utils.js";
import { music as m} from "./music.js";
import { sounds as s } from "./sounds.js";
import { color as colorEnum } from "../enums.js";

export const gameAudio = {
    audioReady: 0,
    audioTotal: 0,
    songs: {},
    files: [],
    st: [],
    sti: [],
    curMsg: 0,
    curMsgi: function() {
        const cur = this.curMsg;
        this.curMsg++;
        return cur;
    },
    sTalk: function() { return this.st[this.sti[this.curMsgi(this)]]},
    init: async function() {
        s.init();
        m.init();

        const result = await get('./Assets/Templates/BOSS/shittalk.json');
        this.st = result.lines;
        this.sti = getDex(this.st.length);
    },
    loadSounds: async function() {

        await stateAndWait(this.sTalk(), 500, true);
        await stateAndWait(this.sTalk(), 500, true);
        await stateAndWait('', 500, true);
        await stateAndWait('Sound files initializing...', 1000, true);

        // Ensure keys are loaded and unhook the events
        let unfinished = true;
        while (unfinished) {
            if (this.audioReady < s.total()) {
                await pause(100);
            }
            else
                unfinished = false;
        }

        const types = s.props();

        for (let index = 0; index < s.total(); index++) {
            const sound = s.audio[types[index]];
            sound.removeEventListener('canplaythrough', handleAudioPrep());
            if (Math.random() > 0.8) // take a chance, display a thing
                await stateAndWait(this.files[index], 0, true);
        }

        await stateAndWait('Sound files initialized...', 1000, true);
        await stateAndWait('', 500, true);
    },
    loadMusic: async function () {
        await stateAndWait(this.sTalk(), 500, true);
        await stateAndWait('', 500, true);
        await stateAndWait('Music files initializing...', 1000, true);
        
        // Ensure songs are loaded and unhook the events
        let unfinished = true;
        while (unfinished) {
            if (this.audioReady < m.total()) {
                await pause(100);
            }
            else
                unfinished = false;
        }
    
        const songs = m.props();

        for (let index = 0; index < m.total(); index++) {
            const sound = m.audio[songs[index]];
            sound.removeEventListener('canplaythrough', handleAudioPrep());
            if (Math.random() > 0.3) // take a chance, display a thing
                await stateAndWait(this.files[index + s.total()], 0, true);
        }

        await stateAndWait('Music files initialized...', 1000, true);
        await stateAndWait('', 500, true);
        await say('Would you like some "tunes"?', 'yellow', false);
        addControl('Yes', 'playMusic_yes', colorEnum.mediumpurple);
        addControl('No', 'playMusic_no', colorEnum.red);
        addControl(' ', '', colorEnum.transparent);
        addControl(' ', '', colorEnum.transparent);
    }
}

export function handleAudioPrep() {
    gameAudio.audioReady++;
}