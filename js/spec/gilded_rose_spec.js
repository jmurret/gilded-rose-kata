describe("Gilded Rose", function() {
  describe('Using Legacy Code', () => {
    describe('Normal Items', () => {
      describe('When sell by date has not passed', () => {
        it("Quality should be descreased by one when not already 0", function() {
          var hasValue = new Item("Normal Item", 10, 10);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(9);
        });
        it("Quality should not go below zero", function() {
          var zeroValue = new Item("Normal Item", 10, 0);
          items = [zeroValue];
          update_quality();
          expect(zeroValue.quality).toEqual(0);
        });
        it("Sell-in should be descreased by one", function() {
          var hasValue = new Item("Normal Item", 10, 10);
          var zeroValue = new Item("Normal Item", 10, 0);
          items = [hasValue, zeroValue];
          update_quality();
          expect(hasValue.sell_in).toEqual(9);
          expect(zeroValue.sell_in).toEqual(9);
        });
      });
      describe('When sell by date has passed', () => {
        it("Quality should be descreased by two when not already 0 or 1", function() {
          var hasValue = new Item("Normal Item", 0, 10);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(8);
        });
        it("Quality should be descreased to zero when one", function() {
          var hasValue = new Item("Normal Item", 0, 1);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(0);
        });
        it("Quality should not go below zero", function() {
          var zeroValue = new Item("Normal Item", 0, 0);
          items = [zeroValue];
          update_quality();
          expect(zeroValue.quality).toEqual(0);
        });
        it("Sell-in should still be descreased by one", function() {
          var hasValue = new Item("Normal Item", 0, 10);
          var zeroValue = new Item("Normal Item", 0, 0);
          items = [hasValue, zeroValue];
          update_quality();
          expect(hasValue.sell_in).toEqual(-1);
          expect(zeroValue.sell_in).toEqual(-1);
        });
      });
    });
    describe('Aged Brie', () => {
      describe('When sell by date has not passed', () => {
        it("Quality should be increased by one", function() {
          var hasValue = new Item("Aged Brie", 10, 10);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(11);
        });
        it("Quality should not go above 50", function() {
          var hasValue = new Item("Aged Brie", 10, 50);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(50);
        });
        it("Sell-in should be descreased by one", function() {
          var hasValue = new Item("Aged Brie", 10, 10);
          items = [hasValue];
          update_quality();
          expect(hasValue.sell_in).toEqual(9);
        });
      });
      describe('When sell by date has passed', () => {
        it("Quality should still increase by two", function() {
          /* Possible bug or incomplete documentation:
            "Aged Brie" actually increases in quality the older it gets, but not that it also doubles.
            Going to assume this has been working satisfactorily and it should increase by two.
          */
          var hasValue = new Item("Aged Brie", 0, 10);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(12);
        });
        it("Quality should still not go above 50", function() {
          var hasValue = new Item("Aged Brie", 0, 50);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(50);
        });
        it("Sell-in should still be descreased by one", function() {
          var hasValue = new Item("Aged Brie", 0, 10);
          var zeroValue = new Item("Aged Brie", 0, 0);
          items = [hasValue, zeroValue];
          update_quality();
          expect(hasValue.sell_in).toEqual(-1);
          expect(zeroValue.sell_in).toEqual(-1);
        });
      });
    });
    describe('Backstage passes', () => {
      describe('When sell by date has not passed', () => {
        describe('and there are greater than 10 days before concert', () => {
          it("Quality should be increased by one", function() {
            var hasValue = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10);
            items = [hasValue];
            update_quality();
            expect(hasValue.quality).toEqual(11);
          });
          it("Quality should not go above 50", function() {
            var hasValue = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 50);
            items = [hasValue];
            update_quality();
            expect(hasValue.quality).toEqual(50);
          });
          it("Sell-in should be descreased by one", function() {
            var hasValue = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10);
            items = [hasValue];
            update_quality();
            expect(hasValue.sell_in).toEqual(10);
          });
        });
        describe('and there are 6 to 10 days before concert', () => {
          it("Quality should be increased by two", function() {
            var tenDays = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10);
            var sixDays = new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10);
            items = [tenDays, sixDays];
            update_quality();
            expect(tenDays.quality).toEqual(12);
            expect(sixDays.quality).toEqual(12);
          });
          it("Quality should not go above 50", function() {
            var tenDays = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50);
            var sixDays = new Item("Backstage passes to a TAFKAL80ETC concert", 6, 50);
            items = [tenDays, sixDays];
            update_quality();
            expect(tenDays.quality).toEqual(50);
            expect(sixDays.quality).toEqual(50);
          });
          it("Sell-in should be descreased by one", function() {
            var tenDays = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10);
            var sixDays = new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10);
            items = [tenDays, sixDays];
            update_quality();
            expect(tenDays.sell_in).toEqual(9);
            expect(sixDays.sell_in).toEqual(5);
          });
        });
        describe('and there are 1 to 5 days before concert', () => {
          it("Quality should be increased by three", function() {
            var oneDay = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10);
            var fiveDays = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10);
            items = [oneDay, fiveDays];
            update_quality();
            expect(oneDay.quality).toEqual(13);
            expect(fiveDays.quality).toEqual(13);
          });
          it("Quality should not go above 50", function() {
            var oneDay = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50);
            var fiveDays = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50);
            items = [oneDay, fiveDays];
            update_quality();
            expect(oneDay.quality).toEqual(50);
            expect(fiveDays.quality).toEqual(50);
          });
          it("Sell-in should be descreased by one", function() {
            var oneDay = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10);
            var fiveDays = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10);
            items = [oneDay, fiveDays];
            update_quality();
            expect(oneDay.sell_in).toEqual(0);
            expect(fiveDays.sell_in).toEqual(4);
          });
        });
      });
      describe('When sell by date has passed', () => {
        it("Quality should equal zero", function() {
          var zeroDays = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10);
          var minusOneDays = new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10);
          items = [zeroDays, minusOneDays];
          update_quality();
          expect(zeroDays.quality).toEqual(0);
          expect(minusOneDays.quality).toEqual(0);
        });
        it("Sell-in should still be descreased by one", function() {
          var zeroDays = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10);
          var minusOneDays = new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10);
          items = [zeroDays, minusOneDays];
          update_quality();
          expect(zeroDays.sell_in).toEqual(-1);
          expect(minusOneDays.sell_in).toEqual(-2);
        });
      });
    });
    describe('Sulfuras', () => {
      describe('When sell by date has not passed', () => {
        it("Quality is 80 and it never alters", function() {
          var hasValue = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(80);
        });
        it("Sell-in should not change", function() {
          var hasValue = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
          items = [hasValue];
          update_quality();
          expect(hasValue.sell_in).toEqual(10);
        });
      });
      describe('When sell by date has passed', () => {
        it("Quality is 80 and it never alters", function() {
          var hasValue = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(80);
        });
        it("Sell-in should not change", function() {
          var hasValue = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
          items = [hasValue];
          update_quality();
          expect(hasValue.sell_in).toEqual(0);
        });
      });
    });
    describe('Conjured Items', () => {
      describe('When sell by date has not passed', () => {
        it("Quality should be descreased by two when not already 0", function() {
          var hasValue = new ConjuredItem("Conjured", 10, 10);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(8);
        });
        it("Quality should not go below zero", function() {
          var zeroValue = new ConjuredItem("Conjured", 10, 0);
          items = [zeroValue];
          update_quality();
          expect(zeroValue.quality).toEqual(0);
        });
        it("Sell-in should be descreased by one", function() {
          var hasValue = new ConjuredItem("Conjured", 10, 10);
          var zeroValue = new ConjuredItem("Conjured", 10, 0);
          items = [hasValue, zeroValue];
          update_quality();
          expect(hasValue.sell_in).toEqual(9);
          expect(zeroValue.sell_in).toEqual(9);
        });
      });
      describe('When sell by date has passed', () => {
        it("Quality should be descreased by four when not already 0", function() {
          var hasValue = new ConjuredItem("Conjured", 0, 10);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(6);
        });
        it("Quality should not go below zero", function() {
          var zeroValue = new ConjuredItem("Conjured", 0, 0);
          items = [zeroValue];
          update_quality();
          expect(zeroValue.quality).toEqual(0);
        });
        it("Sell-in should still be descreased by one", function() {
          var hasValue = new ConjuredItem("Conjured", 0, 10);
          var zeroValue = new ConjuredItem("Conjured", 0, 0);
          items = [hasValue, zeroValue];
          update_quality();
          expect(hasValue.sell_in).toEqual(-1);
          expect(zeroValue.sell_in).toEqual(-1);
        });
      });
    });
  });
  describe('Using All New Item Types', () => {
    describe('Normal Items', () => {
      describe('When sell by date has not passed', () => {
        it("Quality should be descreased by one when not already 0", function() {
          var hasValue = new NormalItem("Normal Item", 10, 10);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.quality).toEqual(9);
        });
        it("Quality should not go below zero", function() {
          var zeroValue = new NormalItem("Normal Item", 10, 0);
          items = [zeroValue];
          update_quality(true);
          expect(zeroValue.quality).toEqual(0);
        });
        it("Sell-in should be descreased by one", function() {
          var hasValue = new NormalItem("Normal Item", 10, 10);
          var zeroValue = new NormalItem("Normal Item", 10, 0);
          items = [hasValue, zeroValue];
          update_quality(true);
          expect(hasValue.sell_in).toEqual(9);
          expect(zeroValue.sell_in).toEqual(9);
        });
      });
      describe('When sell by date has passed', () => {
        it("Quality should be descreased by two when not already 0 or 1", function() {
          var hasValue = new NormalItem("Normal Item", 0, 10);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.quality).toEqual(8);
        });
        it("Quality should be descreased to zero when one", function() {
          var hasValue = new NormalItem("Normal Item", 0, 1);
          items = [hasValue];
          update_quality();
          expect(hasValue.quality).toEqual(0);
        });
        it("Quality should not go below zero", function() {
          var zeroValue = new NormalItem("Normal Item", 0, 0);
          items = [zeroValue];
          update_quality(true);
          expect(zeroValue.quality).toEqual(0);
        });
        it("Sell-in should still be descreased by one", function() {
          var hasValue = new NormalItem("Normal Item", 0, 10);
          var zeroValue = new NormalItem("Normal Item", 0, 0);
          items = [hasValue, zeroValue];
          update_quality(true);
          expect(hasValue.sell_in).toEqual(-1);
          expect(zeroValue.sell_in).toEqual(-1);
        });
      });
    });
    describe('Aged Brie', () => {
      describe('When sell by date has not passed', () => {
        it("Quality should be increased by one", function() {
          var hasValue = new BrieItem("Aged Brie", 10, 10);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.quality).toEqual(11);
        });
        it("Quality should not go above 50", function() {
          var hasValue = new BrieItem("Aged Brie", 10, 50);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.quality).toEqual(50);
        });
        it("Sell-in should be descreased by one", function() {
          var hasValue = new BrieItem("Aged Brie", 10, 10);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.sell_in).toEqual(9);
        });
      });
      describe('When sell by date has passed', () => {
        it("Quality should still increase by two", function() {
          /* Possible bug or incomplete documentation:
            "Aged Brie" actually increases in quality the older it gets, but not that it also doubles.
            Going to assume this has been working satisfactorily and it should increase by two.
          */
          var hasValue = new BrieItem("Aged Brie", 0, 10);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.quality).toEqual(12);
        });
        it("Quality should still not go above 50", function() {
          var hasValue = new BrieItem("Aged Brie", 0, 50);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.quality).toEqual(50);
        });
        it("Sell-in should still be descreased by one", function() {
          var hasValue = new BrieItem("Aged Brie", 0, 10);
          var zeroValue = new BrieItem("Aged Brie", 0, 0);
          items = [hasValue, zeroValue];
          update_quality(true);
          expect(hasValue.sell_in).toEqual(-1);
          expect(zeroValue.sell_in).toEqual(-1);
        });
      });
    });
    describe('Backstage passes', () => {
      describe('When sell by date has not passed', () => {
        describe('and there are greater than 10 days before concert', () => {
          it("Quality should be increased by one", function() {
            var hasValue = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 11, 10);
            items = [hasValue];
            update_quality(true);
            expect(hasValue.quality).toEqual(11);
          });
          it("Quality should not go above 50", function() {
            var hasValue = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 11, 50);
            items = [hasValue];
            update_quality(true);
            expect(hasValue.quality).toEqual(50);
          });
          it("Sell-in should be descreased by one", function() {
            var hasValue = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 11, 10);
            items = [hasValue];
            update_quality(true);
            expect(hasValue.sell_in).toEqual(10);
          });
        });
        describe('and there are 6 to 10 days before concert', () => {
          it("Quality should be increased by two", function() {
            var tenDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 10, 10);
            var sixDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 6, 10);
            items = [tenDays, sixDays];
            update_quality(true);
            expect(tenDays.quality).toEqual(12);
            expect(sixDays.quality).toEqual(12);
          });
          it("Quality should not go above 50", function() {
            var tenDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 10, 50);
            var sixDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 6, 50);
            items = [tenDays, sixDays];
            update_quality(true);
            expect(tenDays.quality).toEqual(50);
            expect(sixDays.quality).toEqual(50);
          });
          it("Sell-in should be descreased by one", function() {
            var tenDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 10, 10);
            var sixDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 6, 10);
            items = [tenDays, sixDays];
            update_quality(true);
            expect(tenDays.sell_in).toEqual(9);
            expect(sixDays.sell_in).toEqual(5);
          });
        });
        describe('and there are 1 to 5 days before concert', () => {
          it("Quality should be increased by three", function() {
            var oneDay = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 1, 10);
            var fiveDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 5, 10);
            items = [oneDay, fiveDays];
            update_quality(true);
            expect(oneDay.quality).toEqual(13);
            expect(fiveDays.quality).toEqual(13);
          });
          it("Quality should not go above 50", function() {
            var oneDay = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 1, 50);
            var fiveDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 5, 50);
            items = [oneDay, fiveDays];
            update_quality(true);
            expect(oneDay.quality).toEqual(50);
            expect(fiveDays.quality).toEqual(50);
          });
          it("Sell-in should be descreased by one", function() {
            var oneDay = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 1, 10);
            var fiveDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 5, 10);
            items = [oneDay, fiveDays];
            update_quality(true);
            expect(oneDay.sell_in).toEqual(0);
            expect(fiveDays.sell_in).toEqual(4);
          });
        });
      });
      describe('When sell by date has passed', () => {
        it("Quality should equal zero", function() {
          var zeroDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 0, 10);
          var minusOneDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", -1, 10);
          items = [zeroDays, minusOneDays];
          update_quality(true);
          expect(zeroDays.quality).toEqual(0);
          expect(minusOneDays.quality).toEqual(0);
        });
        it("Sell-in should still be descreased by one", function() {
          var zeroDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", 0, 10);
          var minusOneDays = new BackstageItem("Backstage passes to a TAFKAL80ETC concert", -1, 10);
          items = [zeroDays, minusOneDays];
          update_quality(true);
          expect(zeroDays.sell_in).toEqual(-1);
          expect(minusOneDays.sell_in).toEqual(-2);
        });
      });
    });
    describe('Sulfuras', () => {
      describe('When sell by date has not passed', () => {
        it("Quality is 80 and it never alters", function() {
          var hasValue = new SulfurasItem("Sulfuras, Hand of Ragnaros", 10, 80);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.quality).toEqual(80);
        });
        it("Sell-in should not change", function() {
          var hasValue = new SulfurasItem("Sulfuras, Hand of Ragnaros", 10, 80);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.sell_in).toEqual(10);
        });
      });
      describe('When sell by date has passed', () => {
        it("Quality is 80 and it never alters", function() {
          var hasValue = new SulfurasItem("Sulfuras, Hand of Ragnaros", 0, 80);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.quality).toEqual(80);
        });
        it("Sell-in should not change", function() {
          var hasValue = new SulfurasItem("Sulfuras, Hand of Ragnaros", 0, 80);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.sell_in).toEqual(0);
        });
      });
    });
    describe('Conjured Items', () => {
      describe('When sell by date has not passed', () => {
        it("Quality should be descreased by two when not already 0", function() {
          var hasValue = new ConjuredItem("Conjured", 10, 10);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.quality).toEqual(8);
        });
        it("Quality should not go below zero", function() {
          var zeroValue = new ConjuredItem("Conjured", 10, 0);
          items = [zeroValue];
          update_quality(true);
          expect(zeroValue.quality).toEqual(0);
        });
        it("Sell-in should be descreased by one", function() {
          var hasValue = new ConjuredItem("Conjured", 10, 10);
          var zeroValue = new ConjuredItem("Conjured", 10, 0);
          items = [hasValue, zeroValue];
          update_quality(true);
          expect(hasValue.sell_in).toEqual(9);
          expect(zeroValue.sell_in).toEqual(9);
        });
      });
      describe('When sell by date has passed', () => {
        it("Quality should be descreased by four when not already 0", function() {
          var hasValue = new ConjuredItem("Conjured", 0, 10);
          items = [hasValue];
          update_quality(true);
          expect(hasValue.quality).toEqual(6);
        });
        it("Quality should not go below zero", function() {
          var zeroValue = new ConjuredItem("Conjured", 0, 0);
          items = [zeroValue];
          update_quality(true);
          expect(zeroValue.quality).toEqual(0);
        });
        it("Sell-in should still be descreased by one", function() {
          var hasValue = new ConjuredItem("Conjured", 0, 10);
          var zeroValue = new ConjuredItem("Conjured", 0, 0);
          items = [hasValue, zeroValue];
          update_quality(true);
          expect(hasValue.sell_in).toEqual(-1);
          expect(zeroValue.sell_in).toEqual(-1);
        });
      });
    });
  });
});
