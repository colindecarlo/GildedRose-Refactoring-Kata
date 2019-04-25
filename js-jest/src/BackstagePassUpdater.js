const AbstractUpdater = require('./AbstractUpdater');

class BackstagePassUpdater extends AbstractUpdater {
  update() {
    this.updateBackstagePassQuality(this.item)
    this.decreaseSellIn(this.item);
    this.handleSellInLessThanZero(this.item);
  }

  handleSellInLessThanZero(item) {
    if (item.sellIn < 0) {
        item.quality = 0;
      }
  }

  updateBackstagePassQuality(item) {
    this.increaseQuality(item)
    if (item.sellIn < 11) {
      this.increaseQuality(item)
    }
    if (item.sellIn < 6) {
      this.increaseQuality(item)
    }
  }
}

module.exports = BackstagePassUpdater;