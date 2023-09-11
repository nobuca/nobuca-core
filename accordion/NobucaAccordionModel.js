import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";


export default class NobucaAccordionModel extends NobucaComponentModel {

    constructor() {
        super();
        this.sections = [];
    }

    getClassName() {
        return "NobucaAccordionModel";
    }
    getSections() {
        return this.sections;
    }

    addSection(section) {
        this.getSections().push(section);
        return section;
    }
}