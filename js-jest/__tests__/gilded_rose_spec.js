var { Shop, Item } = require('../src/gilded_rose.js');
describe("Gilded Rose", function () {

  it("should foo", function () {
    let count = 0;
    const gildedRose = new Shop([
      new Item("foo", 25, 25),
      new Item("foo", 10, 25),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 25, 25),
      new Item("Aged Brie", 25, 25),
      new Item("Aged Brie", 25, 10),
    ]);
    while (count <= 50) {
      count++;
      const items = gildedRose.updateQuality();
      expect(items).toMatchSnapshot();
    }
  });

  it('handles no items', () => {
    const gildedRose = new Shop();
    expect(gildedRose.items.length).toEqual(0)
  });

  it('degrades conjured items twice as fast as regular items', () => {
    const conjured = new Item('Conjured', 10, 25)
    const gildedRose = new Shop([conjured]);
    gildedRose.updateQuality();
    expect(conjured.quality).toBe(23);
  })

  it('degrades conjured items twice as fast as regular items', () => {
    const conjured = new Item('Conjured', -1, 25)
    const gildedRose = new Shop([conjured]);
    gildedRose.updateQuality();
    expect(conjured.quality).toBe(21);
  })

  it.skip('degrades conjured items twice as fast as regular items', () => {
    const conjured = new Item('Conjured', -1, 3)
    const gildedRose = new Shop([conjured]);
    gildedRose.updateQuality();
    expect(conjured.quality).toBe(0);
  })
});
