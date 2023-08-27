export default class NobucaCardsModel {

    constructor() {
        this.cards = [];
    }

    getCards() {
        return this.cards;
    }

    addCard(cardModel) {
        this.cards.push(cardModel);
    }
}