import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaComponentView {

    constructor(model) {
        this.model = model;
        this.registerViewConstructors();
        this.createNativeElement();
        this.listenModel();
    }

    registerViewConstructors() {

    }

    registerViewConstructorForModelClassName(modelClassName, viewConstructor) {
        NobucaFactory.registerViewConstructorForModelClassName(modelClassName, viewConstructor);
    }

    createNewViewForModel(model) {
        return NobucaFactory.createNewViewForModel(model);
    }

    getModel() {
        return this.model;
    }

    createNativeElement() {

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



}
