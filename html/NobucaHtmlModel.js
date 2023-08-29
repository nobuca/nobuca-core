import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaHtmlModel {

    constructor(html) {
        this.html = html;
        this.htmlChangeEventEmitter = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaHtmlModel";
    }

    getHtml() {
        return this.html;
    }

    getHtmlChangeEventEmitter() {
        return this.htmlChangeEventEmitter;
    }

    setHtml(html) {
        this.html = html;
        this.getHtmlChangeEventEmitter().emit();
    }

}