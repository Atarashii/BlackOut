/// <reference types="jquery" />
/// <reference types="jquery" />
declare namespace game.control {
    function clear(): void;
}
declare namespace game {
    class GameControl {
        Text: string | undefined;
        Value: number;
        Color: color;
        constructor(text: string, value?: number, color?: color);
        createElement(): JQuery<HTMLElement>;
    }
    class GameControls {
        Controls: Array<GameControl>;
        Handler: (event: Event) => Promise<void>;
        constructor(controls: GameControl[] | undefined, handler: (event: Event) => Promise<void>);
        populate(): Promise<void>;
        clear(): void;
        handle(event: Event): Promise<void>;
    }
    class Knob {
        Element: JQuery<HTMLElement>;
        MinDegrees: number;
        MaxDegrees: number;
        Value: number;
        constructor(knob: JQuery<HTMLElement>, min: number, max: number, val?: number);
        getValue(): number;
        setValue(val: number): void;
    }
}
declare namespace game.core {
    let BOSSKarma: number;
    let IsFirstRun: boolean;
    let IsWake: boolean;
    let CanWake: boolean;
    let _screenState: string;
    let _controlState: string;
    let Version: string;
    function init(): Promise<void>;
    function addMenuControls(isRunning?: boolean): void;
}
declare namespace game.loop {
    function init(): Promise<void>;
    function create(): Promise<void>;
    function start(): Promise<void>;
    function resume(): Promise<void>;
    function save(): Promise<void>;
    function load(): Promise<void>;
    function exit(): Promise<void>;
}
declare namespace game.player {
    let Name: string;
    function getName(): Promise<void>;
}
declare namespace game.slots {
    let Id: number;
    function populate(): void;
}
declare namespace game.audio {
    let AudioTotal: number;
    function init(): Promise<void>;
    function loadSounds(): Promise<void>;
    function loadMusic(): Promise<void>;
    function getReady(tracks: Array<GameAudio>): number;
}
declare namespace game {
    class GameAudio {
        Element: HTMLAudioElement;
        Name: string;
        IsLoaded: boolean;
        constructor(path: string, volume?: number);
    }
}
declare namespace game.audio.music {
    const Paths: Array<string>;
    let Tracks: Array<GameAudio>;
    let IsRandom: boolean;
    let CurrentTrack: HTMLAudioElement;
    let Volume: Knob;
    function init(): void;
    function total(): number;
    function skip(): void;
    function playSong(): void;
    function isPlaying(): boolean;
}
declare namespace game.audio.sounds {
    const Paths: Array<string>;
    let Tracks: Array<GameAudio>;
    function init(): void;
    function get(name: string): HTMLAudioElement;
    function total(): number;
}
declare namespace game.display {
    function clear(): void;
    function speak(text: string, delay?: number, add?: boolean, color?: color): Promise<void>;
    function longSpeak(text: string, color?: color, hasContinue?: boolean): Promise<void>;
    function continueSpeak(hasContinue?: boolean, color?: color): Promise<void>;
}
declare namespace game.display.line {
    function create(color?: color): JQuery<HTMLElement>;
}
declare namespace game.post {
    function init(): Promise<void>;
}
declare namespace game.storage.local {
    function set(key: string, value: any): void;
    function get<Type>(key: string): Type | undefined;
    function del(key: string): void;
}
declare namespace game.state {
    let Current: GameState;
    let ActiveSlot: -1;
    function init(): void;
    function saveState(): void;
    function updateState(gameSlots: Array<SaveSlot>): void;
    function clearState(): void;
}
declare namespace game {
    class GameState {
        Slots: Array<SaveSlot>;
        constructor(slots?: Array<SaveSlot>);
    }
    class SaveSlot {
        Id: number;
        Name: string;
        Created: string;
        LastUpdated: string;
        BossKarma: number;
        TimePlayed: string;
        PlayStart: string;
        PlayEnd: string;
        constructor(id: number);
    }
    class History {
        Drunkness: number;
        Fullness: number;
        Charge: number;
        Frame: Array<FrameState>;
    }
    interface FrameState {
        Id: number;
        Type: frame;
    }
}
declare namespace game.startPage {
    let topKey: Cryptid;
    function init(): Promise<void>;
}
declare namespace game.changelog {
    function init(container: JQuery<HTMLElement>): Promise<void>;
}
declare namespace game.crypt {
    let key: CryptoKey;
    function init(): Promise<void>;
    function en(message: string): Promise<Cryptid>;
    function de(data: Cryptid): Promise<string>;
}
declare namespace game {
    function disableMenu(): void;
    function disableControls(): void;
    function disableinputs(): void;
    function enableMenu(): void;
    function enableControls(): void;
    function enableinputs(): void;
}
declare namespace game.builder {
    function primitive(tag: string, id?: string, classes?: Array<string> | string, styles?: Pairs | string, attrs?: Pairs, html?: string, text?: string): JQuery<HTMLElement>;
}
declare namespace game {
}
interface String {
    isNullOrEmpty: () => boolean;
    hasValue: () => boolean;
    contains: (text: string) => boolean;
    containsIgnoreCase: (text: string) => boolean;
    euqals: (text: string) => boolean;
    euqalsIgnoreCase: (text: string) => boolean;
    replaceAll: (text: string, replace: string) => string;
}
declare namespace game.global {
    let mainVol: number;
    let FinalScene: boolean;
}
declare namespace game.global.container {
    function controls(): JQuery<HTMLElement>;
    function story(): JQuery<HTMLElement>;
    function log(): JQuery<HTMLElement>;
    function avatarLeft(): JQuery<HTMLElement>;
    function avatarRight(): JQuery<HTMLElement>;
}
declare namespace game.utils.jsonfile {
    function getData(path: string): Promise<any>;
}
declare namespace game.utils.number {
    function getRandomIndex(size: number, startAt?: number): number[];
}
declare namespace game {
    function getVolOffset(): number;
    function round(num: number, decimals: number): number;
    function pause(s?: number): Promise<unknown>;
    function togglePlayerMenuOptions(): void;
    function getLocalDate(): string;
}
declare namespace game {
    class KeyValue {
        Key: string;
        Value: string;
        constructor(key: string, value: string);
    }
    class Pairs {
        List: Array<KeyValue>;
        constructor(pairs?: Array<KeyValue>);
        get keys(): string[];
        value(key: string): KeyValue;
    }
}
declare namespace game {
    enum frame {
        Encounter = "Encounter",
        Scene = "Scene",
        Dialog = "Dialog"
    }
    enum color {
        red = "red",
        green = "green",
        blue = "blue",
        lightblue = "lightblue",
        yellow = "yellow",
        orange = "orange",
        orangered = "orangered",
        purple = "purple",
        mediumpurple = "mediumpurple",
        transparent = "transparent"
    }
}
declare namespace game {
    interface Cryptid {
        encryptedData: Uint8Array;
        iv: Uint8Array;
    }
}
