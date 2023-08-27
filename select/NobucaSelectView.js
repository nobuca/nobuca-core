export default class NobucaSelectView {

    constructor(selectModel) {
        this.selectModel = selectModel;
        this.nativeElement = this.createSelect();
        this.updateView();
        this.listenSelectModelEvents();
    }

    getSelectModel() {
        return this.selectModel;
    }

    createSelect() {

        let select = document.createElement('select');
        select.className = 'NobucaSelect';

        select.addEventListener('focus', event => {
            this.getSelectModel().getFocusEventEmitter().emit(this);
        });

        select.addEventListener('change', event => {
            this.getSelectModel().setValue(this.getValue());
        });

        return select;
    }

    addOption(hiddenValue, visibleValue) {
        let option = document.createElement('option');
        this.nativeElement.appendChild(option);
        option.hiddenValue = hiddenValue;
        option.innerHTML = visibleValue;
    }

    getValue() {
        if (this.nativeElement.selectedOptions.length === 0) return null;
        return this.nativeElement.selectedOptions[0].hiddenValue;
    }

    setValue(value) {
        this.nativeElement.value = value;
    }

    focus() {
        this.nativeElement.focus();
    }

    enable() {
        this.enabled = true;
        this.updateView();
    }

    disable() {
        this.enabled = false;
        this.updateView();
    }

    updateView() {
        if (this.getSelectModel().getEnabled()) {
            this.nativeElement.disabled = false;
            this.nativeElement.classList.remove('disabled');
            this.nativeElement.classList.add('enabled');
        } else {
            this.nativeElement.disabled = true;
            this.nativeElement.classList.remove('enabled');
            this.nativeElement.classList.add('disabled');
        }
    }

    listenSelectModelEvents() {

        this.getSelectModel()
            .getAddOptionEventEmitter()
            .subscribe((optionModel) => {
                this.addOption(optionModel.getHiddenValue(), optionModel.getVisibleValue());
            });

        this.getSelectModel()
            .getFocusEventEmitter()
            .subscribe(() => {
                this.nativeElement.focus();
            });

        this.getSelectModel()
            .getEnabledChangedEventEmitter()
            .subscribe(() => {
                this.updateView();
            });
    }
}