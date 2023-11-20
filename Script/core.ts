namespace game.core {
    export let BOSSKarma = 50;
    export let IsFirstRun = true;
    export let IsWake = false;

    $(document).ready(function () {
        game.changelog.init();
        POST_Phase_0();
    });

    async function POST_Phase_0() {
        togglePlayerMenuOptions();
        display.clear();
        control.clear();

        AddEvents();

        game.audio.init();
        await POST_Phase_1();
    }

    async function POST_Phase_1() {
        const ctrls: Array<GameControl> = [];
        ctrls.push(new GameControl('Power on', 1, color.orangered));
        ctrls.push(new GameControl('Wake', 2, color.orange));

        const gamecontrols = new GameControls(ctrls, async function (event: any) {
            if (!event)
                return;

            const data = Number(event.data[0]);
            gamecontrols.clear();
            switch (data) {
                case 1: {
                    await pause(1000);
                    await display.speak('Time to wake up...', 1000);
                    await display.speak('My name is B.O.S.S. and I will be guiding you through your adventure... Like it or not... I am your BOSS...', 1000, true);

                    await POST_Phase_1_1();
                    break;
                }
                case 2: {
                    core.IsWake = true;
                    await pause(1000);
                    await display.speak('Time to wake up again...', 1000);

                    await POST_Phase_2();
                    break;
                }
            }
        });

        gamecontrols.populate();
    }

    async function POST_Phase_1_1() {
        const ctrls: Array<GameControl> = [];
        ctrls.push(new GameControl('What is a B.O.S.S.?', 1, color.green));
        ctrls.push(new GameControl('The f*@k is a B.O.S.S.?', 2, color.orangered));
        ctrls.push(new GameControl('What, pray tell, is a B.O.S.S. my good sir?', 3, color.mediumpurple));
        ctrls.push(new GameControl('B.O.S.S.?', 4, color.orange));

        const gamecontrols = new GameControls(ctrls, async function (event: Event) {
            const control = $((event.currentTarget as any));
            gamecontrols.clear();
            switch (control.attr('value')) {
                case '1': {
                    await display.speak('All middle sliders for you isn\'t it...', 500, true, color.green);
                    BOSSKarma++;
                    break;
                }
                case '2': {
                    await display.speak('You gotta watch your mouth around here or you\'ll get knocked down!', 500, true, color.red);
                    BOSSKarma -= 2;
                    break;
                }
                case '3': {
                    await display.speak('Hwhat? Hwhom? Hhow? I like your style, you can stay...', 500, true, color.lightblue);
                    BOSSKarma += 2;
                    break;
                }
                case '4': {
                    await display.speak('You being short with me? you think you can do this better don\'t you...', 500, true, color.yellow);
                    BOSSKarma--;
                    break;
                }
            }

            await display.speak('What is a "B.O.S.S." you ask?', 500, true);
            await display.speak('I am your Black Out Support System...', 500, true);
            await display.speak('Now... can we start having some fun please?', 2000, true);
            await POST_Phase_2();
        });

        gamecontrols.populate();
    }

    async function POST_Phase_2() {
        await display.speak('Starting system...', 2500);
        await display.speak('', 500, true);
        await audio.loadSounds();
        await audio.loadMusic();

        if (!core.IsWake) {
            await display.longSpeak('Would you like some "tunes"?', color.yellow, false);

            const ctrls: Array<GameControl> = [];
            ctrls.push(new GameControl('Hell yeah! I want WAR TRUMPETS!', 1, color.mediumpurple));
            ctrls.push(new GameControl('Silence is golden', 2, color.orangered));

            const gamecontrols = new GameControls(ctrls, async function (event: Event) {
                const control = $((event.currentTarget as any));
                gamecontrols.clear();
                switch (control.attr('value')) {
                    case '1': {
                        await display.speak('Playing the good stuff...', 3000, false, color.mediumpurple);
                        await display.speak('This is my favourite...', 2000, true, color.lightblue);
                        await display.speak('We are going to be good friends you and I...', 2000, true, color.green);
                        BOSSKarma++
                        break;
                    }
                    case '2': {
                        await display.speak('Why do you hate culture?', 3000, false, color.red);
                        await display.speak('Do you not have a soul?', 2000, true, color.orangered);
                        await display.speak('Let us just get on with it...', 2000, true, color.orange);
                        await display.speak('Fucker...', 1000, false, color.yellow);
                        await display.speak('Continuing...', 1000, false);
                        BOSSKarma--;
                        break;
                    }

                }

                await POST_Phase_3();
            });

            gamecontrols.populate()
        }
        else
            await POST_Phase_3();
    }

    async function POST_Phase_3() {
        await display.speak('Unlocking player controls...', 1000);

        togglePlayerMenuOptions();
        enableinputs();
        await display.speak('Stating the obvious...', 1000, true);

        await pause(1000);
        await display.speak('Welcome player...', 3000);

        loop.init();

        addMenuControls();
    }

    const screen = $('.story');
    const constrols = $('.controls');
    export let _screenState = '';
    export let _controlState = '';

    function AddEvents() {
        $(document).on('click', '#continue', function () {
            control.clear();
            display.continueSpeak();
        });

        $(document).on('click', 'clicker[title="Menu"]', function () {
            const menu = $(this);
            toggleMenu(menu);
        });
    }

    function toggleMenu(menu: JQuery<HTMLElement>) {
        const isActive = menu.is("[active]");

        if (isActive) {
            enableMenu();
            // Close the menu
            menu.removeAttr('active')
            // Resume the state
            screen.html(_screenState);
            constrols.html(_controlState);
        } else {
            // open the menu
            disableMenu();
            _screenState = screen.html();
            _controlState = constrols.html();
            screen.html('');
            constrols.html('');

            menu.attr('active', 'true');
            addMenuControls(true);
        }
    }

    function addMenuControls(isRunning: boolean = false) {
        const ctrls: Array<GameControl> = [];
        const menu = $('clicker[title="Menu"]');

        if (!isRunning || IsFirstRun) {
            ctrls.push(new GameControl('New Game', 1, color.green));
            ctrls.push(new GameControl(''));
        } else {
            ctrls.push(new GameControl('Back', 1, color.green));
            ctrls.push(new GameControl('Save', 2, color.green));
        }

        ctrls.push(new GameControl('Load', 3, color.lightblue));
        ctrls.push(new GameControl('Exit', 4, color.orangered));

        const gamecontrols = new GameControls(ctrls, async function (event: Event) {
            const control = $((event.currentTarget as any));
            gamecontrols.clear();
            switch (control.attr('value')) {
                case '1': {
                    if (!isRunning || IsFirstRun)
                        loop.create();
                    else {
                        // Close the menu
                        menu.removeAttr('active');
                        // Resume the state
                        screen.html(_screenState);
                        constrols.html(_controlState);
                    }
                    break;
                }
                case '2': {
                    loop.save();
                    break;
                }
                case '3': {
                    loop.load();
                    break;
                }
                case '4': {
                    await loop.exit();
                    break;
                }
            }
        });

        gamecontrols.populate();
    }
}