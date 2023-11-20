namespace game.audio {
    export let AudioTotal: number = 0;
    
    const SmallTalkPath = './Assets/Templates/BOSS/shittalk.json'
    let SmallTalk: SmallTalk;
    let RandomizedIndex: Array<number> = [];
    let CurrentMessage: number = 0;

    interface SmallTalk {
        Lines: Array<string>
    }

    export async function init() {
        sounds.init();
        music.init();

        SmallTalk = (await utils.jsonfile.getData(SmallTalkPath)) as SmallTalk;
        RandomizedIndex = utils.number.getRandomIndex(SmallTalk.Lines.length);
    }

    export async function loadSounds() {
        if (!core.IsWake) {
            await display.speak(smallTalk(), 500, true);
            await display.speak(smallTalk(), 500, true);
            await display.speak('', 500, true);
        }

        await display.speak('Sound files initializing...', 1000, true);

        // Ensure keys are loaded and unhook the events
        let unfinished = true;
        while (unfinished) {
            if (getReady(audio.sounds.Tracks) < audio.sounds.total())
                await pause(100);
            else
                unfinished = false;
        }

        for (let index = 0; index < audio.sounds.total(); index++) {
            const sound = audio.sounds.Tracks[index].Element;
            if (Math.random() > 0.8 && !core.IsWake) // take a chance, display a thing
                await display.speak(audio.sounds.Paths[index], 0, true);
        }

        await display.speak('Sound files initialized...', 1000, true);
        await display.speak('', 500, true);
    }

    export async function loadMusic() {
        if (!core.IsWake) {
            await display.speak(smallTalk(), 500, true);
            await display.speak('', 500, true);
        }

        await display.speak('Music files initializing...', 1000, true);

        // Ensure songs are loaded and unhook the events
        let unfinished = true;
        while (unfinished) {
            if (getReady(audio.music.Tracks) < audio.music.total()) {
                await pause(100);
            }
            else
                unfinished = false;
        }

        for (let index = 0; index < audio.music.total(); index++) {
            const sound = audio.music.Tracks[index].Element;
            if (Math.random() > 0.3 && !core.IsWake) // take a chance, display a thing
                await display.speak(audio.music.Paths[index], 0, true);
        }

        await display.speak('Music files initialized...', 1000, true);
        await display.speak('', 500, true);
    }

    export function getReady(tracks: Array<GameAudio>): number {
        return tracks.filter(o => o.IsLoaded).length;
    }

    function smallTalk() {
        return SmallTalk.Lines[RandomizedIndex[CurrentMessageIndex()]]
    }

    function CurrentMessageIndex() {
        const cur = CurrentMessage;
        CurrentMessage++;
        return cur;
    }

}

namespace game {
    export class GameAudio {
        Element: HTMLAudioElement;
        Name: string;
        IsLoaded: boolean;

        constructor(path: string, volume: number = 1) {
            const element = new Audio(path);
            element.volume = volume;
            this.IsLoaded = false;
            this.Name = path.substring(path.lastIndexOf('/') + 1);

            if (element.readyState > 3)
                handleAudioPrep(undefined, this.Name);
            else
                $(element).one('canplaythrough', [this.Name], handleAudioPrep);

            this.Element = element;
        }
    }

    async function handleAudioPrep(event: any, data: any) {
        const name = event.data[0];
        let tracks: Array<GameAudio> = [];
        game.audio.music.Tracks.forEach(track => {
            if (track.Element.src.indexOf(name) > -1)
                track.IsLoaded = true

            tracks.push(track);
        });

        game.audio.music.Tracks = tracks;

        tracks = [];
        game.audio.sounds.Tracks.forEach(track => {
            if (track.Element.src.indexOf(name) > -1)
                track.IsLoaded = true

            tracks.push(track);
        });

        game.audio.sounds.Tracks = tracks;
    }
}