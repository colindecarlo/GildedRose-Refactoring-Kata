const AbstractUpdater = require('./AbstractUpdater');

class ConjuredUpdater extends AbstractUpdater {
  update() {
    this.decreaseQuality(this.item);
    this.decreaseSellIn(this.item);
    this.handleSellInLessThanZero(this.item);
  }

  handleSellInLessThanZero(item) {
    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  decreaseQuality(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 2;
    }
  }
}



module.exports = ConjuredUpdater;