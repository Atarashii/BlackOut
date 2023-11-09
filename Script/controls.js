import { color as colorEnum } from "./enums.js";

const controlsContainer = $('.controls');

export function addControl(text, id, color = '') {
    const control = `<control${(id.length > 0 ? ` id="${id}"` : '')}${(color.length > 0 ? ` style="--accent-color: ${colorEnum[color]};"` : ` style="--accent-color: ${colorEnum.green};"`)}>${text}</control>`;
    controlsContainer.append($(control));
}

export function clearControls() {
    controlsContainer.html('');
}