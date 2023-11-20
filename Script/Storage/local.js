export const version = $('#gameversion').text();
export const localState = {
    saveGame: function (slot) {
        const saveState = get(`${version}-state`);
        const newState = [];

        if (saveState) {

        }

        set(`${version}-state`, saveState)
    },
    loadGame: function (slot) {
        const saveState = get(`${version}-state`);
    },
    loadAll: function () {
        return get(`${version}-state`);
    }

}

function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
    return JSON.parse(localStorage.getItem(key));
}