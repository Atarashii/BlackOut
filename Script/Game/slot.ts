namespace game.slots {
    let slotStates = {};

    export let Id: number = -1;
    export let Created: Date;
    export let LastUpdated: Date;

    export function populate() {
        //slotStates = localState.loadAll();

        drawSlots();
    }

    async function drawSlots() {
        control.clear();
        const stateContainer = builder.primitive('state');
        global.container.controls().append(stateContainer);

        for (let index = 0; index < 3; index++) {

            const classes = `zoom`;
            const slotContainer = builder.primitive('saveslot', `slotId_${index + 1}`, classes);

            const slotHead = builder.primitive('div', '', '', '', undefined, `<span>Slot ${index + 1}</span>`);
            const slotName = builder.primitive('div');
            const name = builder.primitive('span', `slotName_${index}`);
            slotName.append(name);

            const slotLast = builder.primitive('div', '', '', '', undefined, '<span>Last Played</span>');
            const last = builder.primitive('span', `slotLast_${index}`);
            slotLast.append(last);

            const slotTime = builder.primitive('div', '', '', '', undefined, '<span>Time Played</span>');
            const time = builder.primitive('span', `slotTime_${index}`);
            slotTime.append(time);

            slotContainer.append(slotHead).append(slotName).append(slotLast).append(slotTime);
            stateContainer.append(slotContainer);
            await pause(300);
        }

        $(document).on('click', 'saveslot', async function () {
            const selected = $(this);
            slots.Id = Number(selected.attr('id')!.split('_')[1]);
            await player.getName();
        });
    }
}