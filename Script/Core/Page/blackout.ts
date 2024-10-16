namespace game.startPage {  
    export let topKey: Cryptid;

    export async function init() {
        await crypt.init();

        addDonate();
        addEvents();
        addKeys();
    }

    function addEvents() {
        $('.start-game, .changes-log.view').on('click', function(){
            const type = $(this).data('overlay');
            const parent = $(`#${type}-overlay`);
            parent.toggleClass('hide', !parent.hasClass('hide'));
        });

        $('.frame-controls span').on('click', function() {
            const action = ($(this).data('action') as string).toLowerCase();
            const parent = $(this).closest('div[id$="-overlay"]');

            switch (action) {
                case 'start': {
                    const iframe = $('#game-overlay').find('iframe').contents();
                    iframe.find('.scene').removeClass('hide');
                    iframe.find('.action').removeClass('hide');

                    break;
                }
                case 'max': {
                    break;
                }
                case 'min': {
                    parent.toggleClass('hide', !parent.hasClass('hide'));
                    break;
                }
                case 'mute': {
                    break;
                }
                case 'un-mute': {
                    break;
                }
            }
        });
    }

    async function addKeys() {
        topKey = await crypt.en((await utils.jsonfile.getData('./Assets/Templates/checks.json') as any).keys.top);
    }

    function addDonate() {
        (window as any).game.pp.init();
    }
}