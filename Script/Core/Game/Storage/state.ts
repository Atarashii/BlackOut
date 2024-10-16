namespace game.state {
    export let Current: GameState;
    export let ActiveSlot: -1;
    export function init() {
        const state = storage.local.get<GameState>('state');
        Current = state ? state : new GameState();
    }

    export function saveState() {
        const state = Current ? Current : storage.local.get<GameState>('state');

        const newState: Array<SaveSlot> = [];
        for (let index = 1; index <= 3; index++) {
            let slot = state?.Slots.filter(s => s.Id == index)[0] ?? new SaveSlot(index);

            if (slot.Id == slots.Id) {
                slot.Created = slot.Created.hasValue() ? slot.Created : getLocalDate();
                slot.LastUpdated = getLocalDate();
                slot.Name = player.Name;
                slot.BossKarma = slot.BossKarma === 50 ? slot.BossKarma + core.BOSSKarma : slot.BossKarma;
            }

            newState.push(slot);
        }

        Current = new GameState(newState);
        storage.local.set('state', Current);
    }

    export function updateState(gameSlots: Array<SaveSlot>) {
        Current = new GameState(gameSlots);
        storage.local.set('state', Current);
    }

    export function clearState() {
        storage.local.del('state');
    }
}

namespace game {
    export class GameState {
        Slots: Array<SaveSlot> = [];

        constructor(slots: Array<SaveSlot> = []) {
            for (let index = 0; index < 3; index++) {
                this.Slots.push(slots[index] ? slots[index] : new SaveSlot(index + 1));
            }
        }
    }

    export class SaveSlot {
        Id: number;
        Name: string = '';
        Created: string = '';
        LastUpdated: string = '';
        BossKarma: number = 50;
        TimePlayed: string = 'coming soon';
        PlayStart: string = '';
        PlayEnd: string = '';

        constructor(id: number) {
            this.Id = id
        }
    }

    export class History {
        Drunkness: number = 100;
        Fullness: number = 0;
        Charge: number = 0; 
        Frame: Array<FrameState> = [];
    }

    export interface FrameState {
        Id: number;
        Type: frame;
    }
}
