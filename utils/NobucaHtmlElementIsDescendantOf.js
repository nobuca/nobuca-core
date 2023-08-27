
export default class NobucaHtmlElementIsDescendantOf {

    static check(element, parent) {
        if (element.parentNode === parent) return true;
        if (element.parentNode == null) return false;
        return NobucaHtmlElementIsDescendantOf.check(element.parentNode, parent);
    }
}