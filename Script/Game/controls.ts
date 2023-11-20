namespace game.control {
    export function clear(): void {
        global.container.controls().html('');
    }
}

namespace game {
    export class GameControl {
        Text: string | undefined;
        Value: number;
        Color: color;

        constructor(text: string, value: number = -1, color: color = game.color.transparent) {
            this.Text = text.trim().length > 0 ? text.trim() : undefined;
            this.Value = value;
            this.Color = color;
        }

        createElement() {
            const hasText = this.Text ? this.Text : '';
            const style = new Pairs([new KeyValue('--accent-color', this.Color)]);

            if (!hasText)
                style.List.push(new KeyValue('cursor', 'default'));

            const valueAttr = new KeyValue('value', this.Value.toString());
            return builder.primitive('control', '', 'zoom-mini', style, new Pairs([valueAttr]), undefined, this.Text);
        }
    }

    export class GameControls {
        Controls: Array<GameControl>;
        Handler: (event: Event) => Promise<void> = async function () { };

        constructor(controls: Array<GameControl> = [], handler: (event: Event) => Promise<void>) {
            // Ensure we have 4 controls
            for (let index = 0; index < 4; index++) {
                if (controls.length === index)
                    controls.push(new GameControl('', index));
            }

            this.Controls = controls;
            if (handler)
                this.Handler = handler;
        }

        async populate() {
            this.clear();

            const gameControl = this;
            this.Controls.forEach(async function (control) {
                const controlElement = control.createElement();
                global.container.controls().append(controlElement);
                $(controlElement).one('click', [control.Value], async function (event: any) {
                    gameControl.handle(event);
                });
                await pause(250);
            });
        }

        clear(): void {
            control.clear();
        }

        async handle(event: Event) {
            await this.Handler(event);
        }
    }
}