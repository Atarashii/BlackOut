import { mainVol } from "./globals.js";

export function getVolOffset() {
    var random = (Math.random() * 100) / 5;
    var big = Math.round(random);
    var normal = big / 50;

    var volume = round((normal - 0.2), 2) + mainVol;

    return  volume > 1 ? 1 : (volume < 0 ? 0 : volume);
}

export function round(num, decimals) {
        var n = Math.pow(10, decimals);
        return Math.round( (n * num).toFixed(decimals) )  / n;
}

export function pause(s) {
    return new Promise(function (resolve) {
        setTimeout(resolve, s);
    });
}

export function togglePlayerMenuOptions() {
    $('clicker').each((i, clicker) => {
        if ($(clicker).attr('title').indexOf('Menu') === -1)
            $(clicker).toggleClass('hide');
    });
}