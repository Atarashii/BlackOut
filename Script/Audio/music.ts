namespace game.audio.music {
    export const Paths: Array<string> = [];
    export let Tracks: Array<GameAudio> = []

    const GameMusicPath = './Assets/Audio/Music';

    const Filenames: Array<string> = [
        'song1',
        'song2',
        'song3',
        'song4',
        'song5'
    ]

    export function init() {
        Filenames.forEach(file => {
            Paths.push(`${GameMusicPath}/${file}.mp3`);
            game.audio.AudioTotal++;
        });

        Paths.forEach(path => {
            Tracks.push(new GameAudio(path));
        });
    }

    export function total() {
        return Tracks.length;
    }
}
