const AbstractUpdater = require('./AbstractUpdater');

class AgedBrieUpdater extends AbstractUpdater {
  update() {
    this.increaseQuality(this.item)
    this.decreaseSellIn(this.item);
    this.handleSellInLessThanZero(this.item);
  }

  handleSellInLessThanZero(item) {
    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }
}

module.exports = AgedBrieUpdater;