export default class NobucaTextView {

    constructor(textAreaModel) {
        this.textAreaModel = textAreaModel;
        this.nativeElement = this.createInput();
        this.updateView();
        this.listenTextModelEvents();
    }

    getTextAreaModel() {
        return this.textAreaModel;
    }

    createInput() {
        let textarea = document.createElement('textarea');
        textarea.className = 'NobucaTextArea';

        textarea.addEventListener('focus', event => {
            this.focus();
        });

        textarea.addEventListener('input', event => {
            this.getTextAreaModel().setValue(textarea.value);
        });

        return textarea;
    }

    getValue() {
        return this.nativeElement.value;
    }

    setValue(value) {
        this.nativeElement.value = value;
    }

    focus() {
        this.nativeElement.focus();
    }

    updateView() {
        if (this.getTextAreaModel().getEnabled()) {
            this.nativeElement.removeAttribute('readonly');
            this.nativeElement.classList.remove('disabled');
            this.nativeElement.classList.add('enabled');
        } else {
            this.nativeElement.setAttribute('readonly', true);
            this.nativeElement.classList.remove('enabled');
            this.nativeElement.classList.add('disabled');
        }
    }

    disable() {
        this.nativeElement.setAttribute('readonly', '');
    }

    listenTextModelEvents() {

        this.getTextAreaModel()
            .getFocusEventEmitter()
            .subscribe(() => {
                this.nativeElement.focus();
            });

        this.getTextAreaModel()
            .getValueChangeEventEmitter()
            .subscribe(value => {
                this.setValue(value);
            });

        this.getTextAreaModel()
            .getEnabledChangedEventEmitter()
            .subscribe(() => {
                this.updateView();
            });

        this.getTextAreaModel()
            .getSelectEventEmitter()
            .subscribe(() => {
                this.nativeElement.select();
            });
    }
}