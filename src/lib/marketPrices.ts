import Parse from "../parse";
import { featuredProducts, rwandaDistricts } from "../data/homeData";

export type MarketPriceRow = {
  id: string;
  crop: string;
  district: string;
  price: number;
  availableKg: number;
  updatedAt: number;
};

const CLASS_NAME = "LabourMarketPrice";

function basePriceFor(cropIndex: number, districtIndex: number) {
  return 380 + cropIndex * 45 + districtIndex * 9;
}

function buildDefaultRows(): MarketPriceRow[] {
  return rwandaDistricts.map((district, index) => {
    const cropIndex = index % featuredProducts.length;
    return {
      id: `${district}-${featuredProducts[cropIndex]}`,
      crop: featuredProducts[cropIndex],
      district,
      price: basePriceFor(cropIndex, index),
      availableKg: 90 + index * 6,
      updatedAt: Date.now(),
    };
  });
}

export async function ensureSeedPrices(): Promise<void> {
  const query = new Parse.Query(CLASS_NAME);
  const count = await query.count();
  if (count > 0) return;

  const defaults = buildDefaultRows();
  const objects = defaults.map((row) => {
    const object = new Parse.Object(CLASS_NAME);
    object.set("rowId", row.id);
    object.set("crop", row.crop);
    object.set("district", row.district);
    object.set("price", row.price);
    object.set("availableKg", row.availableKg);
    return object;
  });

  await Parse.Object.saveAll(objects);
}

export async function fetchMarketPrices(): Promise<MarketPriceRow[]> {
  await ensureSeedPrices();
  const query = new Parse.Query(CLASS_NAME);
  query.limit(200);
  query.ascending("district");
  const results = await query.find();

  return results.map((item) => ({
    id: item.id || String(item.get("rowId") || `${item.get("district")}-${item.get("crop")}`),
    crop: item.get("crop"),
    district: item.get("district"),
    price: item.get("price"),
    availableKg: item.get("availableKg"),
    updatedAt: item.updatedAt ? item.updatedAt.getTime() : Date.now(),
  }));
}

export async function simulateLabourMarketTick(): Promise<void> {
  const query = new Parse.Query(CLASS_NAME);
  query.limit(200);
  const results = await query.find();
  if (results.length === 0) return;

  const updated = results.map((item) => {
    const currentPrice = Number(item.get("price")) || 400;
    const variancePercent = (Math.random() - 0.45) * 0.06;
    const nextPrice = Math.max(150, Math.round(currentPrice * (1 + variancePercent)));
    item.set("price", nextPrice);
    return item;
  });

  await Parse.Object.saveAll(updated);
}

export async function updateMarketPrice(id: string, price: number, availableKg: number): Promise<void> {
  const query = new Parse.Query(CLASS_NAME);
  const object = await query.get(id);
  object.set("price", price);
  object.set("availableKg", availableKg);
  await object.save();
}
