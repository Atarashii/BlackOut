window ??= {};
window.game ??= {};
window.game.pp ??= {};

window.game.pp.init = function() {
    PayPal.Donation.Button({
        env: 'production',
        hosted_button_id: '69W4Q83CWVCPA',
        image: {
            src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
            alt: 'Donate with PayPal button',
            title: `PayPal - If you give me enough money, I don't have to focus on other projects and I can do more of this`,
        },
        onComplete: function (params) {
            // Your onComplete handler
        }
    }).render('#donate-button');
}