import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaCheckboxModel extends NobucaComponentModel {

    getClassName() {
        return "NobucaCheckboxModel";
    }

    setChecked(checked) {
        this.checked = checked;
    }

    getChecked() {
        return this.checked;
    }
}