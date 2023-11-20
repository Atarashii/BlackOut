namespace game.utils.number {
    export function getRandomIndex(size: number, startAt: number = 0) {
        let rangeIndex = range(size, startAt);
        return shuffle(shuffle(rangeIndex));
    }

    function range(size: number, startAt: number = 0) {
        return [...Array(size).keys()].map(i => i + startAt)
    }

    function shuffle(array: Array<number>) {
        let currentIndex: number = array.length;
        let randomIndex: number;

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
}