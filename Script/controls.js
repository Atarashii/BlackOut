import { color as colorEnum } from "./enums.js";

const controlsContainer = $('.controls');

export function addControl(text, id, color = '') {
    const hasColor = color.trim().length > 0;
    const hasText = text.trim().length > 0;
    const hasId = id.trim().length > 0;

    const style = hasColor ? ` style="--accent-color: ${colorEnum[color]};${(hasText ? '' : 'cursor: default;')}"` : ` style="--accent-color: ${colorEnum.green};${(hasText ? '' : 'cursor: default;')}"`;

    const control = `<control${(hasId ? ` id="${id}"` : '')}${style}>${text}</control>`;
    controlsContainer.append($(control));
}

export function clearControls() {
    controlsContainer.html('');
}