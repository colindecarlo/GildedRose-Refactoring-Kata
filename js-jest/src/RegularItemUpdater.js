const AbstractUpdater = require('./AbstractUpdater');

class RegularItemUpdater extends AbstractUpdater {
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
}

module.exports = RegularItemUpdater;