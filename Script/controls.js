import { color as colorEnum } from "./enums.js";

const controlsContainer = $('.controls');

export function addControl(text, id, color = '', handler = undefined, handlerSelector = '') {
    const hasColor = color.trim().length > 0;
    const hasText = text.trim().length > 0;
    const hasId = id.trim().length > 0;
    const hasHandlerSelector = handlerSelector.trim().length > 0;

    const style = hasColor ? ` style="--accent-color: ${colorEnum[color]};${(hasText ? '' : 'cursor: default;')}"` : ` style="--accent-color: ${colorEnum.green};${(hasText ? '' : 'cursor: default;')}"`;

    const control = `<control${(hasId ? ` id="${id}"` : '')}${style}>${text}</control>`;
    controlsContainer.append($(control));

    if ((hasId || hasHandlerSelector > 0) && handler && typeof handler === 'function') {
        $(document).on('click', hasHandlerSelector ? handlerSelector : `#${id}`, handler);
    }
}

export function populateControls(options) {
    clearControls();
    // Prepare options
    for (let index = 0; index < 4; index++) {
        if (options.length === index) {
            options.push({ text: '', id: '', color: colorEnum.transparent })
        }
    }
    options.forEach(option => {
        const text = option.hasOwnProperty('text') ? option.text : '';
        const id = option.hasOwnProperty('id') ? option.id : '';
        const color = option.hasOwnProperty('color') ? option.color : '';
        const handler = option.hasOwnProperty('handler') ? option.handler : undefined;
        const handlerSelector = option.hasOwnProperty('handlerSelector') ? option.handlerSelector : '';
        addControl(text, id, color, handler, handlerSelector)
    });
}

export function clearControls() {
    controlsContainer.html('');
}