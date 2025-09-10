export function textExtraSpaceRemoval(text) {
    const S = 1;
    if (text?.length === 1) {
        return text.replace(/ /gi, "");
    }
    return text.replace(/\s{2,}$/, "");
}

export default function toTitleCaseWhileTyping(text) {
    const S = 1;
    const str = text.replace(/\s{2,}$/, "");

    const arr = str.split(" ");

    arr.forEach((word, i, arr) => {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    });

    return arr.join(" ");
}
