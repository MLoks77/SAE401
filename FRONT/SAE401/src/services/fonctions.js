// https://stackoverflow.com/questions/36996698/how-do-i-lowercase-any-string-and-then-capitalize-only-the-first-letter-of-the-w
export function capitalfirstletter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}