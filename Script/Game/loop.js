import { clear as cls, speak } from "../Display/core.js";
import { get } from "../Utils/jsonFile.js";
import { clearControls as clc, populateControls } from "../controls.js";
import { color as colorEnum, frames } from "../enums.js";

const encounters = (await get('./Assets/Templates/Encounter/encounters.json')).Encounters;
const scenes = (await get('./Assets/Templates/Encounter/scenes.json')).Scenes;
const dialogs = (await get('./Assets/Templates/Encounter/dialogs.json')).Dialogs;
const npcs = (await get('./Assets/Templates/Encounter/npcs.json')).Characters;
const controls = (await get('./Assets/Templates/Encounter/controls.json')).Controls;
const actions = (await get('./Assets/Templates/Encounter/encounters.json')).Actions;

let EncounterId = 0;
let SceneId = 0;
let DialogIndex = 0;

let TalkingLeft = '';
let TalkingRight = '';
let LastTalk = '';

let NextFrame = frames.Encounter;

const AvatarLeft = $('.avatar.left');
const AvatarRight = $('.avatar.right');

export const game = {
    CurrentEncounter: {},
    CurrentScene: {},
    CurrentDialog: {},
    create: async function () {
        AvatarLeft.text('');
        AvatarRight.text('');
        await getFrame();
    },
    continue: function () {

    },
    save: function () {
        alert('saving... ehehe sorta');
    },
    load: function () {
        alert('loading... ehehe sorta');
    },
    exit: async function (end = false) {
        clc();
        if (!end)
            await speak('Why would you do this to me?', 2500);

        _screenState = '';
        _controlState = '';
        disableinputs();
        cls();
        clc();
        location.reload();
    }
}

async function getFrame() {
    switch (NextFrame) {
        case frames.Encounter: {
            await getEncounter();
            break;
        }
        case frames.Scene: {
            await getScene();
            break;
        }
        case frames.Dialog: {
            await getDialog();
            break;
        }
    }
}

async function getEncounter() {
    const encObj = encounters.filter((o, i, a) => o.Id === EncounterId)[0];
    if (encObj)
        game.CurrentEncounter = encObj;
    else 
        alert('shit\'s fucked up YO');

    if (encObj.hasOwnProperty('Scene'))
        game.CurrentScene = scenes.filter((o, i, a) => o.Id === game.CurrentEncounter.Scene)[0];
    else
        game.CurrentScene = {};

    if (encObj.hasOwnProperty('Dialog'))
        game.CurrentDialog = dialogs.filter((o, i, a) => o.Id === game.CurrentEncounter.Dialog)[0];
    else
        game.CurrentDialog = {};

    LastTalk = '';
    AvatarLeft.text('');
    AvatarRight.text('');

    if (game.CurrentScene.hasOwnProperty('Id') && game.CurrentScene.Id > -1) {
        SceneId = game.CurrentScene.Id;
        NextFrame = frames.Scene;
    } else if (game.CurrentDialog.length > 0)
        NextFrame = frames.Dialog;
    else {
        EncounterId++;
        NextFrame = frames.Encounter;
    }
    

    await getFrame()
}

async function getScene() {
    clc();
    await speak(game.CurrentScene.Text);
    populateControls(await createOptions(game.CurrentScene.Controls));
}

async function getDialog() {
    clc();
    const dialog = game.CurrentDialog.Dialog[DialogIndex];
    const character = npcs.filter((o, i, a) => o.Id === dialog.Character)[0];

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

    await speak(dialog.Text, 500, true, colorEnum[character.Color]);
    populateControls(await createOptions(dialog.Controls));
}

function setAvatar(side, character) {
    switch (side) {
        case 'left': {
            AvatarLeft.text(character.Name);
            AvatarLeft.css('color', colorEnum[character.Color]);
            TalkingLeft = character.Name;
            break;
        }
        case 'right': {
            AvatarRight.text(character.Name);
            AvatarRight.css('color', colorEnum[character.Color]);
            TalkingRight = character.Name;
            break;
        }
    }

    LastTalk = side;
}

async function createOptions(currentControls) {
    const options = [];
    currentControls.forEach(id => {
        const control = controls.filter((o, i, a) => o.Id === id)[0];
        const option = {
            text: control.Text,
            id: control.TriggerId,
            color: colorEnum[control.Color],
            handler: async function () {
                if (control && control.Effect && control.Effect.hasOwnProperty('Dialog')) {
                    if (game.CurrentDialog.Dialog.length > control.Effect.Dialog) {
                        DialogIndex = control.Effect.Dialog;
                        NextFrame = frames.Dialog;
                        await getFrame();
                    }
                } else if (control.Effect.hasOwnProperty('Encounter')) {
                    if (encounters.filter((o, i, a) => o.Id === control.Effect.Encounter).length > 0) {
                        EncounterId = control.Effect.Encounter;
                        NextFrame = frames.Encounter;
                        await getFrame();
                    }
                } else {
                    clc();
                    cls();
                    speak('Thank you for playing the demo!', 1000);
                    speak('Keep your eyes peeled for future updates.', 1000);
                    cls();
                    await game.exit();
                }
            }
        }
        options.push(option);
    });

    return options;
}