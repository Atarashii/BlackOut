namespace game.audio.music {
    export const Paths: Array<string> = [];
    export let Tracks: Array<GameAudio> = [];
    export let IsRandom: boolean = false;
    export let CurrentTrack: HTMLAudioElement;

    export let Volume: Knob;

    const PlayList: Array<number> = [];
    const RandomList: Array<number> = [];
    let CurrentSong: number = -1;



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

        let listNum = 0;
        Paths.forEach(path => {
            Tracks.push(new GameAudio(path, 0.1));
            PlayList.push(listNum);
            listNum++;
        });
        utils.number.getRandomIndex(PlayList.length).forEach(n => {
            RandomList.push(n);
        });

        CurrentSong = 0;
    }

    export function total() {
        return Tracks.length;
    }

    export function skip() {
        CurrentTrack.pause();
        CurrentTrack.currentTime = 0;
        CurrentSong++;
        if (CurrentSong === total()) {
            // loop
            CurrentSong = 0;
        }

        playSong();
    }

    export function playSong() {
        const audio = Tracks[IsRandom ? RandomList[CurrentSong] : PlayList[CurrentSong]]
        CurrentTrack = audio.Element;
        CurrentTrack.volume = Volume.getValue();

        CurrentTrack.play();
        
        $('switch[value="play"]').removeClass('active');
        $('switch[value="play"]').addClass('active');

        const marquee = $('BOSSAmp marquee');
        const timePlayed = $('#track_time');
        const timeTotal = $('#track_total');

        timeTotal.text(getDuration(CurrentTrack.duration));
        marquee.text(audio.Name);

        $(CurrentTrack).one('ended', () => {
            CurrentTrack.pause();
            CurrentTrack.currentTime = 0;
            
            CurrentSong++;
            if (CurrentSong === total()) {
                // loop and reshuffle  
                CurrentSong = 0;

                utils.number.getRandomIndex(PlayList.length).forEach((n, i) => {
                    RandomList[i] = n;
                });
            }
            
            playSong();
        });

        $(CurrentTrack).on('timeupdate', function () {
            timePlayed.text(getDuration(CurrentTrack.currentTime));
        });
    }

    export function isPlaying() {
        return CurrentTrack && CurrentTrack.duration > 0 && !CurrentTrack.paused;
    }

    function getDuration(seconds: number) {
        let sec = Math.trunc(seconds);
        let min = Math.trunc(sec / 60);
        sec = sec - (min * 60);

        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }
}
