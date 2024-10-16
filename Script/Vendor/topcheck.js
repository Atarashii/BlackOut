$(async function() {
    if ((await window?.top?.game?.utils?.jsonfile.getData('./Assets/Templates/checks.json'))?.keys?.top === undefined || await window?.top?.game?.crypt?.de(window.top.game.startPage.topKey) === undefined || await window?.top?.game?.crypt?.de(window.top.game.startPage.topKey) !== (await window?.top?.game?.utils?.jsonfile.getData('./Assets/Templates/checks.json'))?.keys?.top) {
        window.location.href = "index.html";
    }
});