import { gameAudio as ga, handleAudioPrep as handler} from "./init.js";

export const music = {
    path: './Assets/Audio/Music/##.mp3',
    audio: {},
    init: () => {
        const audio = music.audio;
        const path = music.path;

        // Songs
        audio.song1 = music.prep(path, 'song1', 0.5);
        audio.song2 = music.prep(path, 'song2', 0.5);
        audio.song3 = music.prep(path, 'song3', 0.5);
        audio.song4 = music.prep(path, 'song4', 0.5);
        audio.song5 = music.prep(path, 'song5', 0.5);
    },
    props: () => Object.getOwnPropertyNames(music.audio),
    total: () => music.props().length,
    prep: (src, index, volume = 1) => {
        const audio = music.audio;
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