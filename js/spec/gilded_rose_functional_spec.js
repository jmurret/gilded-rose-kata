describe("Gilded Rose", function() {
  describe('Normal Items', () => {
    describe('When sell by date has not passed', () => {
      it("Quality should be descreased by one when not already 0", function() {
        const localItems = updateQuality([new Item("Normal Item", 10, 10)]);
        expect(localItems[0].quality).toEqual(9);
      });
      it("Quality should not go below zero", function() {
        const localItems = updateQuality([new Item("Normal Item", 10, 0)]);
        expect(localItems[0].quality).toEqual(0);
      });
      it("Sell-in should be descreased by one", function() {
        const localItems = updateQuality([
          new Item("Normal Item", 10, 10),
          new Item("Normal Item", 10, 0)
        ]);
        expect(localItems[0].sell_in).toEqual(9);
        expect(localItems[1].sell_in).toEqual(9);
      });
    });
    describe('When sell by date has passed', () => {
      it("Quality should be descreased by two when not already 0 or 1", function() {
        const localItems = updateQuality([new Item("Normal Item", 0, 10)]);
        expect(localItems[0].quality).toEqual(8);
      });
      it("Quality should be descreased to zero when one", function() {
        const localItems = updateQuality([new Item("Normal Item", 0, 1)]);
        expect(localItems[0].quality).toEqual(0);
      });
      it("Quality should not go below zero", function() {
        const localItems = updateQuality([new Item("Normal Item", 0, 0)]);
        expect(localItems[0].quality).toEqual(0);
      });
      it("Sell-in should still be descreased by one", function() {
        const localItems = updateQuality([
          new Item("Normal Item", 0, 10),
          new Item("Normal Item", 0, 0)
        ]);
        expect(localItems[0].sell_in).toEqual(-1);
        expect(localItems[1].sell_in).toEqual(-1);
      });
    });
  });
  describe('Aged Brie', () => {
    describe('When sell by date has not passed', () => {
      it("Quality should be increased by one", function() {
        const localItems = updateQuality([new Item("Aged Brie", 10, 10)]);
        expect(localItems[0].quality).toEqual(11);
      });
      it("Quality should not go above 50", function() {
        const localItems = updateQuality([new Item("Aged Brie", 10, 50)]);
        expect(localItems[0].quality).toEqual(50);
      });
      it("Sell-in should be descreased by one", function() {
        const localItems = updateQuality([new Item("Aged Brie", 10, 10)]);
        expect(localItems[0].sell_in).toEqual(9);
      });
    });
    describe('When sell by date has passed', () => {
      it("Quality should still increase by two", function() {
        /* Possible bug or incomplete documentation:
          "Aged Brie" actually increases in quality the older it gets, but not that it also doubles.
          Going to assume this has been working satisfactorily and it should increase by two.
        */
        const localItems = updateQuality([new Item("Aged Brie", 0, 10)]);
        expect(localItems[0].quality).toEqual(12);
      });
      it("Quality should still not go above 50", function() {
        const localItems = updateQuality([new Item("Aged Brie", 0, 50)]);
        expect(localItems[0].quality).toEqual(50);
      });
      it("Sell-in should still be descreased by one", function() {
        const localItems = updateQuality([
          new Item("Aged Brie", 0, 10),
          new Item("Aged Brie", 0, 0)
        ]);
        expect(localItems[0].sell_in).toEqual(-1);
        expect(localItems[1].sell_in).toEqual(-1);

      });
    });
  });
  describe('Backstage passes', () => {
    describe('When sell by date has not passed', () => {
      describe('and there are greater than 10 days before concert', () => {
        it("Quality should be increased by one", function() {
          const localItems = updateQuality([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)]);
          expect(localItems[0].quality).toEqual(11);
        });
        it("Quality should not go above 50", function() {
          const localItems = updateQuality([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 50)]);
          expect(localItems[0].quality).toEqual(50);
        });
        it("Sell-in should be descreased by one", function() {
          const localItems = updateQuality([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)]);
          expect(localItems[0].sell_in).toEqual(10);
        });
      });
      describe('and there are 6 to 10 days before concert', () => {
        it("Quality should be increased by two", function() {
          const localItems = updateQuality([
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
            new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)
          ]);
          expect(localItems[0].quality).toEqual(12);
          expect(localItems[1].quality).toEqual(12);
        });
        it("Quality should not go above 50", function() {
          const localItems = updateQuality([
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50),
            new Item("Backstage passes to a TAFKAL80ETC concert", 6, 50)
          ]);
          expect(localItems[0].quality).toEqual(50);
          expect(localItems[1].quality).toEqual(50);
        });
        it("Sell-in should be descreased by one", function() {
          const localItems = updateQuality([
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
            new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)
          ]);
          expect(localItems[0].sell_in).toEqual(9);
          expect(localItems[1].sell_in).toEqual(5);
        });
      });
      describe('and there are 1 to 5 days before concert', () => {
        it("Quality should be increased by three", function() {
          const localItems = updateQuality([
            new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
          ]);
          expect(localItems[0].quality).toEqual(13);
          expect(localItems[1].quality).toEqual(13);
        });
        it("Quality should not go above 50", function() {
          const localItems = updateQuality([
            new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50),
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50)
          ]);
          expect(localItems[0].quality).toEqual(50);
          expect(localItems[1].quality).toEqual(50);
        });
        it("Sell-in should be descreased by one", function() {
          const localItems = updateQuality([
            new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
          ]);
          expect(localItems[0].sell_in).toEqual(0);
          expect(localItems[1].sell_in).toEqual(4);
        });
      });
    });
    describe('When sell by date has passed', () => {
      it("Quality should equal zero", function() {
        const localItems = updateQuality([
          new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
          new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10)
        ]);
        expect(localItems[0].quality).toEqual(0);
        expect(localItems[1].quality).toEqual(0);
      });
      it("Sell-in should still be descreased by one", function() {
        const localItems = updateQuality([
          new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
          new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10)
        ]);
        expect(localItems[0].sell_in).toEqual(-1);
        expect(localItems[1].sell_in).toEqual(-2);
      });
    });
  });
  describe('Sulfuras', () => {
    describe('When sell by date has not passed', () => {
      it("Quality is 80 and it never alters", function() {
        const localItems = updateQuality([new Item("Sulfuras, Hand of Ragnaros", 0, 10)]);
        expect(localItems[0].quality).toEqual(80);
      });
      it("Sell-in should not change", function() {
        const localItems = updateQuality([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
        expect(localItems[0].sell_in).toEqual(10);
      });
    });
    describe('When sell by date has passed', () => {
      it("Quality is 80 and it never alters", function() {
        const localItems = updateQuality([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
        expect(localItems[0].quality).toEqual(80);
      });
      it("Sell-in should not change", function() {
        const localItems = updateQuality([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
        expect(localItems[0].sell_in).toEqual(0);
      });
    });
  });
  describe('Conjured Items', () => {
    describe('When sell by date has not passed', () => {
      it("Quality should be descreased by two when not already 0", function() {
        const localItems = updateQuality([new Item("Conjured", 10, 10)]);
        expect(localItems[0].quality).toEqual(8);
      });
      it("Quality should not go below zero", function() {
        const localItems = updateQuality([new Item("Conjured", 10, 0)]);
        expect(localItems[0].quality).toEqual(0);
      });
      it("Sell-in should be descreased by one", function() {
        const localItems = updateQuality([
          new Item("Conjured", 10, 10),
          new Item("Conjured", 10, 0)
        ]);
        expect(localItems[0].sell_in).toEqual(9);
        expect(localItems[1].sell_in).toEqual(9);
      });
    });
    describe('When sell by date has passed', () => {
      it("Quality should be descreased by four when not already 0", function() {
        const localItems = updateQuality([new Item("Conjured", 0, 10)]);
        expect(localItems[0].quality).toEqual(6);
      });
      it("Quality should not go below zero", function() {
        const localItems = updateQuality([new Item("Conjured", 0, 0)]);
        expect(localItems[0].quality).toEqual(0);
      });
      it("Sell-in should still be descreased by one", function() {
        const localItems = updateQuality([
          new Item("Conjured", 0, 10),
          new Item("Conjured", 0, 0)
        ]);
        expect(localItems[0].sell_in).toEqual(-1);
        expect(localItems[1].sell_in).toEqual(-1);
      });
    });
  });
});
