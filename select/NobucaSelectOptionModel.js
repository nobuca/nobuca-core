export default class NobucaSelectOptionModel {

    constructor(hiddenValue, visibleValue) {
        this.hiddenValue = hiddenValue;
        this.visibleValue = visibleValue;
    }

    getHiddenValue() {
        return this.hiddenValue;
    }

    getVisibleValue() {
        return this.visibleValue;
    }
}