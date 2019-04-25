const RegularItemUpdater = require('./RegularItemUpdater');
const AgedBrieUpdater = require('./AgedBrieUpdater');
const BackstagePassUpdater = require('./BackstagePassUpdater');
const SulfurasUpdater = require('./SulfurasUpdater');
const ConjuredUpdater = require('./ConjuredUpdater');


class UpdaterFactory {
  static make(item) {
    const notAgedBrie = item.name != 'Aged Brie';
    const backstagePass = item.name == 'Backstage passes to a TAFKAL80ETC concert';
    const isAgedBrie = !notAgedBrie;


    if (isAgedBrie) {
      return new AgedBrieUpdater(item);
    }

    if (backstagePass) {
      return new BackstagePassUpdater(item);
    }

    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      return new SulfurasUpdater(item);
    }

    if (item.name === 'Conjured') {
      return new ConjuredUpdater(item);
    }

    return new RegularItemUpdater(item);
  }
}

module.exports = UpdaterFactory;