"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var game;
(function (game) {
    class KeyValue {
        constructor(key, value) {
            this.Key = key;
            this.Value = value;
        }
    }
    game.KeyValue = KeyValue;
    class Pairs {
        constructor(pairs = []) {
            this.List = [];
            pairs.forEach(pair => {
                this.List.push(pair);
            });
        }
        get keys() {
            const keys = [];
            this.List.forEach(item => {
                keys.push(item.Key);
            });
            return keys;
        }
        value(key) {
            return this.List.filter(o => o.Key.euqals(key))[0];
        }
    }
    game.Pairs = Pairs;
})(game || (game = {}));
var game;
(function (game) {
    function disableMenu() {
        $('clicker').attr('disabled', '');
    }
    game.disableMenu = disableMenu;
    function disableControls() {
        $('control').attr('disabled', '');
    }
    game.disableControls = disableControls;
    function disableinputs() {
        disableMenu();
        disableControls();
    }
    game.disableinputs = disableinputs;
    function enableMenu() {
        $('clicker').removeAttr('disabled');
    }
    game.enableMenu = enableMenu;
    function enableControls() {
        $('control').removeAttr('disabled');
    }
    game.enableControls = enableControls;
    function enableinputs() {
        enableMenu();
        enableControls();
    }
    game.enableinputs = enableinputs;
})(game || (game = {}));
var game;
(function (game) {
    var builder;
    (function (builder) {
        function primitive(tag, id, classes, styles, attrs, html, text = '') {
            const idAttr = id && id.hasValue() ? ` id="${id}"` : '';
            const clsClean = classes ? classCheck(classes) : '';
            const classAttr = clsClean.hasValue() ? ` class="${clsClean}"` : '';
            const stlClean = styles ? styleCheck(styles) : '';
            const styleAttr = stlClean.hasValue() ? ` style="${stlClean}"` : '';
            let attrsClean = '';
            if (attrs && attrs.List.length > 0) {
                attrs.List.forEach(pair => {
                    attrsClean += ` ${pair.Key}="${pair.Value}"`;
                });
            }
            const element = $(`<${tag}${idAttr}${classAttr}${styleAttr}${attrsClean}>${text}${(html ? html : '')}</${tag}>`);
            return element;
        }
        builder.primitive = primitive;
        function classCheck(classInput) {
            let classArray = [];
            let classClean = '';
            if (classInput.length > 0) {
                if (Array.isArray(classInput)) {
                    classInput.forEach(cls => {
                        classArray.push(cls.trim());
                    });
                }
                else if ((typeof classInput).euqalsIgnoreCase('string')) {
                    if (classInput.contains(',')) {
                        classInput.split(',').forEach(cls => {
                            classArray.push(cls.trim());
                        });
                    }
                    else
                        classArray.push(classInput.trim());
                }
                classClean = classArray.join(' ');
            }
            return classClean;
        }
        function styleCheck(styleInput) {
            let styleArray = [];
            let styleClean = '';
            if (typeof styleInput !== 'string' && styleInput.List.length > 0) {
                if (Array.isArray(styleInput.List)) {
                    styleInput.List.forEach(stl => {
                        styleArray.push(`${stl.Key.trim()}: ${stl.Value.trim()};`);
                    });
                }
                else if (typeof styleInput === 'string') {
                    styleInput = styleInput;
                    if (styleInput.contains(';')) {
                        styleInput.split(';').forEach(stl => {
                            styleArray.push(`${stl.split(':')[0].trim()}: ${stl.split(':')[1].trim()};`);
                        });
                    }
                    else
                        styleArray.push(`${styleInput.split(':')[0].trim()}: ${styleInput.split(':')[1].trim()};`);
                }
                styleClean = styleArray.join(' ');
            }
            return styleClean;
        }
    })(builder = game.builder || (game.builder = {}));
})(game || (game = {}));
var game;
(function (game) {
    String.prototype.isNullOrEmpty = function () {
        return this === undefined || this.length === 0;
    };
    String.prototype.hasValue = function () {
        return this !== undefined && this.length > 0;
    };
    String.prototype.contains = function (text) {
        return this.indexOf(text) > -1;
    };
    String.prototype.containsIgnoreCase = function (text) {
        return this.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) > -1;
    };
    String.prototype.euqals = function (text) {
        return this === text;
    };
    String.prototype.euqalsIgnoreCase = function euqalsInvariant(text) {
        return this.toLocaleLowerCase() === text.toLocaleLowerCase();
    };
    String.prototype.replaceAll = function replaceAll(text, replace) {
        let current = this;
        let notFinished = true;
        while (notFinished) {
            current = current.replace(text, replace);
            if (!current.includes(text))
                notFinished = false;
        }
        return current;
    };
})(game || (game = {}));
var game;
(function (game) {
    var utils;
    (function (utils) {
        var jsonfile;
        (function (jsonfile) {
            function getData(path) {
                return __awaiter(this, void 0, void 0, function* () {
                    let result = {};
                    yield fetch(path)
                        .then((response) => response.json())
                        .then((data) => {
                        result = data;
                    });
                    return result;
                });
            }
            jsonfile.getData = getData;
        })(jsonfile = utils.jsonfile || (utils.jsonfile = {}));
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
var game;
(function (game) {
    var utils;
    (function (utils) {
        var number;
        (function (number) {
            function getRandomIndex(size, startAt = 0) {
                let rangeIndex = range(size, startAt);
                return shuffle(shuffle(rangeIndex));
            }
            number.getRandomIndex = getRandomIndex;
            function range(size, startAt = 0) {
                return [...Array(size).keys()].map(i => i + startAt);
            }
            function shuffle(array) {
                let currentIndex = array.length;
                let randomIndex;
                while (currentIndex > 0) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
                }
                return array;
            }
        })(number = utils.number || (utils.number = {}));
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
var game;
(function (game) {
    function getVolOffset() {
        var random = (Math.random() * 100) / 5;
        var big = Math.round(random);
        var normal = big / 50;
        var volume = round((normal - 0.2), 2) + game.global.mainVol;
        volume = volume * 100;
        volume = Math.trunc(volume);
        volume = volume / 100;
        return volume > 1 ? 1 : (volume < 0 ? 0 : volume);
    }
    game.getVolOffset = getVolOffset;
    function round(num, decimals) {
        var n = Math.pow(10, decimals);
        return Math.round(Number((n * num).toFixed(decimals))) / n;
    }
    game.round = round;
    function pause(s = 500) {
        return new Promise(function (resolve) {
            setTimeout(resolve, s);
        });
    }
    game.pause = pause;
    function togglePlayerMenuOptions() {
        $('clicker').each((i, clicker) => {
            if ($(clicker).attr('title').indexOf('Menu') === -1)
                $(clicker).toggleClass('hide');
        });
    }
    game.togglePlayerMenuOptions = togglePlayerMenuOptions;
    function getLocalDate() {
        return new Intl.DateTimeFormat(navigator.language, { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    }
    game.getLocalDate = getLocalDate;
})(game || (game = {}));
var game;
(function (game) {
    var audio;
    (function (audio) {
        audio.AudioTotal = 0;
        const SmallTalkPath = './Assets/Templates/BOSS/shittalk.json';
        let SmallTalk;
        let RandomizedIndex = [];
        let CurrentMessage = 0;
        function init() {
            return __awaiter(this, void 0, void 0, function* () {
                audio.sounds.init();
                audio.music.init();
                SmallTalk = (yield game.utils.jsonfile.getData(SmallTalkPath));
                RandomizedIndex = game.utils.number.getRandomIndex(SmallTalk.Lines.length);
                const volumeKnob = $('knob img');
                audio.music.Volume = new game.Knob(volumeKnob, -151, 147);
            });
        }
        audio.init = init;
        function loadSounds() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!game.core.IsWake) {
                    yield game.display.speak(smallTalk(), 500, true);
                    yield game.display.speak(smallTalk(), 500, true);
                    yield game.display.speak('', 500, true);
                }
                yield game.display.speak('Sound files initializing...', 1000, true);
                let unfinished = true;
                while (unfinished) {
                    if (getReady(audio.sounds.Tracks) < audio.sounds.total())
                        yield game.pause(100);
                    else
                        unfinished = false;
                }
                for (let index = 0; index < audio.sounds.total(); index++) {
                    const sound = audio.sounds.Tracks[index].Element;
                    if (Math.random() > 0.8 && !game.core.IsWake)
                        yield game.display.speak(audio.sounds.Paths[index], 0, true);
                }
                yield game.display.speak('Sound files initialized...', 1000, true);
                yield game.display.speak('', 500, true);
            });
        }
        audio.loadSounds = loadSounds;
        function loadMusic() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!game.core.IsWake) {
                    yield game.display.speak(smallTalk(), 500, true);
                    yield game.display.speak('', 500, true);
                }
                $('knob').removeAttr('disabled');
                $('switch').removeAttr('disabled');
                yield game.display.speak('Music files initializing...', 1000, true);
                let unfinished = true;
                while (unfinished) {
                    if (getReady(audio.music.Tracks) < audio.music.total()) {
                        yield game.pause(100);
                    }
                    else
                        unfinished = false;
                }
                for (let index = 0; index < audio.music.total(); index++) {
                    const sound = audio.music.Tracks[index].Element;
                    if (Math.random() > 0.3 && !game.core.IsWake)
                        yield game.display.speak(audio.music.Paths[index], 0, true);
                }
                yield game.display.speak('Music files initialized...', 1000, true);
                yield game.display.speak('', 500, true);
            });
        }
        audio.loadMusic = loadMusic;
        function getReady(tracks) {
            return tracks.filter(o => o.IsLoaded).length;
        }
        audio.getReady = getReady;
        function smallTalk() {
            return SmallTalk.Lines[RandomizedIndex[CurrentMessageIndex()]];
        }
        function CurrentMessageIndex() {
            const cur = CurrentMessage;
            CurrentMessage++;
            return cur;
        }
    })(audio = game.audio || (game.audio = {}));
})(game || (game = {}));
(function (game) {
    class GameAudio {
        constructor(path, volume = 1) {
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
    game.GameAudio = GameAudio;
    function handleAudioPrep(event, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = event.data[0];
            let tracks = [];
            game.audio.music.Tracks.forEach(track => {
                if (track.Element.src.indexOf(name) > -1)
                    track.IsLoaded = true;
                tracks.push(track);
            });
            game.audio.music.Tracks = tracks;
            tracks = [];
            game.audio.sounds.Tracks.forEach(track => {
                if (track.Element.src.indexOf(name) > -1)
                    track.IsLoaded = true;
                tracks.push(track);
            });
            game.audio.sounds.Tracks = tracks;
        });
    }
})(game || (game = {}));
var game;
(function (game) {
    var audio;
    (function (audio_1) {
        var music;
        (function (music) {
            music.Paths = [];
            music.Tracks = [];
            music.IsRandom = false;
            const PlayList = [];
            const RandomList = [];
            let CurrentSong = -1;
            const GameMusicPath = './Assets/Audio/Music';
            const Filenames = [
                'song1',
                'song2',
                'song3',
                'song4',
                'song5'
            ];
            function init() {
                Filenames.forEach(file => {
                    music.Paths.push(`${GameMusicPath}/${file}.mp3`);
                    game.audio.AudioTotal++;
                });
                let listNum = 0;
                music.Paths.forEach(path => {
                    music.Tracks.push(new game.GameAudio(path, 0.1));
                    PlayList.push(listNum);
                    listNum++;
                });
                game.utils.number.getRandomIndex(PlayList.length).forEach(n => {
                    RandomList.push(n);
                });
                CurrentSong = 0;
            }
            music.init = init;
            function total() {
                return music.Tracks.length;
            }
            music.total = total;
            function skip() {
                music.CurrentTrack.pause();
                music.CurrentTrack.currentTime = 0;
                CurrentSong++;
                if (CurrentSong === total()) {
                    CurrentSong = 0;
                }
                playSong();
            }
            music.skip = skip;
            function playSong() {
                const audio = music.Tracks[music.IsRandom ? RandomList[CurrentSong] : PlayList[CurrentSong]];
                music.CurrentTrack = audio.Element;
                music.CurrentTrack.volume = music.Volume.getValue();
                music.CurrentTrack.play();
                $('switch[value="play"]').removeClass('active');
                $('switch[value="play"]').addClass('active');
                const marquee = $('BOSSAmp marquee');
                const timePlayed = $('#track_time');
                const timeTotal = $('#track_total');
                timeTotal.text(getDuration(music.CurrentTrack.duration));
                marquee.text(audio.Name);
                $(music.CurrentTrack).one('ended', () => {
                    music.CurrentTrack.pause();
                    music.CurrentTrack.currentTime = 0;
                    CurrentSong++;
                    if (CurrentSong === total()) {
                        CurrentSong = 0;
                        game.utils.number.getRandomIndex(PlayList.length).forEach((n, i) => {
                            RandomList[i] = n;
                        });
                    }
                    playSong();
                });
                $(music.CurrentTrack).on('timeupdate', function () {
                    timePlayed.text(getDuration(music.CurrentTrack.currentTime));
                });
            }
            music.playSong = playSong;
            function isPlaying() {
                return music.CurrentTrack && music.CurrentTrack.duration > 0 && !music.CurrentTrack.paused;
            }
            music.isPlaying = isPlaying;
            function getDuration(seconds) {
                let sec = Math.trunc(seconds);
                let min = Math.trunc(sec / 60);
                sec = sec - (min * 60);
                return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
            }
        })(music = audio_1.music || (audio_1.music = {}));
    })(audio = game.audio || (game.audio = {}));
})(game || (game = {}));
var game;
(function (game) {
    var audio;
    (function (audio) {
        var sounds;
        (function (sounds) {
            sounds.Paths = [];
            sounds.Tracks = [];
            const GameSoundsPathType = './Assets/Audio/Typing';
            const GameSoundsPathKnob = './Assets/Audio/Knob';
            const GameSoundsPathClick = './Assets/Audio/Clicks';
            const FilenamesType = [
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
            ];
            const FilenamesKnob = [
                'tick'
            ];
            const FilenamesClick = [
                'click-off',
                'click-on',
            ];
            function init() {
                FilenamesType.forEach(file => {
                    sounds.Paths.push(`${GameSoundsPathType}/${file}.mp3`);
                    game.audio.AudioTotal++;
                });
                FilenamesKnob.forEach(file => {
                    sounds.Paths.push(`${GameSoundsPathKnob}/${file}.mp3`);
                    game.audio.AudioTotal++;
                });
                FilenamesClick.forEach(file => {
                    sounds.Paths.push(`${GameSoundsPathClick}/${file}.mp3`);
                    game.audio.AudioTotal++;
                });
                sounds.Paths.forEach(path => {
                    sounds.Tracks.push(new game.GameAudio(path));
                });
            }
            sounds.init = init;
            function get(name) {
                return sounds.Tracks.filter(o => o.Name.contains(name))[0].Element;
            }
            sounds.get = get;
            function total() {
                return sounds.Tracks.length;
            }
            sounds.total = total;
        })(sounds = audio.sounds || (audio.sounds = {}));
    })(audio = game.audio || (game.audio = {}));
})(game || (game = {}));
var game;
(function (game) {
    var changelog;
    (function (changelog) {
        function init() {
            return __awaiter(this, void 0, void 0, function* () {
                const container = $('#footer .changelog');
                const result = yield game.utils.jsonfile.getData('./Assets/Templates/Changelog/changes.json');
                container.html('');
                const updates = result.updates.reverse();
                const latest = updates[0];
                const version = `v ${latest.version_m}.${latest.version_s}.${latest.version_c}`;
                $('#gameversion').text(version);
                game.core.Version = version;
                updates.forEach(update => {
                    if (update.version_m === 0 && update.version_s === 0 && update.version_c === 0)
                        return;
                    const updateEle = game.builder.primitive('update');
                    const versionEle = game.builder.primitive('version', '', '', '', undefined, undefined, `${update.version_m}.${update.version_s}.${update.version_c}`);
                    updateEle.append(versionEle);
                    const batchEle = game.builder.primitive('batch');
                    if (update.changes_m.length > 0) {
                        const sigEle = game.builder.primitive('significance', '', '', '', undefined, undefined, 'Major');
                        batchEle.append(sigEle);
                        const changesEle = game.builder.primitive('changes');
                        update.changes_m.forEach(change => {
                            const impact = change.impact ? ` (<span class="impact">${change.impact}</span>)` : '';
                            const html = `<span class="title">${change.title}</span> - <span class="description">${change.description}</span>${impact}`;
                            const changeEle = game.builder.primitive('change', '', '', '', undefined, html);
                            changesEle.append(changeEle);
                        });
                        batchEle.append(changesEle);
                    }
                    if (update.changes_s.length > 0) {
                        const sigEle = game.builder.primitive('significance', '', '', '', undefined, undefined, 'Minor');
                        batchEle.append(sigEle);
                        const changesEle = game.builder.primitive('changes');
                        update.changes_s.forEach(change => {
                            const impact = change.impact ? ` (<span class="impact">${change.impact}</span>)` : '';
                            const html = `<span class="title">${change.title}</span> - <span class="description">${change.description}</span>${impact}`;
                            const changeEle = game.builder.primitive('change', '', '', '', undefined, html);
                            changesEle.append(changeEle);
                        });
                        batchEle.append(changesEle);
                    }
                    if (update.changes_c.length > 0) {
                        const sigEle = game.builder.primitive('significance', '', '', '', undefined, undefined, 'Misc.');
                        batchEle.append(sigEle);
                        const changesEle = game.builder.primitive('changes');
                        update.changes_c.forEach(change => {
                            const impact = change.impact ? ` (<span class="impact">${change.impact}</span>)` : '';
                            const html = `<span class="title">${change.title}</span> - <span class="description">${change.description}</span>${impact}`;
                            const changeEle = game.builder.primitive('change', '', '', '', undefined, html);
                            changesEle.append(changeEle);
                        });
                        batchEle.append(changesEle);
                    }
                    updateEle.append(batchEle);
                    container.append(updateEle);
                });
            });
        }
        changelog.init = init;
    })(changelog = game.changelog || (game.changelog = {}));
})(game || (game = {}));
var game;
(function (game) {
    var display;
    (function (display) {
        const _MAX_CONTENT_HEIGHT = 300;
        const _TYPING_SPEED = 50;
        let CurrentText = '';
        let Sentences = [];
        let CurrentSentence = 0;
        let PreviousCharacter = '';
        let PlayVariant = -1;
        function clear() {
            game.global.container.story().html('');
        }
        display.clear = clear;
        function addLine(color) {
            const line = display.line.create(color);
            game.global.container.story().append(line);
            lineHeightCheck();
            return line;
        }
        function lineHeightCheck() {
            let height = 0;
            let unfit = true;
            while (unfit) {
                const lines = $(game.global.container.story().find('chatline'));
                if (lines && lines.length > 10) {
                    lines.each((i, l) => {
                        height += Number($(l).height());
                    });
                    if (height >= _MAX_CONTENT_HEIGHT) {
                        lines[0].remove();
                        height = 0;
                    }
                    else
                        unfit = false;
                }
                else
                    unfit = false;
            }
        }
        function preProcessText() {
            Sentences = [];
            let go = true;
            let choppingBoard = CurrentText;
            while (go) {
                if (choppingBoard.length > 250) {
                    let stopIndex = choppingBoard.indexOf('...') + 1;
                    if (stopIndex < 0)
                        stopIndex = choppingBoard.indexOf('.') + 1;
                    let sentence = choppingBoard;
                    if (stopIndex > 0) {
                        sentence = choppingBoard.substring(0, stopIndex);
                        choppingBoard = choppingBoard.replace(sentence, '').trimStart();
                    }
                    Sentences.push(sentence);
                }
                else {
                    Sentences.push(choppingBoard);
                    go = false;
                }
            }
        }
        function speak(text, delay = 1000, add = false, color = game.color.green) {
            return __awaiter(this, void 0, void 0, function* () {
                CurrentText = text;
                PreviousCharacter = '';
                CurrentSentence = 0;
                yield type(false, add, color);
                yield game.pause(delay);
                game.enableControls();
            });
        }
        display.speak = speak;
        function longSpeak(text, color = game.color.transparent, hasContinue = true) {
            return __awaiter(this, void 0, void 0, function* () {
                CurrentText = text;
                PreviousCharacter = '';
                CurrentSentence = 0;
                preProcessText();
                yield continueSpeak(hasContinue, color);
            });
        }
        display.longSpeak = longSpeak;
        function continueSpeak(hasContinue = true, color = game.color.transparent) {
            return __awaiter(this, void 0, void 0, function* () {
                CurrentText = Sentences[CurrentSentence];
                yield type(hasContinue, true, color);
                CurrentSentence++;
                if (Sentences.length > CurrentSentence)
                    return;
                else {
                    CurrentSentence = 0;
                    Sentences = [];
                }
                game.enableControls();
            });
        }
        display.continueSpeak = continueSpeak;
        function type(hasContinue, add = false, color = game.color.transparent) {
            return __awaiter(this, void 0, void 0, function* () {
                game.disableinputs();
                if (!add)
                    clear();
                const line = addLine(color);
                const text = line.text() + CurrentText;
                for (let index = 2; index <= text.length; index++) {
                    var written = text.substring(0, index);
                    var lastChar = written.slice(-1);
                    var delay = _TYPING_SPEED + Math.floor(Math.random() * 50);
                    typeSound(lastChar);
                    line.text(written);
                    PreviousCharacter = written.slice(-1);
                    yield game.pause(delay);
                }
            });
        }
        function typeSound(character) {
            switch (character) {
                case ' ': {
                    PlayVariant = Math.ceil(Math.random() * 2);
                    const sound = game.audio.sounds.get(`space${PlayVariant}`);
                    sound.volume = game.getVolOffset();
                    sound.play();
                    break;
                }
                case '.': {
                    const sound = game.audio.sounds.get(`type1`);
                    sound.volume = game.getVolOffset();
                    sound.play();
                    break;
                }
                default: {
                    if (character !== PreviousCharacter)
                        PlayVariant = Math.ceil(Math.random() * 10);
                    const sound = game.audio.sounds.get(`type${PlayVariant}`);
                    sound.volume = game.getVolOffset();
                    sound.play();
                    break;
                }
            }
        }
    })(display = game.display || (game.display = {}));
})(game || (game = {}));
var game;
(function (game) {
    var display;
    (function (display) {
        var line;
        (function (line) {
            function create(color = game.color.transparent) {
                return game.builder.primitive('chatline', '', '', new game.Pairs([new game.KeyValue('--accent-color', color)]));
            }
            line.create = create;
        })(line = display.line || (display.line = {}));
    })(display = game.display || (game.display = {}));
})(game || (game = {}));
var game;
(function (game) {
    var control;
    (function (control) {
        function clear() {
            game.global.container.controls().html('');
        }
        control.clear = clear;
    })(control = game.control || (game.control = {}));
})(game || (game = {}));
(function (game) {
    class GameControl {
        constructor(text, value = -1, color = game.color.transparent) {
            this.Text = text.trim().length > 0 ? text.trim() : undefined;
            this.Value = value;
            this.Color = color;
        }
        createElement() {
            const hasText = this.Text ? this.Text : '';
            const style = new game.Pairs([new game.KeyValue('--accent-color', this.Color)]);
            if (!hasText)
                style.List.push(new game.KeyValue('cursor', 'default'));
            const valueAttr = new game.KeyValue('value', this.Value.toString());
            return game.builder.primitive('control', '', 'zoom-mini', style, new game.Pairs([valueAttr]), undefined, this.Text);
        }
    }
    game.GameControl = GameControl;
    class GameControls {
        constructor(controls = [], handler) {
            this.Handler = function () {
                return __awaiter(this, void 0, void 0, function* () { });
            };
            for (let index = 0; index < 4; index++) {
                if (controls.length === index)
                    controls.push(new GameControl('', index));
            }
            this.Controls = controls;
            if (handler)
                this.Handler = handler;
        }
        populate() {
            return __awaiter(this, void 0, void 0, function* () {
                this.clear();
                const gameControl = this;
                this.Controls.forEach(function (control) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const controlElement = control.createElement();
                        game.global.container.controls().append(controlElement);
                        $(controlElement).one('click', [control.Value], function (event) {
                            return __awaiter(this, void 0, void 0, function* () {
                                gameControl.handle(event);
                            });
                        });
                        yield game.pause(250);
                    });
                });
            });
        }
        clear() {
            game.control.clear();
        }
        handle(event) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.Handler(event);
            });
        }
    }
    game.GameControls = GameControls;
    class Knob {
        constructor(knob, min, max, val = 0) {
            this.Element = knob;
            this.MinDegrees = min;
            this.MaxDegrees = max;
            this.Value = val;
            const volKnob = this.Element;
            volKnob.on('mouseover mouseout', function (event) {
                event.preventDefault();
                if (event.type === 'mouseover') {
                    volKnob.on('wheel', handleWheel);
                }
                else {
                    volKnob.off('wheel', handleWheel);
                }
            });
        }
        getValue() {
            return this.Value / 100;
        }
        setValue(val) {
            setVolKnob(val * 2);
            const sound = game.audio.sounds.get(`tick`);
            sound.volume = game.audio.music.Volume.getValue() + 0.2;
            sound.play();
            if (game.audio.music.CurrentTrack)
                game.audio.music.CurrentTrack.volume = game.audio.music.Volume.getValue();
        }
    }
    game.Knob = Knob;
    function handleWheel(event) {
        const wheelevent = event;
        const wheel = wheelevent.originalEvent;
        const deltaY = wheel.deltaY;
        const sound = game.audio.sounds.get(`tick`);
        sound.volume = game.audio.music.Volume.getValue() + 0.2;
        if (deltaY > 0) {
            if (game.audio.music.Volume.Value > 0)
                game.audio.music.Volume.setValue((game.audio.music.Volume.Value / 2) - 1);
            sound.play();
        }
        else {
            if (game.audio.music.Volume.Value < 20)
                game.audio.music.Volume.setValue((game.audio.music.Volume.Value / 2) + 1);
            sound.play();
        }
    }
    function setVolKnob(val) {
        const range = game.audio.music.Volume.MaxDegrees - game.audio.music.Volume.MinDegrees;
        game.audio.music.Volume.Value = val;
        const degrees = game.audio.music.Volume.MinDegrees + Math.trunc(range * val / 20);
        game.audio.music.Volume.Element.css('transform', `rotate(${degrees}deg)`);
    }
})(game || (game = {}));
var game;
(function (game) {
    var loop;
    (function (loop) {
        let Encounters;
        let Scenes;
        let Dialogs;
        let Npcs;
        let Controls;
        let Actions;
        let EncounterId = 0;
        let SceneId = 0;
        let DialogIndex = 0;
        let TalkingLeft = '';
        let TalkingRight = '';
        let LastTalk = '';
        let NextFrame;
        let CurrentEncounter;
        let CurrentScene;
        let CurrentDialog;
        function init() {
            return __awaiter(this, void 0, void 0, function* () {
                NextFrame = game.frame.Encounter;
                Encounters = (yield game.utils.jsonfile.getData('./Assets/Templates/Encounter/encounters.json')).Encounters;
                Scenes = (yield game.utils.jsonfile.getData('./Assets/Templates/Encounter/scenes.json')).Scenes;
                Dialogs = (yield game.utils.jsonfile.getData('./Assets/Templates/Encounter/dialogs.json')).Dialogs;
                Npcs = (yield game.utils.jsonfile.getData('./Assets/Templates/Encounter/npcs.json')).Characters;
                Controls = (yield game.utils.jsonfile.getData('./Assets/Templates/Encounter/controls.json')).Controls;
                Actions = (yield game.utils.jsonfile.getData('./Assets/Templates/Encounter/encounters.json')).Actions;
            });
        }
        loop.init = init;
        function create() {
            return __awaiter(this, void 0, void 0, function* () {
                game.global.container.avatarLeft().text('');
                game.global.container.avatarRight().text('');
                game.control.clear();
                yield game.display.speak('Pick a slot, any slot!');
                game.slots.populate();
            });
        }
        loop.create = create;
        function start() {
            return __awaiter(this, void 0, void 0, function* () {
                yield getFrame();
            });
        }
        loop.start = start;
        function resume() {
            return __awaiter(this, void 0, void 0, function* () {
            });
        }
        loop.resume = resume;
        function save() {
            return __awaiter(this, void 0, void 0, function* () {
                alert('saving... ehehe sorta');
            });
        }
        loop.save = save;
        function load() {
            return __awaiter(this, void 0, void 0, function* () {
                alert('loading... ehehe sorta');
            });
        }
        loop.load = load;
        function exit() {
            return __awaiter(this, void 0, void 0, function* () {
                game.control.clear();
                if (!game.global.FinalScene)
                    yield game.display.speak('Why would you do this to me?', 2500);
                game.core._screenState = '';
                game.core._controlState = '';
                game.disableinputs();
                game.display.clear();
                location.reload();
            });
        }
        loop.exit = exit;
        function getFrame() {
            return __awaiter(this, void 0, void 0, function* () {
                switch (NextFrame) {
                    case game.frame.Encounter: {
                        yield getEncounter();
                        break;
                    }
                    case game.frame.Scene: {
                        yield getScene();
                        break;
                    }
                    case game.frame.Dialog: {
                        yield getDialog();
                        break;
                    }
                }
            });
        }
        function getEncounter() {
            return __awaiter(this, void 0, void 0, function* () {
                const encObj = Encounters.filter((o, i, a) => o.Id === EncounterId)[0];
                if (encObj)
                    CurrentEncounter = encObj;
                else
                    alert('shit\'s fucked up YO');
                if (encObj.hasOwnProperty('Scene'))
                    CurrentScene = Scenes.filter((o, i, a) => o.Id === CurrentEncounter.Scene)[0];
                else
                    CurrentScene = undefined;
                if (encObj.hasOwnProperty('Dialog'))
                    CurrentDialog = Dialogs.filter((o, i, a) => o.Id === CurrentEncounter.Dialog)[0];
                else
                    CurrentDialog = undefined;
                LastTalk = '';
                game.global.container.avatarLeft().text('');
                game.global.container.avatarRight().text('');
                if (CurrentScene && CurrentScene.hasOwnProperty('Id') && CurrentScene.Id > -1) {
                    SceneId = CurrentScene.Id;
                    NextFrame = game.frame.Scene;
                }
                else if (CurrentDialog && CurrentDialog.Dialog.length > 0)
                    NextFrame = game.frame.Dialog;
                else {
                    EncounterId++;
                    NextFrame = game.frame.Encounter;
                }
                yield getFrame();
            });
        }
        function getScene() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!CurrentScene)
                    return;
                yield game.display.speak(CurrentScene.Text);
                const ctrls = createControls(CurrentScene.Controls);
                const gamecontrols = new game.GameControls(ctrls, function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const control = $(event.currentTarget);
                        gamecontrols.clear();
                        let data = Controls.filter((o, i, a) => o.Id === Number(control.attr('value')))[0];
                        if (data && data.Effect && data.Effect.hasOwnProperty('Dialog') && typeof data.Effect.Dialog === 'number') {
                            if (CurrentDialog && CurrentDialog.Dialog.length > data.Effect.Dialog) {
                                DialogIndex = data.Effect.Dialog;
                                NextFrame = game.frame.Dialog;
                                yield getFrame();
                            }
                        }
                        else if (data && data.Effect && data.Effect.hasOwnProperty('Encounter') && data.Effect.Encounter) {
                            if (Encounters.filter((o, i, a) => data.Effect && o.Id === data.Effect.Encounter).length > 0) {
                                EncounterId = data.Effect.Encounter;
                                NextFrame = game.frame.Encounter;
                                yield getFrame();
                            }
                        }
                        else {
                            game.control.clear();
                            game.display.clear();
                            yield game.display.speak('Thank you for playing the demo!', 1000);
                            yield game.display.speak('Keep your eyes peeled for future updates.', 1000);
                            game.display.clear();
                            yield exit();
                        }
                    });
                });
                gamecontrols.populate();
            });
        }
        function getDialog() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!CurrentDialog)
                    return;
                const dialog = CurrentDialog.Dialog[DialogIndex];
                const character = Npcs.filter((o, i, a) => o.Id === dialog.Character)[0];
                if (LastTalk === '' || (TalkingLeft === '' && TalkingLeft === ''))
                    setAvatar('left', character);
                else if (LastTalk == '' || (LastTalk == 'left' && TalkingLeft === character.Name))
                    setAvatar('left', character);
                else if ([TalkingLeft, TalkingRight].includes(character.Name)) {
                    if (TalkingLeft === character.Name)
                        setAvatar('left', character);
                    else if (TalkingRight === character.Name)
                        setAvatar('right', character);
                }
                else {
                    if (LastTalk === 'left')
                        setAvatar('right', character);
                    else if (LastTalk === 'right')
                        setAvatar('left', character);
                }
                yield game.display.speak(dialog.Text, 500, true, character.Color);
                const ctrls = createControls(dialog.Controls);
                const gamecontrols = new game.GameControls(ctrls, function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const control = $(event.currentTarget);
                        gamecontrols.clear();
                        let data = Controls.filter((o, i, a) => o.Id === Number(control.attr('value')))[0];
                        if (data && data.Effect && data.Effect.hasOwnProperty('Dialog') && data.Effect.Dialog) {
                            if (CurrentDialog) {
                                if (data.Effect.Dialog === -99) {
                                    DialogIndex++;
                                    NextFrame = game.frame.Dialog;
                                    yield getFrame();
                                }
                                if (CurrentDialog.Dialog.length > data.Effect.Dialog) {
                                    DialogIndex = data.Effect.Dialog;
                                    NextFrame = game.frame.Dialog;
                                    yield getFrame();
                                }
                            }
                        }
                        else if (data && data.Effect && data.Effect.hasOwnProperty('Encounter') && data.Effect.Encounter) {
                            if (Encounters.filter((o, i, a) => data.Effect && o.Id === data.Effect.Encounter).length > 0) {
                                EncounterId = data.Effect.Encounter;
                                NextFrame = game.frame.Encounter;
                                yield getFrame();
                            }
                        }
                        else {
                            game.control.clear();
                            game.display.clear();
                            yield game.display.speak('Thank you for playing the demo!', 1000);
                            yield game.display.speak('Keep your eyes peeled for future updates.', 1000);
                            game.display.clear();
                            yield exit();
                        }
                    });
                });
                gamecontrols.populate();
            });
        }
        function setAvatar(side, character) {
            switch (side) {
                case 'left': {
                    game.global.container.avatarLeft().text(character.Name);
                    game.global.container.avatarLeft().css('color', character.Color);
                    TalkingLeft = character.Name;
                    break;
                }
                case 'right': {
                    game.global.container.avatarRight().text(character.Name);
                    game.global.container.avatarRight().css('color', character.Color);
                    TalkingRight = character.Name;
                    break;
                }
            }
            LastTalk = side;
        }
        function createControls(currentControls) {
            const ctrls = [];
            if (!currentControls)
                return ctrls;
            currentControls.forEach((id, index) => {
                const control = Controls.filter((o, i, a) => o.Id === id)[0];
                ctrls.push(new game.GameControl(control.Text, control.Id, control.Color));
            });
            return ctrls;
        }
    })(loop = game.loop || (game.loop = {}));
})(game || (game = {}));
var game;
(function (game) {
    var player;
    (function (player) {
        let Names;
        let CurrentName = 0;
        let ShuffledIndex = [];
        function getName() {
            return __awaiter(this, void 0, void 0, function* () {
                game.display.clear();
                game.control.clear();
                Names = (yield game.utils.jsonfile.getData('./Assets/Templates/BOSS/names.json')).Names;
                ShuffledIndex = game.utils.number.getRandomIndex(Names.length);
                yield game.display.speak('So I guess you need a name huh...', 500);
                yield nextName();
            });
        }
        player.getName = getName;
        function nextName() {
            return __awaiter(this, void 0, void 0, function* () {
                const currentName = Names[ShuffledIndex[CurrentName]];
                CurrentName++;
                let ask = '';
                switch (Math.ceil(Math.random() * 5)) {
                    case 1:
                        ask = 'Is it... XX?';
                        break;
                    case 2:
                        ask = 'What about "XX"?';
                        break;
                    case 3:
                        ask = 'It\'s gotta be XX, right??';
                        break;
                    case 4:
                        ask = '*Obviously reading random names from a list* XX?';
                        break;
                    case 5:
                        ask = 'I swear I know it... is it XX?';
                        break;
                }
                yield game.display.speak(ask.replace('XX', currentName.Name), 500);
                const ctrls = [];
                ctrls.push(new game.GameControl('Yes', 1, game.color.green));
                ctrls.push(new game.GameControl('No?', 2, game.color.orangered));
                const gamecontrols = new game.GameControls(ctrls, function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const control = $(event.currentTarget);
                        gamecontrols.clear();
                        switch (control.attr('value')) {
                            case '1': {
                                const name = currentName;
                                setPlayerName(name);
                                break;
                            }
                            case '2': {
                                if (CurrentName <= Names.length)
                                    yield nextName();
                                else {
                                    const name = Names[ShuffledIndex[CurrentName]];
                                    setPlayerName(name);
                                }
                                break;
                            }
                        }
                    });
                });
                gamecontrols.populate();
            });
        }
        function setPlayerName(name) {
            return __awaiter(this, void 0, void 0, function* () {
                if (name.hasOwnProperty('Response') && name.Response)
                    yield game.display.speak(name.Response, 1000);
                if (name.hasOwnProperty('Real') && name.Real)
                    player.Name = name.Real;
                else
                    player.Name = name.Name;
                const newState = [];
                game.state.Current.Slots.forEach(slot => {
                    if (slot.Id == game.slots.Id) {
                        slot.LastUpdated = game.getLocalDate();
                        slot.Name = player.Name;
                    }
                    newState.push(slot);
                });
                game.state.updateState(newState);
                yield game.display.speak('Finally we can get into this!', 1000);
                yield game.loop.start();
            });
        }
    })(player = game.player || (game.player = {}));
})(game || (game = {}));
var game;
(function (game) {
    var slots;
    (function (slots) {
        let slotStates = {};
        slots.Id = -1;
        function populate() {
            game.state.init();
            drawSlots();
        }
        slots.populate = populate;
        function drawSlots() {
            return __awaiter(this, void 0, void 0, function* () {
                game.control.clear();
                const stateContainer = game.builder.primitive('state');
                game.global.container.controls().append(stateContainer);
                for (let index = 0; index < 3; index++) {
                    const slot = game.state.Current.Slots[index];
                    const classes = `zoom`;
                    const slotContainer = game.builder.primitive('saveslot', `slotId_${slot.Id}`, classes);
                    const slotHead = game.builder.primitive('div', '', '', '', undefined, `<span>Slot ${slot.Id}</span>`);
                    const slotName = game.builder.primitive('div');
                    const name = game.builder.primitive('span', `slotName_${slot.Id}`, '', undefined, undefined, '', slot.Name);
                    slotName.append(name);
                    const slotLast = game.builder.primitive('div', '', '', '', undefined, '<span>Last Played</span>');
                    const last = game.builder.primitive('span', `slotLast_${slot.Id}`);
                    const lastVal = game.builder.primitive('span', '', '', undefined, undefined, '', slot.LastUpdated);
                    slotLast.append(last);
                    slotLast.append(lastVal);
                    const slotTime = game.builder.primitive('div', '', '', '', undefined, '<span>Time Played</span>');
                    const time = game.builder.primitive('span', `slotTime_${slot.Id}`);
                    const timeVal = game.builder.primitive('span', '', '', undefined, undefined, '', slot.TimePlayed);
                    slotTime.append(time);
                    slotTime.append(timeVal);
                    slotContainer.append(slotHead).append(slotName).append(slotLast).append(slotTime);
                    stateContainer.append(slotContainer);
                    yield game.pause(300);
                }
                $(document).one('click', 'saveslot', function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const selected = $(this);
                        slots.Id = Number(selected.attr('id').split('_')[1]);
                        game.state.saveState();
                        yield game.player.getName();
                    });
                });
            });
        }
        function getTimePlayed(created, updated) {
            const diff = new Date(updated).getTime() - new Date(created).getTime();
            let seconds = diff / (1000);
            let minutes = Math.trunc(seconds / 60);
            seconds = Math.trunc(seconds - (minutes * 60));
            const hours = Math.trunc(minutes / 60);
            minutes = Math.trunc(minutes - (hours * 60));
            return `${hours}h ${minutes}m ${seconds}s`;
        }
    })(slots = game.slots || (game.slots = {}));
})(game || (game = {}));
var game;
(function (game) {
    var post;
    (function (post) {
        function init() {
            return __awaiter(this, void 0, void 0, function* () {
                game.togglePlayerMenuOptions();
                game.display.clear();
                game.control.clear();
                yield game.changelog.init();
                yield Phase_0();
            });
        }
        post.init = init;
        function Phase_0() {
            return __awaiter(this, void 0, void 0, function* () {
                game.audio.init();
                const state = game.storage.local.get('state');
                const slotPopped = state === null || state === void 0 ? void 0 : state.Slots.filter(s => s.Name.hasValue());
                if (slotPopped && slotPopped.length > 0)
                    game.core.CanWake = true;
                yield Phase_0_1();
            });
        }
        function Phase_0_1() {
            return __awaiter(this, void 0, void 0, function* () {
                const ctrls = [];
                ctrls.push(new game.GameControl('Power on', 1, game.color.orangered));
                if (game.core.CanWake)
                    ctrls.push(new game.GameControl('Wake', 2, game.color.orange));
                const gamecontrols = new game.GameControls(ctrls, function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (!event)
                            return;
                        Phase_1(Number(event.data[0]));
                    });
                });
                gamecontrols.populate();
            });
        }
        function Phase_1(choice) {
            return __awaiter(this, void 0, void 0, function* () {
                game.control.clear();
                switch (choice) {
                    case 1:
                        Phase_1_1();
                        break;
                    case 2:
                        Phase_1_2();
                        break;
                }
            });
        }
        function Phase_1_1() {
            return __awaiter(this, void 0, void 0, function* () {
                yield game.pause(1000);
                yield game.display.speak('Time to wake up...', 1000);
                yield game.display.speak('My name is B.O.S.S. and I will be guiding you through your adventure... Like it or not... I am your BOSS...', 1000, true);
                yield Phase_1_1_1();
            });
        }
        function Phase_1_1_1() {
            return __awaiter(this, void 0, void 0, function* () {
                const ctrls = [];
                ctrls.push(new game.GameControl('What is a B.O.S.S.?', 1, game.color.green));
                ctrls.push(new game.GameControl('The f*@k is a B.O.S.S.?', 2, game.color.orangered));
                ctrls.push(new game.GameControl('What, pray tell, is a B.O.S.S. my good sir?', 3, game.color.mediumpurple));
                ctrls.push(new game.GameControl('B.O.S.S.?', 4, game.color.orange));
                const gamecontrols = new game.GameControls(ctrls, function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const control = $(event.currentTarget);
                        gamecontrols.clear();
                        switch (control.attr('value')) {
                            case '1': {
                                yield game.display.speak('All middle sliders for you isn\'t it...', 500, true, game.color.green);
                                game.core.BOSSKarma++;
                                break;
                            }
                            case '2': {
                                yield game.display.speak('You gotta watch your mouth around here or you\'ll get knocked down!', 500, true, game.color.red);
                                game.core.BOSSKarma -= 2;
                                break;
                            }
                            case '3': {
                                yield game.display.speak('Hwhat? Hwhom? Hhow? I like your style, you can stay...', 500, true, game.color.lightblue);
                                game.core.BOSSKarma += 2;
                                break;
                            }
                            case '4': {
                                yield game.display.speak('You being short with me? you think you can do this better don\'t you...', 500, true, game.color.yellow);
                                game.core.BOSSKarma--;
                                break;
                            }
                        }
                        yield game.display.speak('What is a "B.O.S.S." you ask?', 500, true);
                        yield game.display.speak('I am your Black Out Support System...', 500, true);
                        yield game.display.speak('Now... can we start having some fun please?', 2000, true);
                        yield Phase_2();
                    });
                });
                gamecontrols.populate();
            });
        }
        function Phase_1_2() {
            return __awaiter(this, void 0, void 0, function* () {
                game.core.IsWake = true;
                yield game.pause(1000);
                yield game.display.speak('Time to wake up again...', 1000);
                yield Phase_2();
            });
        }
        function Phase_2() {
            return __awaiter(this, void 0, void 0, function* () {
                yield game.display.speak('Starting system...', 2500);
                yield game.display.speak('', 500, true);
                yield Phase_2_1();
            });
        }
        function Phase_2_1() {
            return __awaiter(this, void 0, void 0, function* () {
                yield game.audio.loadSounds();
                yield game.audio.loadMusic();
                if (!game.core.IsWake) {
                    yield game.display.longSpeak('Would you like some "tunes"?', game.color.yellow, false);
                    const ctrls = [];
                    ctrls.push(new game.GameControl('Hell yeah! I want WAR TRUMPETS!', 1, game.color.mediumpurple));
                    ctrls.push(new game.GameControl('Silence is golden', 2, game.color.orangered));
                    const gamecontrols = new game.GameControls(ctrls, function (event) {
                        return __awaiter(this, void 0, void 0, function* () {
                            const control = $(event.currentTarget);
                            gamecontrols.clear();
                            switch (control.attr('value')) {
                                case '1': {
                                    yield game.display.speak('Playing the good stuff...', 1000, false, game.color.mediumpurple);
                                    game.audio.music.Volume.setValue(1);
                                    game.audio.music.playSong();
                                    yield game.pause(1500);
                                    yield game.display.speak('This is my favourite...', 2000, true, game.color.lightblue);
                                    yield game.display.speak('We are going to be good friends you and I...', 2000, true, game.color.green);
                                    game.core.BOSSKarma++;
                                    break;
                                }
                                case '2': {
                                    yield game.display.speak('Why do you hate culture?', 3000, false, game.color.red);
                                    yield game.display.speak('Do you not have a soul?', 2000, true, game.color.orangered);
                                    yield game.display.speak('Let us just get on with it...', 2000, true, game.color.orange);
                                    yield game.display.speak('Fucker...', 1000, false, game.color.yellow);
                                    yield game.display.speak('Continuing...', 1000, false);
                                    game.core.BOSSKarma--;
                                    break;
                                }
                            }
                            yield Phase_3();
                        });
                    });
                    gamecontrols.populate();
                }
                else
                    yield Phase_3();
            });
        }
        function Phase_2_2() {
            return __awaiter(this, void 0, void 0, function* () {
            });
        }
        function Phase_3() {
            return __awaiter(this, void 0, void 0, function* () {
                yield game.display.speak('Unlocking player controls...', 1000);
                game.togglePlayerMenuOptions();
                game.enableinputs();
                yield game.display.speak('Stating the obvious...', 1000, true);
                yield game.pause(1000);
                yield game.display.speak('Welcome player...', 3000);
                if (!game.audio.music.isPlaying()) {
                    game.audio.music.Volume.setValue(1);
                    game.audio.music.playSong();
                }
                game.loop.init();
                game.core.addMenuControls();
            });
        }
    })(post = game.post || (game.post = {}));
})(game || (game = {}));
var game;
(function (game) {
    var core;
    (function (core) {
        core.BOSSKarma = 0;
        core.IsFirstRun = true;
        core.IsWake = false;
        core.CanWake = false;
        core._screenState = '';
        core._controlState = '';
        core.Version = '';
        const screen = $('.story');
        const constrols = $('.controls');
        $(function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield game.post.init();
                addEvents();
            });
        });
        function addEvents() {
            $(document).on('click', '#continue', function () {
                game.control.clear();
                game.display.continueSpeak();
            });
            $(document).on('click', 'clicker[title="Menu"]', function () {
                const menu = $(this);
                toggleMenu(menu);
            });
            $('switch').on('click', function () {
                var _a;
                const switchBtn = $(this);
                const sound = game.audio.sounds.get(`click-on`);
                sound.volume = game.audio.music.Volume.getValue() + 0.2;
                sound.play();
                switch (switchBtn.attr('value')) {
                    case 'play': {
                        switchBtn.removeClass('active');
                        switchBtn.addClass('active');
                        $('switch[value="pause"]').removeClass('active');
                        if (!game.audio.music.isPlaying())
                            game.audio.music.CurrentTrack.play();
                        break;
                    }
                    case 'pause': {
                        switchBtn.removeClass('active');
                        switchBtn.addClass('active');
                        $('switch[value="play"]').removeClass('active');
                        if (game.audio.music.isPlaying())
                            game.audio.music.CurrentTrack.pause();
                        break;
                    }
                    case 'skip': {
                        game.audio.music.skip();
                        break;
                    }
                    case 'shuffle': {
                        switchBtn.toggleClass('active');
                        if ((_a = switchBtn.attr('class')) === null || _a === void 0 ? void 0 : _a.contains('active'))
                            game.audio.music.IsRandom = true;
                        else
                            game.audio.music.IsRandom = false;
                        break;
                    }
                }
            });
        }
        function toggleMenu(menu) {
            const isActive = menu.is("[active]");
            if (isActive) {
                game.enableMenu();
                menu.removeAttr('active');
                screen.html(core._screenState);
                constrols.html(core._controlState);
            }
            else {
                game.disableMenu();
                core._screenState = screen.html();
                core._controlState = constrols.html();
                screen.html('');
                constrols.html('');
                menu.attr('active', 'true');
                addMenuControls(true);
            }
        }
        function addMenuControls(isRunning = false) {
            const ctrls = [];
            const menu = $('clicker[title="Menu"]');
            if (!isRunning || core.IsFirstRun) {
                ctrls.push(new game.GameControl('New Game', 1, game.color.green));
                ctrls.push(new game.GameControl(''));
            }
            else {
                ctrls.push(new game.GameControl('Back', 1, game.color.green));
                ctrls.push(new game.GameControl('Save', 2, game.color.green));
            }
            ctrls.push(new game.GameControl('Load', 3, game.color.lightblue));
            ctrls.push(new game.GameControl('Exit', 4, game.color.orangered));
            const gamecontrols = new game.GameControls(ctrls, function (event) {
                return __awaiter(this, void 0, void 0, function* () {
                    const control = event.data[0];
                    gamecontrols.clear();
                    switch (control) {
                        case 1: {
                            if (!isRunning || core.IsFirstRun)
                                game.loop.create();
                            else {
                                menu.removeAttr('active');
                                screen.html(core._screenState);
                                constrols.html(core._controlState);
                            }
                            break;
                        }
                        case 2: {
                            game.loop.save();
                            break;
                        }
                        case 3: {
                            game.loop.load();
                            break;
                        }
                        case 4: {
                            yield game.loop.exit();
                            break;
                        }
                    }
                });
            });
            gamecontrols.populate();
        }
        core.addMenuControls = addMenuControls;
    })(core = game.core || (game.core = {}));
})(game || (game = {}));
var game;
(function (game) {
    let frame;
    (function (frame) {
        frame["Encounter"] = "Encounter";
        frame["Scene"] = "Scene";
        frame["Dialog"] = "Dialog";
    })(frame = game.frame || (game.frame = {}));
    let color;
    (function (color) {
        color["red"] = "red";
        color["green"] = "green";
        color["blue"] = "blue";
        color["lightblue"] = "lightblue";
        color["yellow"] = "yellow";
        color["orange"] = "orange";
        color["orangered"] = "orangered";
        color["purple"] = "purple";
        color["mediumpurple"] = "mediumpurple";
        color["transparent"] = "transparent";
    })(color = game.color || (game.color = {}));
})(game || (game = {}));
var game;
(function (game) {
    var global;
    (function (global) {
        global.mainVol = 1;
        global.FinalScene = false;
    })(global = game.global || (game.global = {}));
})(game || (game = {}));
(function (game) {
    var global;
    (function (global) {
        var container;
        (function (container) {
            function controls() { return $('.controls'); }
            container.controls = controls;
            function story() { return $('.story'); }
            container.story = story;
            function log() { return $('#footer .changelog'); }
            container.log = log;
            function avatarLeft() { return $('.avatar.left'); }
            container.avatarLeft = avatarLeft;
            function avatarRight() { return $('.avatar.right'); }
            container.avatarRight = avatarRight;
        })(container = global.container || (global.container = {}));
    })(global = game.global || (game.global = {}));
})(game || (game = {}));
var game;
(function (game) {
    var storage;
    (function (storage) {
        var local;
        (function (local) {
            function set(key, value) {
                localStorage.setItem(getKey(key), JSON.stringify(value));
            }
            local.set = set;
            function get(key) {
                const item = localStorage.getItem(getKey(key));
                if (item)
                    return JSON.parse(item);
                return undefined;
            }
            local.get = get;
            function del(key) {
                localStorage.removeItem(getKey(key));
            }
            local.del = del;
            function getKey(key) {
                return `${game.core.Version.replaceAll('.', '_')}-${key}`;
            }
        })(local = storage.local || (storage.local = {}));
    })(storage = game.storage || (game.storage = {}));
})(game || (game = {}));
var game;
(function (game) {
    var state;
    (function (state_1) {
        function init() {
            const state = game.storage.local.get('state');
            state_1.Current = state ? state : new game.GameState();
        }
        state_1.init = init;
        function saveState() {
            var _a;
            const state = state_1.Current ? state_1.Current : game.storage.local.get('state');
            const newState = [];
            for (let index = 1; index <= 3; index++) {
                let slot = (_a = state === null || state === void 0 ? void 0 : state.Slots.filter(s => s.Id == index)[0]) !== null && _a !== void 0 ? _a : new game.SaveSlot(index);
                if (slot.Id == game.slots.Id) {
                    slot.Created = slot.Created.hasValue() ? slot.Created : game.getLocalDate();
                    slot.LastUpdated = game.getLocalDate();
                    slot.Name = game.player.Name;
                    slot.BossKarma = slot.BossKarma === 50 ? slot.BossKarma + game.core.BOSSKarma : slot.BossKarma;
                }
                newState.push(slot);
            }
            state_1.Current = new game.GameState(newState);
            game.storage.local.set('state', state_1.Current);
        }
        state_1.saveState = saveState;
        function updateState(gameSlots) {
            state_1.Current = new game.GameState(gameSlots);
            game.storage.local.set('state', state_1.Current);
        }
        state_1.updateState = updateState;
        function clearState() {
            game.storage.local.del('state');
        }
        state_1.clearState = clearState;
    })(state = game.state || (game.state = {}));
})(game || (game = {}));
(function (game) {
    class GameState {
        constructor(slots = []) {
            this.Slots = [];
            for (let index = 0; index < 3; index++) {
                this.Slots.push(slots[index] ? slots[index] : new SaveSlot(index + 1));
            }
        }
    }
    game.GameState = GameState;
    class SaveSlot {
        constructor(id) {
            this.Name = '';
            this.Created = '';
            this.LastUpdated = '';
            this.BossKarma = 50;
            this.TimePlayed = 'coming soon';
            this.PlayStart = '';
            this.PlayEnd = '';
            this.Id = id;
        }
    }
    game.SaveSlot = SaveSlot;
    class History {
        constructor() {
            this.Drunkness = 100;
            this.Fullness = 0;
            this.Charge = 0;
            this.Frame = [];
        }
    }
    game.History = History;
})(game || (game = {}));
//# sourceMappingURL=game.js.map