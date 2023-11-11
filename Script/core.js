import { addControl, clearControls as clc } from "./controls.js";
import { clear as cls, typeNextSentence as sayMore, stateAndWait } from "./screen.js";
import { pause, togglePlayerMenuOptions } from "./utils.js";
import { color as colorEnum } from "./enums.js";
import { gameAudio as ga } from "./Audio/init.js";

$(document).ready(function () {
    POST_Phase_1();
});

function POST_Phase_1() {
    togglePlayerMenuOptions();
    cls();
    clc();

    AddEvents();

    ga.init();

    addControl('Power on', 'POST', 'red');

    $(document).on('click','#POST', async function() {
        clc();
        await pause(1000);
        await stateAndWait('Time to wake up...', 2000);
        await stateAndWait('Starting system...', 2500);
        await stateAndWait('', 500, true);
        POST_Phase_2();
    });
}

async function POST_Phase_2() {
    await ga.loadSounds();
    await ga.loadMusic();

    $(document).on('click','[id^="playMusic"]', async function() {
        clc();
        const isHappy = $(this).attr('id').indexOf('_yes') > -1;
        if (isHappy) {
            await stateAndWait('Playing the good stuff...', 3000, false, colorEnum.lightpurple);
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
    if (isNewStartup)
        addControl('New Game', 'new', 'green');
    else
        addControl('Back', 'back', 'green');
    addControl('Save', 'save', 'green');
    addControl('Load', 'Load', 'lightblue');
    addControl('Exit', 'exit', 'red');

    $(document).on('click', '#back', function () {
        const menu = $('clicker[title="Menu"]');
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
        toggleMenu();
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
