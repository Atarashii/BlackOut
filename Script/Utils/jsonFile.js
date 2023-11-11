export async function get(path) {
    let result = {};
    await fetch(path)
    .then((response) => response.json())
    .then((data) => {
        result = data;
    });

    return result;
}