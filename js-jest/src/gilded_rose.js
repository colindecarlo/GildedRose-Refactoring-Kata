class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class RegularItemUpdater {
  constructor(item) {
    this.item = item;
  }

  update() {
    this.decreaseQuality(this.item);
    this.decreaseSellIn(this.item);
    this.handleSellInLessThanZero(true, true, this.item);
  }

  notSulfuras(item) {
    return item.name != 'Sulfuras, Hand of Ragnaros';
  }


  handleSellInLessThanZero(notAgedBrie, notBackstagePass, item) {

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  decreaseQuality(item) {
    if (item.quality > 0 && this.notSulfuras(item)) {
      item.quality = item.quality - 1;
    }
  }

  decreaseSellIn(item) {
    if (this.notSulfuras(item)) {
      item.sellIn = item.sellIn - 1
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      const notAgedBrie = item.name != 'Aged Brie';
      const backstagePass = item.name == 'Backstage passes to a TAFKAL80ETC concert';
      const isAgedBrie = !notAgedBrie;

      if (isAgedBrie) {
        this.updateAgedBrieQuality(item);
      } else if (backstagePass) {
        this.updateBackstagePass(item);
      } else {
        this.updateRegularItem(item);
      }
    })

    return this.items;
  }

  updateRegularItem(item) {
    const updater = new RegularItemUpdater(item);
    updater.update();
  }

  updateBackstagePass(item) {
    this.updateBackstagePassQuality(item)
    this.decreaseSellIn(item);
    this.handleSellInLessThanZero(true, false, item);
  }

  updateAgedBrieQuality(item) {
    this.increaseQuality(item)
    this.decreaseSellIn(item);
    this.handleSellInLessThanZero(false, false, item);
  }

  notSulfuras(item) {
    return item.name != 'Sulfuras, Hand of Ragnaros';
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

  handleSellInLessThanZero(notAgedBrie, notBackstagePass, item) {

    if (item.sellIn < 0) {
      if (notAgedBrie) {
        if (notBackstagePass) {
          this.decreaseQuality(item);
        }
        else {
          item.quality = 0;
        }
      }
      else {
        this.increaseQuality(item);
      }
    }
  }

  decreaseQuality(item) {
    if (item.quality > 0 && this.notSulfuras(item)) {
      item.quality = item.quality - 1;
    }
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  decreaseSellIn(item) {
    if (this.notSulfuras(item)) {
      item.sellIn = item.sellIn - 1
    }
  }
}
module.exports = {
  Item,
  Shop
}
