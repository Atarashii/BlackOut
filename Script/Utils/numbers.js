function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt)
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function getRandomIndex(size, startAt = 0) {
    let rangeIndex = range(size, startAt);
    return shuffle(rangeIndex);
}
