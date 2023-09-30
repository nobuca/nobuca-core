//import NobucaFactory from "../factory/NobucaFactory.js";
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

    createNewViewForModel(model) {
        var view = NobucaFactory.createNewViewForModel(model);
        model.view = view;
        return view;
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
}
