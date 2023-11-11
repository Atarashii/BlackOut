import { gameAudio as ga, handleAudioPrep as handler} from "./init.js";

export const sounds = {
    path: './Assets/Audio/Typing/##.mp3',
    audio: {},
    init: () => {
        const audio = sounds.audio;
        const path = sounds.path;

        // Key type sounds
        audio.type1 = sounds.prep(path, 'type1');
        audio.type2 = sounds.prep(path, 'type2');
        audio.type3 = sounds.prep(path, 'type3');
        audio.type4 = sounds.prep(path, 'type4');
        audio.type5 = sounds.prep(path, 'type5');
        audio.type6 = sounds.prep(path, 'type6');
        audio.type7 = sounds.prep(path, 'type7');
        audio.type8 = sounds.prep(path, 'type8');
        audio.type9 = sounds.prep(path, 'type9');
        audio.type10 = sounds.prep(path, 'type10');
        // Spacebar souds
        audio.space1 = sounds.prep(path, 'space1');
        audio.space2 = sounds.prep(path, 'space2');
    },
    props: () => Object.getOwnPropertyNames(sounds.audio),
    total: () => sounds.props().length,
    prep: (src, index, volume = 1) => {
        const audio = sounds.audio;
        if (audio && audio[index] && audio[index].src && audio[index].src.length > 0)
            return audio[index];

        ga.audioTotal++;
        const sound = new Audio(src.replace('##', index));
        ga.files.push(src.replace('##', index));
        sound.volume = volume;

        sound.addEventListener('canplaythrough', handler() );

        return sound;
    }
}