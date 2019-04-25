class AbstractUpdater {
  constructor(item) {
    this.item = item;
  }

  update() {
    throw new Error('update is not implemented')
  }

  handleSellInLessThanZero() {
    throw new Error('handleSellInLessThanZero is not implemented')
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  decreaseQuality(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  decreaseSellIn(item) {
    item.sellIn = item.sellIn - 1
  }
}

module.exports = AbstractUpdater