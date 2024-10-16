namespace game.display {
    // Rules
    const _MAX_CONTENT_HEIGHT = 300;
    const _TYPING_SPEED = 50;

    // Internal globals
    let CurrentText: string = '';
    let Sentences: Array<string> = [];
    let CurrentSentence: number = 0;
    let PreviousCharacter: string = '';
    let PlayVariant: number = -1;

    export function clear() {
        global.container.story().html('');
    }

    function addLine(color?: color) {
        const line = display.line.create(color);

        global.container.story().append(line);
        lineHeightCheck();

        return line;
    }

    function lineHeightCheck() {
        let height = 0;
        let unfit = true;
        while (unfit) {
            const lines = $(global.container.story().find('chatline'));

            if (lines && lines.length > 10) {
                lines.each((i, l) => {
                    height += Number($(l).height());
                });

                if (height >= _MAX_CONTENT_HEIGHT) {
                    lines[0].remove();
                    height = 0;
                } else
                    unfit = false;
            } else
                unfit = false;
        }
    }

    function preProcessText() {
        Sentences = [];
        let go = true;
        let choppingBoard = CurrentText;

        while (go) {
            if (choppingBoard.length > 250) {
                let stopIndex = choppingBoard.indexOf('...') + 1; // Check for elipses first
                if (stopIndex < 0)
                    stopIndex = choppingBoard.indexOf('.') + 1; // Check if we are at the end of a sentence

                let sentence = choppingBoard;
                if (stopIndex > 0) {
                    sentence = choppingBoard.substring(0, stopIndex);

                    choppingBoard = choppingBoard.replace(sentence, '').trimStart();
                }

                Sentences.push(sentence);
            }
            else {
                Sentences.push(choppingBoard);
                go = false;
            }
        }
    }

    export async function speak(text: string, delay: number = 1000, add: boolean = false, color: color = game.color.green) {
        CurrentText = text;
        PreviousCharacter = '';
        CurrentSentence = 0;
        await type(false, add, color);

        await pause(delay);
        enableControls();
    }

    export async function longSpeak(text: string, color: color = game.color.transparent, hasContinue: boolean = true) {
        CurrentText = text;
        PreviousCharacter = '';
        CurrentSentence = 0;
        preProcessText();
        await continueSpeak(hasContinue, color);
    }

    export async function continueSpeak(hasContinue: boolean = true, color: color = game.color.transparent) {
        CurrentText = Sentences[CurrentSentence];
        await type(hasContinue, true, color);

        CurrentSentence++
        if (Sentences.length > CurrentSentence)
            return;
        else {
            CurrentSentence = 0;
            Sentences = [];
        }

        enableControls();
    }

    async function type(hasContinue: boolean, add: boolean = false, color: color = game.color.transparent) {
        disableinputs();

        if (!add)
            clear();

        const line = addLine(color);

        const text = line.text() + CurrentText;

        for (let index = 2; index <= text.length; index++) {
            var written = text.substring(0, index);
            var lastChar = written.slice(-1);
            var delay = _TYPING_SPEED + Math.floor(Math.random() * 50);
            typeSound(lastChar);

            line.text(written);
            PreviousCharacter = written.slice(-1);
            await pause(delay);
        }
    }


    function typeSound(character: string) {
        switch (character) {
            case ' ': {
                PlayVariant = Math.ceil(Math.random() * 2);

                const sound = audio.sounds.get(`space${PlayVariant}`);
                sound.volume = getVolOffset();
                sound.play()
                break;
            }
            case '.': {
                const sound = audio.sounds.get(`type1`);
                sound.volume = getVolOffset();
                sound.play();
                break;
            }
            default: {
                if (character !== PreviousCharacter)
                    PlayVariant = Math.ceil(Math.random() * 10);

                const sound = audio.sounds.get(`type${PlayVariant}`);
                sound.volume = getVolOffset();
                sound.play();
                break;
            }
        }
    }
}
