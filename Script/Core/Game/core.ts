namespace game.core {
    export let BOSSKarma = 0;
    export let IsFirstRun = true;
    export let IsWake = false;
    export let CanWake = false;
    export let _screenState = '';
    export let _controlState = '';
    export let Version = '';

    const screen = $('.story');
    const constrols = $('.controls');

    export async function init() {
        await game.post.init();
        addEvents();
    }

    function addEvents() {
        $(document).on('click', '#continue', function () {
            control.clear();
            display.continueSpeak();
        });

        $(document).on('click', 'clicker[title="Menu"]', function () {
            const menu = $(this);
            toggleMenu(menu);
        });

        
        $('switch').on('click', function(){
            const switchBtn = $(this);

            const sound = audio.sounds.get(`click-on`);
            sound.volume = audio.music.Volume.getValue() + 0.2;
            sound.play();
            
            switch(switchBtn.attr('value')) {
                case 'play': {
                    switchBtn.removeClass('active');
                    switchBtn.addClass('active');
                    $('switch[value="pause"]').removeClass('active');

                    if (!audio.music.isPlaying())
                        audio.music.CurrentTrack.play();
                    break;
                }
                case 'pause': {
                    switchBtn.removeClass('active');
                    switchBtn.addClass('active');
                    $('switch[value="play"]').removeClass('active');
                    
                    if (audio.music.isPlaying())
                        audio.music.CurrentTrack.pause();
                    break;
                }
                case 'skip': {
                    audio.music.skip();
                    break;
                }
                case 'shuffle': {
                    switchBtn.toggleClass('active');
                    if (switchBtn.attr('class')?.contains('active'))
                        audio.music.IsRandom = true;
                    else
                        audio.music.IsRandom = false;

                    break;
                }
            }
        })
    }

    function toggleMenu(menu: JQuery<HTMLElement>) {
        const isActive = menu.is("[active]");

        if (isActive) {
            enableMenu();
            // Close the menu
            menu.removeAttr('active')
            // Resume the state
            screen.html(_screenState);
            constrols.html(_controlState);
        } else {
            // open the menu
            disableMenu();
            _screenState = screen.html();
            _controlState = constrols.html();
            screen.html('');
            constrols.html('');

            menu.attr('active', 'true');
            addMenuControls(true);
        }
    }

    export function addMenuControls(isRunning: boolean = false) {
        const ctrls: Array<GameControl> = [];
        const menu = $('clicker[title="Menu"]');

        if (!isRunning || IsFirstRun) {
            ctrls.push(new GameControl('New Game', 1, color.green));
            ctrls.push(new GameControl(''));
        } else {
            ctrls.push(new GameControl('Back', 1, color.green));
            ctrls.push(new GameControl('Save', 2, color.green));
        }

        ctrls.push(new GameControl('Load', 3, color.lightblue));
        ctrls.push(new GameControl('Exit', 4, color.orangered));

        const gamecontrols = new GameControls(ctrls, async function (event: any) {
            const control = event.data[0];
            gamecontrols.clear();
            switch (control) {
                case 1: {
                    if (!isRunning || IsFirstRun)
                        loop.create();
                    else {
                        // Close the menu
                        menu.removeAttr('active');
                        // Resume the state
                        screen.html(_screenState);
                        constrols.html(_controlState);
                    }
                    break;
                }
                case 2: {
                    loop.save();
                    break;
                }
                case 3: {
                    loop.load();
                    break;
                }
                case 4: {
                    await loop.exit();
                    break;
                }
            }
        });

        gamecontrols.populate();
    }
}