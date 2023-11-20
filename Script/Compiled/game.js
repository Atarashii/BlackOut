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
    (function (audio) {
        var music;
        (function (music) {
            music.Paths = [];
            music.Tracks = [];
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
                music.Paths.forEach(path => {
                    music.Tracks.push(new game.GameAudio(path));
                });
            }
            music.init = init;
            function total() {
                return music.Tracks.length;
            }
            music.total = total;
        })(music = audio.music || (audio.music = {}));
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
            const GameSoundsPath = './Assets/Audio/Typing';
            const Filenames = [
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
            function init() {
                Filenames.forEach(file => {
                    sounds.Paths.push(`${GameSoundsPath}/${file}.mp3`);
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
                $('#gameversion').text(`v ${latest.version_m}.${latest.version_s}.${latest.version_c}`);
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
                game.slots.Created = new Date();
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
                        if (data && data.Effect && data.Effect.hasOwnProperty('Dialog') && data.Effect.Dialog) {
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
            drawSlots();
        }
        slots.populate = populate;
        function drawSlots() {
            return __awaiter(this, void 0, void 0, function* () {
                game.control.clear();
                const stateContainer = game.builder.primitive('state');
                game.global.container.controls().append(stateContainer);
                for (let index = 0; index < 3; index++) {
                    const classes = `zoom`;
                    const slotContainer = game.builder.primitive('saveslot', `slotId_${index + 1}`, classes);
                    const slotHead = game.builder.primitive('div', '', '', '', undefined, `<span>Slot ${index + 1}</span>`);
                    const slotName = game.builder.primitive('div');
                    const name = game.builder.primitive('span', `slotName_${index}`);
                    slotName.append(name);
                    const slotLast = game.builder.primitive('div', '', '', '', undefined, '<span>Last Played</span>');
                    const last = game.builder.primitive('span', `slotLast_${index}`);
                    slotLast.append(last);
                    const slotTime = game.builder.primitive('div', '', '', '', undefined, '<span>Time Played</span>');
                    const time = game.builder.primitive('span', `slotTime_${index}`);
                    slotTime.append(time);
                    slotContainer.append(slotHead).append(slotName).append(slotLast).append(slotTime);
                    stateContainer.append(slotContainer);
                    yield game.pause(300);
                }
                $(document).on('click', 'saveslot', function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const selected = $(this);
                        slots.Id = Number(selected.attr('id').split('_')[1]);
                        yield game.player.getName();
                    });
                });
            });
        }
    })(slots = game.slots || (game.slots = {}));
})(game || (game = {}));
var game;
(function (game) {
    var core;
    (function (core) {
        core.BOSSKarma = 50;
        core.IsFirstRun = true;
        core.IsWake = false;
        $(document).ready(function () {
            game.changelog.init();
            POST_Phase_0();
        });
        function POST_Phase_0() {
            return __awaiter(this, void 0, void 0, function* () {
                game.togglePlayerMenuOptions();
                game.display.clear();
                game.control.clear();
                AddEvents();
                game.audio.init();
                yield POST_Phase_1();
            });
        }
        function POST_Phase_1() {
            return __awaiter(this, void 0, void 0, function* () {
                const ctrls = [];
                ctrls.push(new game.GameControl('Power on', 1, game.color.orangered));
                ctrls.push(new game.GameControl('Wake', 2, game.color.orange));
                const gamecontrols = new game.GameControls(ctrls, function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (!event)
                            return;
                        const data = Number(event.data[0]);
                        gamecontrols.clear();
                        switch (data) {
                            case 1: {
                                yield game.pause(1000);
                                yield game.display.speak('Time to wake up...', 1000);
                                yield game.display.speak('My name is B.O.S.S. and I will be guiding you through your adventure... Like it or not... I am your BOSS...', 1000, true);
                                yield POST_Phase_1_1();
                                break;
                            }
                            case 2: {
                                core.IsWake = true;
                                yield game.pause(1000);
                                yield game.display.speak('Time to wake up again...', 1000);
                                yield POST_Phase_2();
                                break;
                            }
                        }
                    });
                });
                gamecontrols.populate();
            });
        }
        function POST_Phase_1_1() {
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
                                core.BOSSKarma++;
                                break;
                            }
                            case '2': {
                                yield game.display.speak('You gotta watch your mouth around here or you\'ll get knocked down!', 500, true, game.color.red);
                                core.BOSSKarma -= 2;
                                break;
                            }
                            case '3': {
                                yield game.display.speak('Hwhat? Hwhom? Hhow? I like your style, you can stay...', 500, true, game.color.lightblue);
                                core.BOSSKarma += 2;
                                break;
                            }
                            case '4': {
                                yield game.display.speak('You being short with me? you think you can do this better don\'t you...', 500, true, game.color.yellow);
                                core.BOSSKarma--;
                                break;
                            }
                        }
                        yield game.display.speak('What is a "B.O.S.S." you ask?', 500, true);
                        yield game.display.speak('I am your Black Out Support System...', 500, true);
                        yield game.display.speak('Now... can we start having some fun please?', 2000, true);
                        yield POST_Phase_2();
                    });
                });
                gamecontrols.populate();
            });
        }
        function POST_Phase_2() {
            return __awaiter(this, void 0, void 0, function* () {
                yield game.display.speak('Starting system...', 2500);
                yield game.display.speak('', 500, true);
                yield game.audio.loadSounds();
                yield game.audio.loadMusic();
                if (!core.IsWake) {
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
                                    yield game.display.speak('Playing the good stuff...', 3000, false, game.color.mediumpurple);
                                    yield game.display.speak('This is my favourite...', 2000, true, game.color.lightblue);
                                    yield game.display.speak('We are going to be good friends you and I...', 2000, true, game.color.green);
                                    core.BOSSKarma++;
                                    break;
                                }
                                case '2': {
                                    yield game.display.speak('Why do you hate culture?', 3000, false, game.color.red);
                                    yield game.display.speak('Do you not have a soul?', 2000, true, game.color.orangered);
                                    yield game.display.speak('Let us just get on with it...', 2000, true, game.color.orange);
                                    yield game.display.speak('Fucker...', 1000, false, game.color.yellow);
                                    yield game.display.speak('Continuing...', 1000, false);
                                    core.BOSSKarma--;
                                    break;
                                }
                            }
                            yield POST_Phase_3();
                        });
                    });
                    gamecontrols.populate();
                }
                else
                    yield POST_Phase_3();
            });
        }
        function POST_Phase_3() {
            return __awaiter(this, void 0, void 0, function* () {
                yield game.display.speak('Unlocking player controls...', 1000);
                game.togglePlayerMenuOptions();
                game.enableinputs();
                yield game.display.speak('Stating the obvious...', 1000, true);
                yield game.pause(1000);
                yield game.display.speak('Welcome player...', 3000);
                game.loop.init();
                addMenuControls();
            });
        }
        const screen = $('.story');
        const constrols = $('.controls');
        core._screenState = '';
        core._controlState = '';
        function AddEvents() {
            $(document).on('click', '#continue', function () {
                game.control.clear();
                game.display.continueSpeak();
            });
            $(document).on('click', 'clicker[title="Menu"]', function () {
                const menu = $(this);
                toggleMenu(menu);
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
                    const control = $(event.currentTarget);
                    gamecontrols.clear();
                    switch (control.attr('value')) {
                        case '1': {
                            if (!isRunning || core.IsFirstRun)
                                game.loop.create();
                            else {
                                menu.removeAttr('active');
                                screen.html(core._screenState);
                                constrols.html(core._controlState);
                            }
                            break;
                        }
                        case '2': {
                            game.loop.save();
                            break;
                        }
                        case '3': {
                            game.loop.load();
                            break;
                        }
                        case '4': {
                            yield game.loop.exit();
                            break;
                        }
                    }
                });
            });
            gamecontrols.populate();
        }
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
//# sourceMappingURL=game.js.map