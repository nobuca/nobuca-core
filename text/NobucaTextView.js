export default class NobucaTextView {

    constructor(textModel) {
        this.textModel = textModel;
        this.nativeElement = this.createInput();
        this.updateView();
        this.listenTextModelEvents();
    }

    getTextModel() {
        return this.textModel;
    }

    createInput() {
        let input = document.createElement('input');
        input.className = 'NobucaText';
        input.type = 'text';
        input.value = this.getTextModel().getValue();

        if (this.getTextModel().getPassword()) {
            input.type = 'password';
        }

        if (this.getTextModel().getFocus()) {
            setTimeout(() => {
                input.focus();
            });
        }

        input.addEventListener('focus', event => {
            this.focus();
        });

        input.addEventListener('input', event => {
            this.getTextModel().setValue(input.value);
        });

        return input;
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
        if (this.getTextModel().getEnabled()) {
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
        this.getTextModel()
            .getFocusEventEmitter()
            .subscribe(() => {
                this.nativeElement.focus();
            });

        this.getTextModel()
            .getValueChangedEventEmitter()
            .subscribe((value) => {
                this.setValue(value);
            });

        this.getTextModel()
            .getEnabledChangedEventEmitter()
            .subscribe(() => {
                this.updateView();
            });
    }
}