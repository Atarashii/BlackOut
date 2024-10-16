namespace game.slots {
    let slotStates = {};

    export let Id: number = -1;

    export function populate() {
        state.init();

        drawSlots();
    }

    async function drawSlots() {
        control.clear();
        const stateContainer = builder.primitive('state');
        global.container.controls().append(stateContainer);

        for (let index = 0; index < 3; index++) {
            const slot = state.Current.Slots[index]
            const classes = `zoom`;
            const slotContainer = builder.primitive('saveslot', `slotId_${slot.Id}`, classes);

            const slotHead = builder.primitive('div', '', '', '', undefined, `<span>Slot ${slot.Id}</span>`);
            const slotName = builder.primitive('div');
            const name = builder.primitive('span', `slotName_${slot.Id}`, '', undefined, undefined, '', slot.Name);
            slotName.append(name);

            const slotLast = builder.primitive('div', '', '', '', undefined, '<span>Last Played</span>');
            const last = builder.primitive('span', `slotLast_${slot.Id}`);
            const lastVal = builder.primitive('span', '', '', undefined, undefined, '', slot.LastUpdated);
            slotLast.append(last);
            slotLast.append(lastVal);

            const slotTime = builder.primitive('div', '', '', '', undefined, '<span>Time Played</span>');
            const time = builder.primitive('span', `slotTime_${slot.Id}`);
            const timeVal = builder.primitive('span', '', '', undefined, undefined, '', slot.TimePlayed);
            slotTime.append(time);
            slotTime.append(timeVal);

            slotContainer.append(slotHead).append(slotName).append(slotLast).append(slotTime);
            stateContainer.append(slotContainer);
            await pause(300);
        }

        $(document).one('click', 'saveslot', async function () {
            const selected = $(this);
            slots.Id = Number(selected.attr('id')!.split('_')[1]);
            
            state.saveState();

            await player.getName();
        });
    }

    function getTimePlayed(created: string, updated: string) {

        const diff = new Date(updated).getTime() - new Date(created).getTime();
        let seconds = diff / (1000);
        let minutes = Math.trunc(seconds / 60);
        seconds = Math.trunc(seconds - (minutes * 60));
        const hours = Math.trunc(minutes / 60);
        minutes = Math.trunc(minutes - (hours * 60));

        return `${hours}h ${minutes}m ${seconds}s`;
    }
}