namespace game.display.line {
    export function create(color: color = game.color.transparent) {
        return builder.primitive('chatline', '', '', new Pairs([new KeyValue('--accent-color', color)]));
    }
}