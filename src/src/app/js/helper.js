export const isPrevented = (element, classesToPrevent) => {
    let currentElem = element;
    let isParent = false;
    while (currentElem) {
        const hasClass = Array.from(currentElem.classList).some((cls) => classesToPrevent.includes(cls));
        if (hasClass) {
            isParent = true;
            currentElem = undefined;
        } else {
            currentElem = currentElem.parentElement;
        }
    }
    return isParent;
}