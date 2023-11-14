import { get } from "../Utils/jsonFile.js";
import { getRandomIndex as getDex } from "../Utils/numbers.js";
import { pause } from "../utils.js";
import { music as m } from "./music.js";
import { sounds as s } from "./sounds.js";
import { speak } from "../Display/core.js";

export const gameAudio = {
    audioReady: 0,
    audioTotal: 0,
    songs: {},
    files: [],
    st: [],
    sti: [],
    curMsg: 0,
    curMsgi: function () {
        const cur = this.curMsg;
        this.curMsg++;
        return cur;
    },
    sTalk: function () { return this.st[this.sti[this.curMsgi(this)]] },
    init: async function () {
        s.init();
        m.init();

        const result = await get('./Assets/Templates/BOSS/shittalk.json');
        this.st = result.lines;
        this.sti = getDex(this.st.length);
    },
    loadSounds: async function (isWake) {
        if (!isWake) {
            await speak(this.sTalk(), 500, true);
            await speak(this.sTalk(), 500, true);
            await speak('', 500, true);
        }
        await speak('Sound files initializing...', 1000, true);

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
            if (Math.random() > 0.8 && !isWake) // take a chance, display a thing
                await speak(this.files[index], 0, true);
        }

        await speak('Sound files initialized...', 1000, true);
        await speak('', 500, true);
    },
    loadMusic: async function (isWake) {
        if (!isWake) {
            await speak(this.sTalk(), 500, true);
            await speak('', 500, true);
        }
        await speak('Music files initializing...', 1000, true);

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
            if (Math.random() > 0.3 && !isWake) // take a chance, display a thing
                await speak(this.files[index + s.total()], 0, true);
        }

        await speak('Music files initialized...', 1000, true);
        await speak('', 500, true);
    }
}

export function handleAudioPrep() {
    gameAudio.audioReady++;
}