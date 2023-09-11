import NobucaPanelModel from "../../../../../nobuca-core/panel/NobucaPanelModel.js";


export default class NobucaAccordionSectionModel extends NobucaPanelModel {

    constructor(text) {
        super();
        this.text = text;
        this.expanded = false;
        this.headerComponents = [];
    }

    getText() {
        return this.text;
    }

    setText(text) {
        this.text = text;
    }

    getExpanded() {
        return this.expanded;
    }

    setExpanded(expanded) {
        this.expanded = expanded;
    }

    setShowCheckbox(showCheckbox) {
        this.showCheckbox = showCheckbox;
    }

    getShowCheckbox() {
        return this.showCheckbox;
    }

    getHeaderComponents() {
        return this.headerComponents;
    }

    addHeaderComponent(headerComponent) {
        this.getHeaderComponents().push(headerComponent);
        return headerComponent;
    }

}