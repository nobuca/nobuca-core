export default class NobucaCardsView {
  constructor(cardsModel) {
    this.cardsModel = cardsModel;
    this.nativeElement = this.createDiv();
    this.createCards();
  }

  getCardsModel() {
    return this.cardsModel;
  }

  createDiv() {
    let div = document.createElement("div");
    div.className = "NobucaCards";
    return div;
  }

  createCards() {
    this.getCardsModel().getCards().forEach((cardModel) => {
      this.nativeElement.appendChild(this.createCard(cardModel));
    });
  }

  createCard(cardModel) {
    let div = document.createElement("div");
    div.className = "NobucaCard";
    return div;
  }
}
