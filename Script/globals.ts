namespace game.global {
    // Sound and volume
    export let mainVol = 1;
    export let FinalScene = false;
}

namespace game.global.container {
    export function controls() { return $('.controls'); }
    export function story() { return $('.story'); }
    export function log() { return $('#footer .changelog'); }
    export function avatarLeft() { return $('.avatar.left'); }
    export function avatarRight() { return $('.avatar.right'); }
}