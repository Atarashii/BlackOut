import { addControl, clearControls as clc } from "./controls.js";
import { clear as cls, typeNextSentence as sayMore, stateAndWait } from "./screen.js";
import { pause, togglePlayerMenuOptions } from "./utils.js";

$(document).ready(function () {
    POST_Phase_1();
});

function POST_Phase_1() {
    togglePlayerMenuOptions();
    cls();
    clc();

    AddEvents();

    addControl('Power on', 'POST', 'red');

    $(document).on('click','#POST', async function() {
        $(this).remove();
        await stateAndWait('Time to wake up...', 2500);
        await stateAndWait('Starting system...', 4000);
        POST_Phase_2();
    });
}

async function POST_Phase_2() {
    togglePlayerMenuOptions();
    pause(1000);
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
