namespace game.post {
    export async function init() {
        togglePlayerMenuOptions();
        display.clear();
        control.clear();
        await changelog.init();

        await Phase_0();
    }

    async function Phase_0(): Promise<void> {
        audio.init();

        const state = storage.local.get<GameState>('state');

        const slotPopped = state?.Slots.filter(s => s.Name.hasValue());

        if (slotPopped && slotPopped.length > 0)
            core.CanWake = true;

        await Phase_0_1();
    }

    async function Phase_0_1(): Promise<void> {
        const ctrls: Array<GameControl> = [];

        ctrls.push(new GameControl('Power on', 1, color.orangered));

        if (game.core.CanWake)
            ctrls.push(new GameControl('Wake', 2, color.orange));

        const gamecontrols = new GameControls(ctrls, async function (event: any) {
            if (!event)
                return;

            Phase_1(Number(event.data[0]));
        });

        gamecontrols.populate();
    }

    async function Phase_1(choice: number): Promise<void> {
        game.control.clear();
        switch (choice) {
            case 1:
                Phase_1_1();
                break;
            case 2:
                Phase_1_2();
                break;
        }
    }

    async function Phase_1_1(): Promise<void> {
        await pause(1000);
        await display.speak('Time to wake up...', 1000);
        await display.speak('My name is B.O.S.S. and I will be guiding you through your adventure... Like it or not... I am your BOSS...', 1000, true);

        await Phase_1_1_1();
    }

    async function Phase_1_1_1(): Promise<void> {
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
                    core.BOSSKarma++;
                    break;
                }
                case '2': {
                    await display.speak('You gotta watch your mouth around here or you\'ll get knocked down!', 500, true, color.red);
                    core.BOSSKarma -= 2;
                    break;
                }
                case '3': {
                    await display.speak('Hwhat? Hwhom? Hhow? I like your style, you can stay...', 500, true, color.lightblue);
                    core.BOSSKarma += 2;
                    break;
                }
                case '4': {
                    await display.speak('You being short with me? you think you can do this better don\'t you...', 500, true, color.yellow);
                    core.BOSSKarma--;
                    break;
                }
            }

            await display.speak('What is a "B.O.S.S." you ask?', 500, true);
            await display.speak('I am your Black Out Support System...', 500, true);
            await display.speak('Now... can we start having some fun please?', 2000, true);

            await Phase_2();
        });

        gamecontrols.populate();
    }

    async function Phase_1_2(): Promise<void> {
        core.IsWake = true;
        await pause(1000);
        await display.speak('Time to wake up again...', 1000);

        await Phase_2();
    }

    async function Phase_2(): Promise<void> {
        await display.speak('Starting system...', 2500);
        await display.speak('', 500, true);

        await Phase_2_1();
    }

    async function Phase_2_1(): Promise<void> { // Audio
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
                        await display.speak('Playing the good stuff...', 1000, false, color.mediumpurple);
                        audio.music.Volume.setValue(1);
                        audio.music.playSong();
                        await pause(1500);
                        await display.speak('This is my favourite...', 2000, true, color.lightblue);
                        await display.speak('We are going to be good friends you and I...', 2000, true, color.green);
                        core.BOSSKarma++
                        break;
                    }
                    case '2': {
                        await display.speak('Why do you hate culture?', 3000, false, color.red);
                        await display.speak('Do you not have a soul?', 2000, true, color.orangered);
                        await display.speak('Let us just get on with it...', 2000, true, color.orange);
                        await display.speak('Fucker...', 1000, false, color.yellow);
                        await display.speak('Continuing...', 1000, false);
                        core.BOSSKarma--;
                        break;
                    }

                }

                await Phase_3();
            });

            gamecontrols.populate()
        }
        else
            await Phase_3();
    }

    async function Phase_2_2(): Promise<void> { // images video etc later here

    }

    async function Phase_3(): Promise<void> {
        await display.speak('Unlocking player controls...', 1000);

        togglePlayerMenuOptions();
        enableinputs();
        await display.speak('Stating the obvious...', 1000, true);

        await pause(1000);
        await display.speak('Welcome player...', 3000);

        if (!audio.music.isPlaying()){
            audio.music.Volume.setValue(1);
            audio.music.playSong();
        }

        loop.init();

        core.addMenuControls();
    }
}