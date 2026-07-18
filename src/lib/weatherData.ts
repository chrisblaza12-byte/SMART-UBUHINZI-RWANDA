import Parse from "../parse";
import { rwandaDistricts } from "../data/homeData";

export type DistrictWeather = {
  id: string;
  district: string;
  temperatureC: number;
  humidity: number;
  rainChance: number;
  condition: string;
  updatedBy: string;
};

const CLASS_NAME = "DistrictWeather";

function defaultConditionFor(index: number) {
  const options = ["Sunny", "Cloudy", "Light Rain", "Heavy Rain", "Windy"];
  return options[index % options.length];
}

export async function ensureWeatherSeed(): Promise<void> {
  const query = new Parse.Query(CLASS_NAME);
  const count = await query.count();
  if (count > 0) return;

  const objects = rwandaDistricts.map((district, index) => {
    const object = new Parse.Object(CLASS_NAME);
    object.set("district", district);
    object.set("temperatureC", 20 + (index % 8));
    object.set("humidity", 55 + (index % 30));
    object.set("rainChance", 20 + (index % 60));
    object.set("condition", defaultConditionFor(index));
    object.set("updatedBy", "system");
    return object;
  });

  await Parse.Object.saveAll(objects);
}

export async function fetchDistrictWeather(): Promise<DistrictWeather[]> {
  await ensureWeatherSeed();
  const query = new Parse.Query(CLASS_NAME);
  query.limit(200);
  query.ascending("district");
  const results = await query.find();

  return results.map((item) => ({
    id: item.id || String(item.get("district") || `weather-${Date.now()}`),
    district: item.get("district"),
    temperatureC: item.get("temperatureC"),
    humidity: item.get("humidity"),
    rainChance: item.get("rainChance"),
    condition: item.get("condition"),
    updatedBy: item.get("updatedBy") || "system",
  }));
}

export async function updateDistrictWeather(
  id: string,
  values: { temperatureC: number; humidity: number; rainChance: number; condition: string },
  updatedByEmail: string,
): Promise<void> {
  const query = new Parse.Query(CLASS_NAME);
  const object = await query.get(id);
  object.set("temperatureC", values.temperatureC);
  object.set("humidity", values.humidity);
  object.set("rainChance", values.rainChance);
  object.set("condition", values.condition);
  object.set("updatedBy", updatedByEmail);
  await object.save();
}
