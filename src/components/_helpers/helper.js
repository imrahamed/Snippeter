export const removeExtra = (text, count = 10) => {
    if (text.length <= count) {
        return text;
    }
    return text.substring(0, count) + "...";
}


export const getUnique = (arr, comp) => {
    const unique = arr.map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
}
