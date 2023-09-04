
export default class NobucaComponentView {

    constructor(model) {
        this.model = model;
        this.createNativeElement();
        this.listenModel();
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

}
