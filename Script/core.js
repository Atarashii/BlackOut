import { addControl, clearControls as clc } from "./controls.js";
import { clear as cls, typeNextSentence as sayMore, stateAndWait } from "./screen.js";
import { initSound, loadSounds } from "./sounds.js";
import { pause, togglePlayerMenuOptions } from "./utils.js";
import { color as colorEnum } from "./enums.js";

$(document).ready(function () {
    POST_Phase_1();
});

function POST_Phase_1() {
    togglePlayerMenuOptions();
    cls();
    clc();

    AddEvents();
    initSound();

    addControl('Power on', 'POST', 'red');

    $(document).on('click','#POST', async function() {
        clc();
        await stateAndWait('Time to wake up...', 2000);
        await stateAndWait('Starting system...', 3000);
        POST_Phase_2();
    });
}

async function POST_Phase_2() {
    await loadSounds();

    $(document).on('click','[id^="playMusic"]', async function() {
        clc();
        const isHappy = $(this).attr('id').indexOf('_yes') > -1;
        await stateAndWait(isHappy ? 'Playing the good stuff...': 'Why do you hate culture?', 3000, false, isHappy ? colorEnum.lightpurple : colorEnum.red);
        await stateAndWait(isHappy ? 'This is my favourite...': 'Do you not have a soul?', 2000, true,isHappy ? colorEnum.lightblue : colorEnum.orangered);
        await stateAndWait(isHappy ? 'We are going to be good friends you and I...': 'Let us just get on with it...', 2000, true, isHappy ? colorEnum.green : colorEnum.orange);

        if (!isHappy){
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
            addControl('Back', 'back', 'green');
            addControl('Save', 'save', 'green');
            addControl('Load', 'Load', 'lightblue');
            addControl('Exit', 'exit', 'red');
        }
    });

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
