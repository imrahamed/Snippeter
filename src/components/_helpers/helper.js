export const removeExtra = (text, count = 10) => {
    if (text.length <= count) {
        return text;
    }
    return text.substring(0, count) + "...";
}