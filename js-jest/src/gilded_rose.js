const UpdaterFactory = require('./UpdaterFactory');
const AgedBrieUpdater = require('./AgedBrieUpdater');
const BackstagePassUpdater = require('./BackstagePassUpdater');

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      UpdaterFactory.make(item).update();
    });

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
