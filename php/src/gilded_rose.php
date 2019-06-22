<?php

class GildedRose
{

    private $inventory;

    function __construct($items)
    {
        $this->inventory = new Inventory($items, $this->buildUpdateChain($items));
    }

    function update_quality()
    {
        return $this->inventory->update();
    }

    private function buildUpdateChain($items)
    {
        $storeItems = collect($items)
            ->pluck('name')
            ->unique()
            ->map(function ($itemName) {
                return StoreItemFactory::fromName($itemName);
            });

        return $storeItems->tail()->reduce(function (StoreItem $chain, StoreItem $item) {
            $chain->setNextLink($item);

            return $item;
        }, $storeItems->head());
    }
}

class Item
{

    public $name;
    public $sell_in;
    public $quality;

    function __construct($name, $sell_in, $quality)
    {
        $this->name = $name;
        $this->sell_in = $sell_in;
        $this->quality = $quality;
    }

    public function __toString()
    {
        return "{$this->name}, {$this->sell_in}, {$this->quality}";
    }

}

class Inventory
{
    private $items;
    /**
     * @var StoreItem
     */
    private $updateChain;

    public function __construct($items, StoreItem $updateChain)
    {
        $this->items = collect($items);
        $this->updateChain = $updateChain;
    }

    public function update(): array
    {
        return $this->items->each(function ($item) {
            $this->updateChain->update($item);
        })->all();
    }
}

abstract class StoreItem
{
    private $next;

    public function setNextLink(StoreItem $item)
    {
        $this->next = $item;
    }

    protected function decrementSellIn($item)
    {
        $item->sellIn--;
    }

    protected function decrementQuality($item)
    {
        $item->quality = max($item->quality - 1, 0);
    }

    abstract public function update($item);
}

class Collection
{
    private $items;

    public function __construct($items)
    {
        $this->items = $items;
    }

    public function each($callback)
    {
        array_walk($this->items, $callback);

        return $this;
    }

    public function map($callback)
    {
        return new static(array_map($callback, $this->items));
    }

    public function unique()
    {
        return new static(array_unique($this->all()));
    }

    public function pluck($property)
    {
        return $this->map(function ($item) use ($property) {
            return $item->{$property};
        });
    }

    public function tail()
    {
        return new static(array_slice($this->items, 1));
    }

    public function reduce($callback, $initialValue = null)
    {
        return array_reduce($this->items, $callback, $initialValue);
    }

    public function head()
    {
        return $this->items[0];
    }

    public function all()
    {
        return $this->items;
    }
}

function collect(array $items)
{
    return new Collection($items);
}

class RegularItem extends StoreItem
{
    public function update($item)
    {
        $this->decrementQuality($item);

        $this->decrementSellIn($item);

        $this->decrementQuality($item);
    }
}

class StoreItemFactory
{
    public static function fromName($name)
    {
        switch ($name) {
            default:
                return new RegularItem();
        }
    }
}

