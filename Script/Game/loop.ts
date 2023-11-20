namespace game.loop {
    let Encounters: Array<Encounter>;
    let Scenes: Array<Scene>;
    let Dialogs: Array<Dialog>;
    let Npcs: Array<NPC>;
    let Controls: Array<Interaction>;
    let Actions: Array<Action>;

    let EncounterId = 0;
    let SceneId = 0;
    let DialogIndex = 0;

    let TalkingLeft = '';
    let TalkingRight = '';
    let LastTalk = '';

    let NextFrame: frame;

    let CurrentEncounter: Encounter;
    let CurrentScene: Scene | undefined;
    let CurrentDialog: Dialog | undefined;

    export async function init() {
        NextFrame = frame.Encounter;
        Encounters = (await utils.jsonfile.getData('./Assets/Templates/Encounter/encounters.json')).Encounters as Array<Encounter>;
        Scenes = (await utils.jsonfile.getData('./Assets/Templates/Encounter/scenes.json')).Scenes as Array<Scene>;
        Dialogs = (await utils.jsonfile.getData('./Assets/Templates/Encounter/dialogs.json')).Dialogs as Array<Dialog>;
        Npcs = (await utils.jsonfile.getData('./Assets/Templates/Encounter/npcs.json')).Characters as Array<NPC>;
        Controls = (await utils.jsonfile.getData('./Assets/Templates/Encounter/controls.json')).Controls as Array<Interaction>;
        Actions = (await utils.jsonfile.getData('./Assets/Templates/Encounter/encounters.json')).Actions as Array<Action>;
    }

    export async function create() {
        global.container.avatarLeft().text('');
        global.container.avatarRight().text('');

        control.clear();
        await display.speak('Pick a slot, any slot!');

        // Get slot ready
        slots.Created = new Date();
        slots.populate();
    }

    export async function start() {
        await getFrame();
    }

    export async function resume() {
    }

    export async function save() {
        alert('saving... ehehe sorta');
    }

    export async function load() {
        alert('loading... ehehe sorta');
    }

    export async function exit() {
        control.clear();
        if (!global.FinalScene)
            await display.speak('Why would you do this to me?', 2500);

        core._screenState = '';
        core._controlState = '';
        disableinputs();
        display.clear();
        location.reload();
    }

    async function getFrame() {
        switch (NextFrame) {
            case frame.Encounter: {
                await getEncounter();
                break;
            }
            case frame.Scene: {
                await getScene();
                break;
            }
            case frame.Dialog: {
                await getDialog();
                break;
            }
        }
    }

    async function getEncounter() {
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
        global.container.avatarLeft().text('');
        global.container.avatarRight().text('');

        if (CurrentScene && CurrentScene.hasOwnProperty('Id') && CurrentScene.Id > -1) {
            SceneId = CurrentScene.Id;
            NextFrame = frame.Scene;
        } else if (CurrentDialog && CurrentDialog.Dialog.length > 0)
            NextFrame = frame.Dialog;
        else {
            EncounterId++;
            NextFrame = frame.Encounter;
        }

        await getFrame()
    }

    async function getScene() {
        if (!CurrentScene)
            return;

        await display.speak(CurrentScene.Text);

        const ctrls = createControls(CurrentScene.Controls);
        const gamecontrols = new GameControls(ctrls, async function (event: Event) {
            const control = $((event.currentTarget as any));
            gamecontrols.clear();

            let data: Interaction = Controls.filter((o, i, a) => o.Id === Number(control.attr('value')))[0];

            if (data && data.Effect && data.Effect.hasOwnProperty('Dialog') && data.Effect.Dialog) {
                if (CurrentDialog && CurrentDialog.Dialog.length > data.Effect.Dialog) {
                    DialogIndex = data.Effect.Dialog!;
                    NextFrame = frame.Dialog;

                    await getFrame();
                }
            } else if (data && data.Effect && data.Effect.hasOwnProperty('Encounter') && data.Effect.Encounter) {
                if (Encounters.filter((o, i, a) => data.Effect && o.Id === data.Effect.Encounter).length > 0) {
                    EncounterId = data.Effect.Encounter;
                    NextFrame = frame.Encounter;

                    await getFrame();
                }
            } else {
                game.control.clear();
                display.clear();
                await display.speak('Thank you for playing the demo!', 1000);
                await display.speak('Keep your eyes peeled for future updates.', 1000);
                display.clear();
                await exit();
            }
        });

        gamecontrols.populate();
    }

    async function getDialog() {
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
        } else {
            if (LastTalk === 'left')
                setAvatar('right', character);
            else if (LastTalk === 'right')
                setAvatar('left', character);
        }

        await display.speak(dialog.Text, 500, true, character.Color);

        const ctrls = createControls(dialog.Controls);
        const gamecontrols = new GameControls(ctrls, async function (event: Event) {
            const control = $((event.currentTarget as any));
            gamecontrols.clear();

            let data: Interaction = Controls.filter((o, i, a) => o.Id === Number(control.attr('value')))[0];

            if (data && data.Effect && data.Effect.hasOwnProperty('Dialog') && data.Effect.Dialog) {
                if (CurrentDialog && CurrentDialog.Dialog.length > data.Effect.Dialog) {
                    DialogIndex = data.Effect.Dialog!;
                    NextFrame = frame.Dialog;

                    await getFrame();
                }
            } else if (data && data.Effect && data.Effect.hasOwnProperty('Encounter') && data.Effect.Encounter) {
                if (Encounters.filter((o, i, a) => data.Effect && o.Id === data.Effect.Encounter).length > 0) {
                    EncounterId = data.Effect.Encounter;
                    NextFrame = frame.Encounter;

                    await getFrame();
                }
            } else {
                game.control.clear();
                display.clear();
                await display.speak('Thank you for playing the demo!', 1000);
                await display.speak('Keep your eyes peeled for future updates.', 1000);
                display.clear();
                await exit();
            }
        });

        gamecontrols.populate();
    }

    function setAvatar(side: string, character: NPC) {
        switch (side) {
            case 'left': {
                global.container.avatarLeft().text(character.Name);
                global.container.avatarLeft().css('color', character.Color);
                TalkingLeft = character.Name;
                break;
            }
            case 'right': {
                global.container.avatarRight().text(character.Name);
                global.container.avatarRight().css('color', character.Color);
                TalkingRight = character.Name;
                break;
            }
        }

        LastTalk = side;
    }

    function createControls(currentControls: Array<number> | undefined) {
        const ctrls: Array<GameControl> = [];
        if (!currentControls)
            return ctrls;

        currentControls.forEach((id, index) => {
            const control = Controls.filter((o, i, a) => o.Id === id)[0];
            ctrls.push(new GameControl(control.Text, control.Id, control.Color));
        });

        return ctrls;
    }

    interface Encounter {
        Id: number;
        Scene: number;
        Dialog: number | undefined;
    }

    interface Scene {
        Id: number;
        Text: string;
        Actions: Array<number> | undefined;
        Controls: Array<number> | undefined;
    }

    interface Dialog {
        Id: number;
        Dialog: Array<Monolog>;
    }

    interface Monolog {
        Character: number;
        Text: string;
        Actions: Array<number> | undefined;
        Controls: Array<number> | undefined;
    }

    interface NPC {
        Id: number;
        Avatar: string;
        Name: string;
        Color: color;
    }

    interface Interaction {
        Id: number;
        Text: string;
        TriggerId: string;
        Color: color;
        Effect: Effect | undefined;
    }

    interface Effect {
        Dialog: number | undefined;
        Encounter: number | undefined;
    }

    interface Action {
        Id: number;
        Cursor: string;
    }
}
