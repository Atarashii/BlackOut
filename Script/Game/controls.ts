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

    export class Knob {
        Element: JQuery<HTMLElement>;
        MinDegrees: number;
        MaxDegrees: number;
        Value: number;

        constructor(knob: JQuery<HTMLElement>, min: number, max: number, val: number = 0) {
            this.Element = knob;
            this.MinDegrees = min;
            this.MaxDegrees = max;
            this.Value = val;

            const volKnob = this.Element;
            volKnob.on('mouseover mouseout', function(event: Event) {
                event.preventDefault();

                if (event.type === 'mouseover') {
                    volKnob.on('wheel', handleWheel);
                } else {
                    volKnob.off('wheel', handleWheel);
                }
            });
        }

        getValue(): number {
            return this.Value / 100;
        }

        setValue(val: number) {
            setVolKnob(val*2);
            
            const sound = audio.sounds.get(`tick`);
            sound.volume = audio.music.Volume.getValue() + 0.2;
            sound.play();

            if (audio.music.CurrentTrack)
                audio.music.CurrentTrack.volume = audio.music.Volume.getValue();
        }
    }

    function handleWheel(event: any) {
        const wheelevent = (event as WheelEvent);
        const wheel = (wheelevent as any).originalEvent;
        const deltaY = wheel.deltaY;

        const sound = audio.sounds.get(`tick`);
        sound.volume = audio.music.Volume.getValue() + 0.2;

        if (deltaY > 0) {
            if (audio.music.Volume.Value > 0)
                audio.music.Volume.setValue((audio.music.Volume.Value/2) - 1);
                sound.play();
        } else {
            if (audio.music.Volume.Value < 20)
                audio.music.Volume.setValue((audio.music.Volume.Value/2) + 1);
                sound.play();
        }
    }

    function setVolKnob(val: number) {
        const range = audio.music.Volume.MaxDegrees - audio.music.Volume.MinDegrees;
        audio.music.Volume.Value = val;
        const degrees = audio.music.Volume.MinDegrees + Math.trunc(range * val/20);

        audio.music.Volume.Element.css('transform', `rotate(${degrees}deg)`);
    }
}