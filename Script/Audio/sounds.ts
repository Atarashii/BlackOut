namespace game.audio.sounds {
    export const Paths: Array<string> = [];
    export let Tracks: Array<GameAudio> = []
    
    const GameSoundsPath = './Assets/Audio/Typing';

    const Filenames: Array<string> = [
        'space1',
        'space2',
        'type1',
        'type2',
        'type3',
        'type4',
        'type5',
        'type6',
        'type7',
        'type8',
        'type9',
        'type10'
    ]

    export function init() {
        Filenames.forEach(file => {
            Paths.push(`${GameSoundsPath}/${file}.mp3`);
            game.audio.AudioTotal++;
        });

        Paths.forEach(path => {
            Tracks.push(new GameAudio(path));
        });
    }

    export function get(name: string) {
        return Tracks.filter(o => o.Name.contains(name))[0].Element;
    }

    export function total() {
        return Tracks.length;
    }
}