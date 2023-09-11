import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaComponentView {

    constructor(model) {
        this.model = model;
        this.registerViewConstructors();
        this.createNativeElement();
        this.applyLayout();
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

    applyLayout() {
        var layout = this.getModel().getLayout();

        if (layout.getDirectionRow()) {
            this.getNativeElement().style.flexDirection = "row";
        } else if (layout.getDirectionColumn()) {
            this.getNativeElement().style.flexDirection = "column";
        }

        if (layout.getJustifyContentsLeft()) {
            this.getNativeElement().style.justifyContent = "left";
        } else if (layout.getJustifyContentsRight()) {
            this.getNativeElement().style.justifyContent = "right";
        } else if (layout.getJustifyContentsCenter()) {
            this.getNativeElement().style.justifyContent = "center";
        }
   
        if(layout.getAlignContentsCenter()) {
            this.getNativeElement().style.alignItems = "center";
        }

        if(layout.getGrow()) {
            this.getNativeElement().style.flexGrow = 1;
        }
    }

}
