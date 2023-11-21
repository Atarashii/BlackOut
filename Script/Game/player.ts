namespace game.player {
    let Names: Array<Namer>;
    let CurrentName = 0;
    let ShuffledIndex: Array<number> = [];

    interface Namer {
        Name: string;
        Response: string | undefined;
        Real: string | undefined;
    }

    export let Name: string;

    export async function getName() {
        display.clear();
        control.clear();
        Names = (await utils.jsonfile.getData('./Assets/Templates/BOSS/names.json')).Names as Array<Namer>;
        ShuffledIndex = utils.number.getRandomIndex(Names.length);

        await display.speak('So I guess you need a name huh...', 500);
        await nextName();
    }

    async function nextName() {
        const currentName = Names[ShuffledIndex[CurrentName]];

        CurrentName++;
        let ask = '';
        switch (Math.ceil(Math.random() * 5)) {
            case 1:
                ask = 'Is it... XX?';
                break;
            case 2:
                ask = 'What about "XX"?';
                break;
            case 3:
                ask = 'It\'s gotta be XX, right??';
                break;
            case 4:
                ask = '*Obviously reading random names from a list* XX?';
                break;
            case 5:
                ask = 'I swear I know it... is it XX?';
                break;
        }

        await display.speak(ask.replace('XX', currentName.Name), 500);
        const ctrls: Array<GameControl> = [];
        ctrls.push(new GameControl('Yes', 1, color.green));
        ctrls.push(new GameControl('No?', 2, color.orangered));

        const gamecontrols = new GameControls(ctrls, async function (event: Event) {
            const control = $((event.currentTarget as any));
            gamecontrols.clear();
            switch (control.attr('value')) {
                case '1': {
                    const name = currentName;
                    setPlayerName(name);
                    break;
                }
                case '2': {
                    if (CurrentName <= Names.length)
                        await nextName();
                    else {
                        const name = Names[ShuffledIndex[CurrentName]];
                        setPlayerName(name);
                    }
                    break;
                }
            }
        });

        gamecontrols.populate();
    }

    async function setPlayerName(name: Namer) {
        if (name.hasOwnProperty('Response') && name.Response)
            await display.speak(name.Response, 1000);

        if (name.hasOwnProperty('Real') && name.Real)
            Name = name.Real;
        else
            Name = name.Name;

        const newState: Array<SaveSlot> = [];
        state.Current.Slots.forEach(slot => {
            if (slot.Id == slots.Id) {
                slot.LastUpdated = getLocalDate();
                slot.Name = player.Name;
            }

            newState.push(slot);
        });

        state.updateState(newState);

        await display.speak('Finally we can get into this!', 1000);
        await loop.start();
    }
}