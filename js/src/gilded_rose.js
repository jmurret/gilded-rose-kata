var ITEM_TYPES = {
  conjured: 'ConjuredItem',
}
function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

function NormalItem(name, sell_in, quality) {
  Item.call(this, name, sell_in, quality);
  this._maxQuality = 50
  this._updateQuality = function(accelerator = 1) {
    if (this.quality > 0 && this.quality < this._maxQuality) {
      if (this.sell_in <= 0) {
        const quality = this.quality < (2 * accelerator) ? 0 : this.quality - (2 * accelerator);
        this.quality = quality > 0 ? quality : 0;
      } else {
        const quality = this.quality < (2 * accelerator) ? 0 : this.quality - (1 * accelerator);
        this.quality = quality > 0 ? quality : 0;
      }
    }
  };
  this._updateSellin = function() {
    this.sell_in--;
  };
  this.updateQuality = function() {
    this._updateQuality();
    this._updateSellin();
  };
}

function ConjuredItem(name, sell_in, quality) {
  NormalItem.call(this, name, sell_in, quality);
  this.updateQuality = function() {
    this._updateQuality(2);
    this._updateSellin();
  };
}

function BackstageItem(name, sell_in, quality) {
  NormalItem.call(this, name, sell_in, quality);
  this._updateQuality = function() {
    if (this.quality < this._maxQuality) {
      if (this.sell_in <= 0) {
        this.quality = 0;
      } else if (this.sell_in >= 1 && this.sell_in <= 5){
        this.quality = this.quality + 3;
      } else if (this.sell_in >= 6 && this.sell_in <= 10){
        this.quality = this.quality + 2;
      } else {
        this.quality = this.quality + 1;
      }
    }
  };
  this.updateQuality = function() {
    this._updateQuality();
    this._updateSellin();
  };
}

function BrieItem(name, sell_in, quality) {
  NormalItem.call(this, name, sell_in, quality);
  this.updateQuality = function() {
    this._updateQuality(-1);
    this._updateSellin();
  };
}

function SulfurasItem(name, sell_in, quality) {
  NormalItem.call(this, name, sell_in, quality);
  this.updateQuality = function () {};
}

var items = []

function update_quality(featureFlagUseItemTypes = false) {
  var _updateItem = function (items, i) {
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
  for (var i = 0; i < items.length; i++) {
    if(!featureFlagUseItemTypes) {
      if (items[i].constructor.name === ITEM_TYPES.conjured) items[i].updateQuality();
      else _updateItem(items, i);
    } else {
      items[i].updateQuality()
    }
  }
}
