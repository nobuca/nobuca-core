import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";


export default class NobucaAccordionView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "NobucaAccordion";
        this.setNativeElement(div);
        this.createSections();
    }

    createSections() {

        this.divSections = document.createElement("div");
        this.divSections.className = "NobucaAccordionSections";
        this.getNativeElement().appendChild(this.divSections);

        this.getModel().getSections().forEach(sectionModel => this.createSection(sectionModel));
    }

    getDivSections() {
        return this.divSections;
    }

    createSection(sectionModel) {
        var divSection = document.createElement("div");
        divSection.className = "NobucaAccordionSection";
        this.getDivSections().appendChild(divSection);

        divSection.sectionModel = sectionModel;

        this.createSectionHeader(divSection);
        this.createSectionBody(divSection);

        this.updateSection(sectionModel);
    }

    createSectionHeader(divSection) {

        var divSectionHeader = document.createElement("div");
        divSectionHeader.className = "NobucaAccordionSectionHeader";
        divSection.appendChild(divSectionHeader);

        divSection.sectionModel.divSectionHeader = divSectionHeader;

        var divSectionHeaderButtonContainer = document.createElement("div");
        divSectionHeaderButtonContainer.className = "NobucaAccordionSectionHeaderButtonContainer";
        divSectionHeader.appendChild(divSectionHeaderButtonContainer);

        var imgSectionHeaderButton = document.createElement("img");
        imgSectionHeaderButton.className = "NobucaAccordionSectionHeaderButton";
        imgSectionHeaderButton.src = "./user-interface/icons/icon-chevron-down.svg";
        divSectionHeaderButtonContainer.appendChild(imgSectionHeaderButton);

        divSectionHeader.imgSectionHeaderButton = imgSectionHeaderButton;

        divSectionHeader.appendChild(this.createSectionHeaderComponents(divSection.sectionModel));

        if (divSection.sectionModel.getText() != null) {
            var divSectionHeaderTitle = document.createElement("div");
            divSectionHeaderTitle.className = "NobucaAccordionSectionHeaderTitle";
            divSectionHeaderTitle.innerHTML = divSection.sectionModel.getText();
            divSectionHeader.appendChild(divSectionHeaderTitle);
        }

        var divSectionHeaderDragger = document.createElement("div");
        divSectionHeaderDragger.className = "NobucaAccordionSectionHeaderDragger";
        divSectionHeader.appendChild(divSectionHeaderDragger);

        var imgSectionHeaderDragger = document.createElement("img");
        imgSectionHeaderDragger.className = "NobucaAccordionSectionHeaderDraggerImg";
        imgSectionHeaderDragger.src = "./user-interface/icons/icon-dragger.svg";
        divSectionHeaderDragger.appendChild(imgSectionHeaderDragger);

        divSectionHeader.addEventListener("click", () => {
            divSection.sectionModel.setExpanded(!divSection.sectionModel.getExpanded());
            this.updateSection(divSection.sectionModel);
        });

        return divSectionHeader;
    }

    createSectionHeaderComponents(sectionModel) {
        var divSectionHeaderComponents = document.createElement("div");
        divSectionHeaderComponents.className = "NobucaAccordionSectionHeaderComponents";

        sectionModel.getHeaderComponents().forEach(sectionHeaderComponentModel => {
            divSectionHeaderComponents.appendChild(this.createSectionHeaderComponent(sectionHeaderComponentModel));
        });

        return divSectionHeaderComponents;
    }

    createSectionHeaderComponent(sectionHeaderComponentModel) {
        var divSectionHeaderComponent = document.createElement("div");
        divSectionHeaderComponent.className = "NobucaAccordionSectionHeaderComponent";
        var componentView = NobucaFactory.createNewViewForModel(sectionHeaderComponentModel);
        divSectionHeaderComponent.appendChild(componentView.getNativeElement());
        return divSectionHeaderComponent;
    }

    createSectionBody(divSection) {
        var divSectionBody = document.createElement("div");
        divSectionBody.className = "NobucaAccordionSectionBody";
        divSection.appendChild(divSectionBody);

        divSection.sectionModel.divSectionBody = divSectionBody;

        var sectionView = NobucaFactory.createNewViewForModel(divSection.sectionModel);
        divSectionBody.appendChild(sectionView.getNativeElement());

        return divSectionBody;
    }

    updateSection(sectionModel) {
        if (sectionModel.getExpanded()) {
            sectionModel.divSectionHeader.imgSectionHeaderButton.src = "./user-interface/icons/icon-chevron-down.svg";
            sectionModel.divSectionBody.style.display = "";
        } else {
            sectionModel.divSectionHeader.imgSectionHeaderButton.src = "./user-interface/icons/icon-chevron-right.svg";
            sectionModel.divSectionBody.style.display = "none";
        }
    }
}