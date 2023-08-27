import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaFieldsetView {

    constructor(fieldsetModel) {
        this.fieldsetModel = fieldsetModel;
        this.nativeElement = this.createFieldset();
        this.legend = this.createLegend();
        this.listenFieldsetModelEvents();
    }

    getFieldsetModel() {
        return this.fieldsetModel;
    }

    getNativeElement() {
        return this.nativeElement;
    }

    createFieldset() {
        let fieldset = document.createElement('fieldset');
        fieldset.className = 'NobucaFieldset';
        fieldset.style.flexGrow = 1;
        fieldset.style.flexDirection = 'column';
        return fieldset;
    }

    createLegend() {
        let legend = document.createElement('legend');
        this.nativeElement.appendChild(legend);
        legend.className = 'NobucaFieldsetLegend';
        if (this.getFieldsetModel().getRadioName() != null && this.getFieldsetModel().getRadioValue() != null) {
            let radio = document.createElement('input');
            legend.appendChild(radio);
            radio.className = 'NobucaFieldsetLegendRadio';
            radio.type = 'radio';
            radio.name = this.getFieldsetModel().getRadioName();
            radio.value = this.getFieldsetModel().getRadioValue();
            radio.checked = this.getFieldsetModel().getRadioChecked();
            radio.addEventListener('change', () => {
                if (this.checked) {
                    this.getFieldsetModel().checkRadio();
                } else {
                    this.getFieldsetModel().uncheckRadio();
                }
            });
            this.radio = radio;
        }
        let divLegendText = document.createElement('div');
        legend.appendChild(divLegendText);
        divLegendText.className = 'NobucaFieldsetLegendText';
        divLegendText.innerHTML = this.getFieldsetModel().getText();
        return legend;
    }

    addChild(childView) {
        this.nativeElement.appendChild(childView.nativeElement);
    }

    checkRadio() {
        this.radio.checked = true;
    }

    uncheckRadio() {
        this.radio.checked = false;
    }

    addChild(view) {
        this.nativeElement.appendChild(view.nativeElement);
    }

    listenFieldsetModelEvents() {

        this.getFieldsetModel()
            .getAddChildEventEmitter()
            .subscribe((childModel) => {
                console.log(
                    "Added child model [" + childModel + "] to fieldset model [" + this + "]"
                );
                let childView = NobucaFactory.createNewViewForModel(childModel);
                this.addChild(childView);
            });

        this.getFieldsetModel()
            .getRadioCheckEventListener()
            .subscribe(() => {
                this.radio.checked = true;
            });

        this.getFieldsetModel()
            .getRadioUncheckEventListener()
            .subscribe(() => {
                this.radio.checked = false;
            });
    }
}