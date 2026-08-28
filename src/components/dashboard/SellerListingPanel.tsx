import Parse from "../../parse";
import { FormEvent, useState } from "react";
import { rwandaCrops, rwandaDistricts } from "../../data/homeData";
import { toast } from "sonner";

type SellerListingPanelProps = { user: Parse.User };

export function SellerListingPanel({ user }: SellerListingPanelProps) {
  const [crop, setCrop] = useState<string>(rwandaCrops[0]);
  const [district, setDistrict] = useState<string>(rwandaDistricts[0]);
  const [price, setPrice] = useState("400");
  const [availableKg, setAvailableKg] = useState("10");
  const [saving, setSaving] = useState(false);

  const submitListing = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const priceValue = Number(price);
    const quantityValue = Number(availableKg);
    if (priceValue <= 0 || quantityValue <= 0) {
      toast.error("Enter a price and availability greater than zero.");
      return;
    }
    setSaving(true);
    try {
      const existingQuery = new Parse.Query("LabourMarketPrice");
      existingQuery.equalTo("seller", user);
      existingQuery.equalTo("crop", crop);
      existingQuery.equalTo("district", district);
      const listing = (await existingQuery.first()) || new Parse.Object("LabourMarketPrice");
      listing.set("rowId", listing.get("rowId") || `${district}-${crop}-${user.id}`);
      listing.set("crop", crop);
      listing.set("district", district);
      listing.set("price", priceValue);
      listing.set("availableKg", quantityValue);
      listing.set("seller", user);
      listing.set("sellerName", user.get("fullName") || user.get("username") || "Farmer");
      listing.set("sellerPhone", user.get("phoneNumber") || "");
      listing.set("sellerEmail", user.get("email") || user.get("username") || "");
      await listing.save();
      toast.success(`${crop} listing published for ${district}.`);
    } catch {
      toast.error("The listing could not be published. Check your profile and connection.");
    } finally {
      setSaving(false);
    }
  };

  return <article className="rounded-[18px] border border-[#b9dfcf] bg-[#eaf8f2] p-5 shadow-[0_8px_18px_rgba(17,34,27,0.05)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-7">
    <div><h2 className="text-xl font-bold">Sell your crops</h2><p className="mt-1 text-sm text-[#467267] dark:text-[#b9d7cb]">Publish a farmer-owned listing. Buyers can contact you about this exact crop and district.</p></div>
    <form onSubmit={submitListing} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <label className="text-xs font-bold text-[#467267] dark:text-[#b9d7cb]">Crop<select value={crop} onChange={(event) => setCrop(event.target.value)} className="mt-1 w-full rounded-lg border border-[#cfe2db] bg-white px-3 py-2 text-sm font-normal text-[#1f2d31] dark:border-[#28664f] dark:bg-[#0b261d] dark:text-white">{rwandaCrops.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="text-xs font-bold text-[#467267] dark:text-[#b9d7cb]">District<select value={district} onChange={(event) => setDistrict(event.target.value)} className="mt-1 w-full rounded-lg border border-[#cfe2db] bg-white px-3 py-2 text-sm font-normal text-[#1f2d31] dark:border-[#28664f] dark:bg-[#0b261d] dark:text-white">{rwandaDistricts.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="text-xs font-bold text-[#467267] dark:text-[#b9d7cb]">Price (RWF/kg)<input type="number" min="1" value={price} onChange={(event) => setPrice(event.target.value)} className="mt-1 w-full rounded-lg border border-[#cfe2db] bg-white px-3 py-2 text-sm font-normal text-[#1f2d31] dark:border-[#28664f] dark:bg-[#0b261d] dark:text-white" /></label>
      <label className="text-xs font-bold text-[#467267] dark:text-[#b9d7cb]">Available (kg)<input type="number" min="1" value={availableKg} onChange={(event) => setAvailableKg(event.target.value)} className="mt-1 w-full rounded-lg border border-[#cfe2db] bg-white px-3 py-2 text-sm font-normal text-[#1f2d31] dark:border-[#28664f] dark:bg-[#0b261d] dark:text-white" /></label>
      <button type="submit" disabled={saving} className="rounded-lg bg-[#18794e] px-4 py-2 text-sm font-bold text-white disabled:opacity-60 sm:col-span-2 lg:col-span-4">{saving ? "Publishing..." : "Publish crop listing"}</button>
    </form>
  </article>;
}
