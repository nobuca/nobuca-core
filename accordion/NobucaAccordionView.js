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

        if(sectionModel.getExpanded()) {
            divSection.classList.add("expanded");
        }

        sectionModel.divSection = divSection;

        this.createSectionHeader(divSection);
        this.createSectionBody(divSection);

        this.updateSection(sectionModel);
    }

    createSectionHeader(divSection) {

        var divSectionHeader = document.createElement("div");
        divSectionHeader.className = "NobucaAccordionSectionHeader";
        divSection.appendChild(divSectionHeader);

        divSection.sectionModel.divSectionHeader = divSectionHeader;

        var divSectionHeaderButton = document.createElement("div");
        divSectionHeaderButton.className = "NobucaAccordionSectionHeaderButton";
        divSectionHeader.appendChild(divSectionHeaderButton);

        divSectionHeader.divSectionHeaderButton = divSectionHeaderButton;

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

        if (this.getModel().getDraggableSections()) {
            var imgSectionHeaderDragger = document.createElement("img");
            imgSectionHeaderDragger.className = "NobucaAccordionSectionHeaderDraggerImg";
            imgSectionHeaderDragger.src = "./user-interface/icons/icon-dragger.svg";
            divSectionHeaderDragger.appendChild(imgSectionHeaderDragger);
        }

        divSectionHeader.addEventListener("click", () => {
            divSection.sectionModel.setExpanded(!divSection.sectionModel.getExpanded());
            this.updateSection(divSection.sectionModel);
        });

        return divSectionHeader;
    }

    createSectionHeaderComponents(sectionModel) {
        var divSectionHeaderComponents = document.createElement("div");
        divSectionHeaderComponents.className = "NobucaAccordionSectionHeaderComponents";

        if(sectionModel.getHeaderComponents().length == 0) {
            divSectionHeaderComponents.style.display = "none";
        }

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
            sectionModel.divSection.classList.add("expanded");
        } else {
            sectionModel.divSection.classList.remove("expanded");
        }
    }
}