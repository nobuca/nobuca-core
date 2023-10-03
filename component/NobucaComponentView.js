import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaLayoutView from "../layout/NobucaLayoutView.js";

export default class NobucaComponentView {

    constructor(model) {
        this.model = model;
        this.registerCustomViewConstructors();
        this.registerDefaultViewConstructors();
        this.createNativeElement();
        this.applyLayout();
        this.listenModel();
    }

    registerCustomViewConstructors() {
    }

    registerDefaultViewConstructors() {
    }

    createEventEmitter() {
        return new NobucaEventEmitter();
    }

    getModel() {
        return this.model;
    }

    getClassName() {
        return "NobucaComponent";
    }

    createNativeElement() {
        var div = document.createElement("div");
        div.className = this.getClassName();
        this.setNativeElement(div);
        return div;
    }

    setNativeElement(nativeElement) {
        this.nativeElement = nativeElement;
    }

    getNativeElement() {
        return this.nativeElement;
    }

    listenModel() {

    }

    updateContentsPositionAndSize() {
    }

    setParent(parent) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }

    applyLayout() {
        NobucaLayoutView.applyLayout(this);
    }

    getAbsoluteTop(element) {
        if (element.offsetParent != null) return element.offsetTop + this.getAbsoluteTop(element.offsetParent);
        return element.offsetTop;
    }

    getAbsoluteLeft(element) {
        if (element.offsetParent != null) return element.offsetLeft + this.getAbsoluteLeft(element.offsetParent);
        return element.offsetLeft;
    }

    removeChildren(parent) {
        while(parent.childNodes.length>0) {
            parent.removeChild(parent.childNodes[0]);
        }
    }

    isEqualOrDescendant(descendant, ancestor) {
        if (descendant == null) return false;
        if (descendant == ancestor) return true;
        return this.isEqualOrDescendant(descendant.parentNode, ancestor);
    }
}
