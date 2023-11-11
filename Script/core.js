import { addControl, clearControls as clc } from "./controls.js";
import { clear as cls, typeNextSentence as sayMore, stateAndWait } from "./screen.js";
import { pause, togglePlayerMenuOptions } from "./utils.js";
import { color as colorEnum } from "./enums.js";
import { gameAudio as ga } from "./Audio/init.js";

$(document).ready(function () {
    POST_Phase_1();
});

window.BOSSKarma = 50;

function POST_Phase_1() {
    togglePlayerMenuOptions();
    cls();
    clc();

    AddEvents();

    ga.init();

    addControl('Power on', 'POST', colorEnum.red);
    addControl(' ', '', colorEnum.transparent);
    addControl(' ', '', colorEnum.transparent);
    addControl(' ', '', colorEnum.transparent);

    $(document).on('click','#POST', async function() {
        clc();
        await pause(1000);
        await stateAndWait('Time to wake up...', 1000);
        await stateAndWait('My name is B.O.S.S. and I will be guiding you through your adventure... Like it or not... I am your BOSS...', 1000, true);
        await POST_Phase_1_1();
    });
}

async function POST_Phase_1_1() {
    addControl('What is a B.O.S.S.?', 'whut_1', colorEnum.green);
    addControl('the fuck is a B.O.S.S.?', 'whut_2', colorEnum.red);
    addControl('What, pray tell, is a B.O.S.S. my good sir?', 'whut_3', colorEnum.lightblue);
    addControl('B.O.S.S.?', 'whut_4', colorEnum.yellow);

    $(document).on('click','[id^="whut"]', async function() {
        clc();
        const answer = $(this);
        const id = Number(answer.attr('id').split('_')[1]);

        switch(id) {
            case 1: {
                await stateAndWait('All middle sliders for you isn\'t it...', 500, true, colorEnum.green);
                BOSSKarma++;
                break;
            }
            case 2: {
                await stateAndWait('You gotta watch your mouth, you peppy little spitfuck!', 500, true, colorEnum.red);
                BOSSKarma -= 2;
                break;
            }
            case 3: {
                await stateAndWait('Hwhat? Hwhom? Hhow? I like your style, you can stay...', 500, true, colorEnum.lightblue);
                BOSSKarma += 2;
                break;
            }
            case 4: {
                await stateAndWait('You being short with me? you think you can do this better don\'t you...', 500, true, colorEnum.yellow);
                BOSSKarma--;
                break;
            }
        }

        await stateAndWait('What is a "B.O.S.S." you ask?', 500, true);
        await stateAndWait('I am your Black Out Support System...', 500, true);
        await stateAndWait('Now... can we start having some fun please?', 2000, true);
        await stateAndWait('Starting system...', 2500);
        await stateAndWait('', 500, true);
        await POST_Phase_2();
    });
}

async function POST_Phase_2() {
    await ga.loadSounds();
    await ga.loadMusic();

    $(document).on('click','[id^="playMusic"]', async function() {
        clc();
        const isHappy = $(this).attr('id').indexOf('_yes') > -1;
        if (isHappy) {
            await stateAndWait('Playing the good stuff...', 3000, false, colorEnum.mediumpurple);
            await stateAndWait('This is my favourite...', 2000, true, colorEnum.lightblue);
            await stateAndWait('We are going to be good friends you and I...', 2000, true, colorEnum.green);
        } else {
            await stateAndWait('Why do you hate culture?', 3000, false, colorEnum.red);
            await stateAndWait('Do you not have a soul?', 2000, true, colorEnum.orangered);
            await stateAndWait('Let us just get on with it...', 2000, true, colorEnum.orange);
            await stateAndWait('Fucker...', 1000, false, colorEnum.yellow);
            await stateAndWait('Continuing...', 1000, false);
        }

        POST_Phase_3();
    });
}

async function POST_Phase_3() {
    await stateAndWait('Unlocking player controls...', 1000);
    togglePlayerMenuOptions();
    await stateAndWait('Stating the obvious...', 3000, true);
    
    await pause(1000);
    await stateAndWait('Welcome player...', 3000);
    addMenuControls(true);
}

const screen = $('.story');
const constrols = $('.controls');
let _screenState = '';
let _controlState = '';

function AddEvents() {

    $(document).on('click', '#continue', function () {
        clc();
        sayMore();
    });

    $(document).on('click', 'clicker[title="Menu"]', function () {
        const menu = $(this);
        toggleMenu(menu);
    });

    
}

function toggleMenu(menu) {
    const isActive = menu.is("[active]");

    if (isActive) {
        // Close the menu
        menu.removeAttr('active')
        // Resume the state
        screen.html(_screenState);
        constrols.html(_controlState);
    }
    else {
        // open the menu
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
    if (isNewStartup) {
        addControl('New Game', 'new', colorEnum.green);
        addControl('  ', '', colorEnum.transparent);
    } else {
        addControl('Back', 'back', colorEnum.green);
        addControl('Save', 'save', colorEnum.green);
    }
    addControl('Load', 'Load', colorEnum.lightblue);
    addControl('Exit', 'exit', colorEnum.red);

    $(document).on('click', '#back', function () {
        // Close the menu
        menu.removeAttr('active');
        // Resume the state
        screen.html(_screenState);
        constrols.html(_controlState);
    });

    $(document).on('click', '#exit', async function () {
        clc();
        await stateAndWait('Why would you do this to me?', 2500);
        _screenState = '';
        _controlState = '';
        cls();
        toggleMenu(menu);
    });
}

// TASKS:
// disable controls when in menu and or typing
// decide where to save states for controls and story
// implement the avatar direction talking and coloured text
// sort out menu button positioning
// ensure that when exit is clixked all clickers disappear
// create proper modules for menu, controls, etc.
// reafactor and make sure everything is where it should be
