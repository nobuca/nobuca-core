
export default class NobucaHtmlClassName {

    static addClassName(element, className) {
        if (element.className === className) return;
        if (element.className.startsWith(className + ' ')) return;
        if (element.className.endsWith(' ' + className)) return;
        if (element.className.includes(' ' + className + ' ')) return;
        element.className += ' ' + className;
    }

    static removeClassName(element, className) {

        if (element.className.startsWith(className + ' ')) {
            element.className = element.className.replace(className + ' ', ' ').trim();
            return;
        }
        if (element.className.endsWith(' ' + className)) {
            element.className = element.className.replace(' ' + className, ' ').trim();
            return;
        }
        if (element.className.includes(' ' + className + ' ')) {
            element.className = element.className.replace(' ' + className + ' ', ' ').trim();
            return;
        }
        if (element.className === className) {
            element.className = '';
            return;
        }
    }
}