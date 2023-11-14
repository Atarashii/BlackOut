import { addControl, clearControls as clc, populateControls } from "./controls.js";
import { pause, togglePlayerMenuOptions } from "./utils.js";
import { color as colorEnum } from "./enums.js";
import { gameAudio as ga } from "./Audio/init.js";
import { disableMenu, enableMenu, enableinputs, disableinputs } from "./Utils/effects.js";
import { clear as cls, continueSpeak, longSpeak, speak } from "./Display/core.js";
import { changelog as log } from "./Changelog/core.js";
import { game } from "./Game/loop.js";

$(document).ready(function () {
    log.init();
    POST_Phase_0();
});

window.BOSSKarma = 50;
let isFirstRun = false;

async function POST_Phase_0() {
    togglePlayerMenuOptions();
    cls();
    clc();

    AddEvents();

    ga.init();
    await POST_Phase_1();
}

async function POST_Phase_1() {
    populateControls([
        {
            text: 'Power on',
            id: 'POST',
            color: colorEnum.red,
            handler: async function () {
                clc();
                await pause(1000);
                await speak('Time to wake up...', 1000);
                await speak('My name is B.O.S.S. and I will be guiding you through your adventure... Like it or not... I am your BOSS...', 1000, true);

                await POST_Phase_1_1();
            }
        },
        {
            text: 'Wake',
            id: 'WAKE',
            color: colorEnum.orange,
            handler: async function () {
                clc();
                await pause(1000);
                await speak('Time to wake up again...', 1000);

                await POST_Phase_2(true);
            }
        }
    ])
}

async function powerOnOrWake(power) {
    clc();
    await pause(1000);
    await speak('Time to wake up...', 1000);
    await speak('My name is B.O.S.S. and I will be guiding you through your adventure... Like it or not... I am your BOSS...', 1000, true);
    if (power)
        await POST_Phase_1_1();
    else
        await POST_Phase_2();
}

async function POST_Phase_1_1() {
    populateControls([
        {
            text: 'What is a B.O.S.S.?',
            id: 'whut_1',
            color: colorEnum.green
        },
        {
            text: 'the f*@k is a B.O.S.S.?',
            id: 'whut_2',
            color: colorEnum.red
        },
        {
            text: 'What, pray tell, is a B.O.S.S. my good sir?',
            id: 'whut_3',
            color: colorEnum.lightblue
        },
        {
            text: 'B.O.S.S.?',
            id: 'whut_4',
            color: colorEnum.yellow
        }
    ]);

    $(document).on('click', '[id^="whut"]', async function () {
        clc();
        const answer = $(this);
        const id = Number(answer.attr('id').split('_')[1]);

        switch (id) {
            case 1: {
                await speak('All middle sliders for you isn\'t it...', 500, true, colorEnum.green);
                BOSSKarma++;
                break;
            }
            case 2: {
                await speak('You gotta watch your mouth around here or you\'ll get knocked down!', 500, true, colorEnum.red);
                BOSSKarma -= 2;
                break;
            }
            case 3: {
                await speak('Hwhat? Hwhom? Hhow? I like your style, you can stay...', 500, true, colorEnum.lightblue);
                BOSSKarma += 2;
                break;
            }
            case 4: {
                await speak('You being short with me? you think you can do this better don\'t you...', 500, true, colorEnum.yellow);
                BOSSKarma--;
                break;
            }
        }

        await speak('What is a "B.O.S.S." you ask?', 500, true);
        await speak('I am your Black Out Support System...', 500, true);
        await speak('Now... can we start having some fun please?', 2000, true);
        await POST_Phase_2();
    });
}

async function POST_Phase_2(isWake) {
    await speak('Starting system...', 2500);
    await speak('', 500, true);
    await ga.loadSounds(isWake);
    await ga.loadMusic(isWake);

    if (!isWake) {
        await longSpeak('Would you like some "tunes"?', 'yellow', false);

        populateControls([
            {
                text: 'Yes',
                id: 'playMusic_yes',
                color: colorEnum.mediumpurple
            },
            {
                text: 'No',
                id: 'playMusic_no',
                color: colorEnum.red
            },
        ])

        $(document).on('click', '[id^="playMusic"]', async function () {
            clc();
            const isHappy = $(this).attr('id').indexOf('_yes') > -1;
            if (isHappy) {
                await speak('Playing the good stuff...', 3000, false, colorEnum.mediumpurple);
                await speak('This is my favourite...', 2000, true, colorEnum.lightblue);
                await speak('We are going to be good friends you and I...', 2000, true, colorEnum.green);
            } else {
                await speak('Why do you hate culture?', 3000, false, colorEnum.red);
                await speak('Do you not have a soul?', 2000, true, colorEnum.orangered);
                await speak('Let us just get on with it...', 2000, true, colorEnum.orange);
                await speak('Fucker...', 1000, false, colorEnum.yellow);
                await speak('Continuing...', 1000, false);
            }

            await POST_Phase_3();
        });
    }
    else {
        await POST_Phase_3();
    }
}

async function POST_Phase_3() {
    await speak('Unlocking player controls...', 1000);
    togglePlayerMenuOptions();
    enableinputs();
    await speak('Stating the obvious...', 3000, true);

    await pause(1000);
    await speak('Welcome player...', 3000);
    addMenuControls(true);
}

const screen = $('.story');
const constrols = $('.controls');
let _screenState = '';
let _controlState = '';

function AddEvents() {

    $(document).on('click', '#continue', function () {
        clc();
        continueSpeak();
    });

    $(document).on('click', 'clicker[title="Menu"]', function () {
        const menu = $(this);
        toggleMenu(menu);
    });


}

function toggleMenu(menu) {
    const isActive = menu.is("[active]");

    if (isActive) {
        enableMenu();
        // Close the menu
        menu.removeAttr('active')
        // Resume the state
        screen.html(_screenState);
        constrols.html(_controlState);
    }
    else {
        // open the menu
        disableMenu();
        _screenState = screen.html();
        _controlState = constrols.html();
        screen.html('');
        constrols.html('');

        menu.attr('active', 'true');
        addMenuControls();
    }
}

function addMenuControls(isNewStartup) {
    const menu = $('clicker[title="Menu"]');
    const controls = [];
    if (isNewStartup) {
        controls.push({
            text: 'New Game',
            id: 'new',
            color: colorEnum.green,
            handler: function () {
                game.create();
            }
        });
        controls.push({
            text: '',
            id: '',
            color: colorEnum.transparent
        });
    } else {
        controls.push({
            text: 'Back',
            id: 'back',
            color: colorEnum.green,
            handler: function () {
                // Close the menu
                menu.removeAttr('active');
                // Resume the state
                screen.html(_screenState);
                constrols.html(_controlState);
            }
        });
        controls.push({
            text: 'Save',
            id: 'saveGame',
            color: colorEnum.green,
            handler: function () {
                game.save();
            }
        });
    }
    controls.push({
        text: 'Load',
        id: 'loadGame',
        color: colorEnum.lightblue,
        handler: function () {
            game.load();
        }
    });
    controls.push({
        text: 'Exit',
        id: 'exitGame',
        color: colorEnum.red,
        handler: async function () {
            await game.exit();
        }
    });

    populateControls(controls);
}

// TASKS:
// decide where to save states for controls and story
// implement the avatar direction talking and coloured text
// Start adding minification