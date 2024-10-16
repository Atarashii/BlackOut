namespace game.audio.sounds {
    export const Paths: Array<string> = [];
    export let Tracks: Array<GameAudio> = []
    
    const GameSoundsPathType = './Assets/Audio/Typing';
    const GameSoundsPathKnob = './Assets/Audio/Knob';
    const GameSoundsPathClick = './Assets/Audio/Clicks';

    const FilenamesType: Array<string> = [
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

    const FilenamesKnob: Array<string> = [
        'tick'
    ]

    const FilenamesClick: Array<string> = [
        'click-off',
        'click-on',
    ]

    export function init() {
        FilenamesType.forEach(file => {
            Paths.push(`${GameSoundsPathType}/${file}.mp3`);
            game.audio.AudioTotal++;
        });

        FilenamesKnob.forEach(file => {
            Paths.push(`${GameSoundsPathKnob}/${file}.mp3`);
            game.audio.AudioTotal++;
        });

        FilenamesClick.forEach(file => {
            Paths.push(`${GameSoundsPathClick}/${file}.mp3`);
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