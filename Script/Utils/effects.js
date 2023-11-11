export function disableMenu() {
    $('clicker').attr('disabled', '');
}

export function disableControls() {
    $('control').attr('disabled', '');
}

export function disableinputs() {
    disableMenu();
    disableControls();
}

export function enableMenu() {
    $('clicker').removeAttr('disabled');
}

export function enableControls() {
    $('control').removeAttr('disabled');
}

export function enableinputs() {
    enableMenu();
    enableControls();
}
