namespace game.utils.jsonfile {
    export async function getData(path: string) {
        let result = {};

        await fetch(path)
            .then((response) => response.json())
            .then((data) => {
                result = data;
            });

        return (result as any);
    }
}