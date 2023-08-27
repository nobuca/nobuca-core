import NobucaPosition from "../size-position/NobucaPosition.js";
import NobucaSize from "../size-position/NobucaSize.js";

export default class NobucaPositionAndSizeModel {
  constructor() {
    this.position = new NobucaPosition();
    this.size = new NobucaSize();
  }

  getPosition() {
    return this.position;
  }

  getSize() {
    return this.size;
  }
}
