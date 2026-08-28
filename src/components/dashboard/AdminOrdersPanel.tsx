import Parse from "../../parse";
import { ClipboardList, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

type AdminOrder = {
  id: string;
  crop: string;
  district: string;
  price: number;
  quantityKg: number;
  status: string;
  listingId: string;
  buyer: string;
  buyerEmail: string;
  seller: string;
  createdAt: string;
};

export function AdminOrdersPanel() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const query = new Parse.Query("MarketplaceOrder");
      query.include("buyer");
      query.include("seller");
      query.descending("createdAt");
      query.limit(200);
      const results = await query.find();
      setOrders(results.map((item) => {
        const buyer = item.get("buyer");
        const seller = item.get("seller");
        return {
          id: item.id || crypto.randomUUID(),
          crop: String(item.get("crop") || "Unknown crop"),
          district: String(item.get("district") || "Unknown district"),
          price: Number(item.get("price") || 0),
          quantityKg: Number(item.get("quantityKg") || 0),
          status: String(item.get("status") || "pending"),
          listingId: String(item.get("listingId") || "Not recorded"),
          buyer: String(buyer?.get("fullName") || buyer?.get("username") || "Farmer"),
          buyerEmail: String(buyer?.get("email") || "-"),
          seller: String(seller?.get("fullName") || seller?.get("username") || "Not linked"),
          createdAt: new Date(item.createdAt || Date.now()).toLocaleString(),
        };
      }));
    } catch {
      setError("Orders could not be loaded. Check the Parse connection and permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders().catch(() => undefined);
  }, []);

  return (
    <article className="rounded-[18px] bg-white p-5 shadow-[0_6px_25px_rgba(34,44,80,0.06)] dark:bg-[#123b2f] 2xl:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#dff4eb] text-[#18794e] dark:bg-[#1d5743] dark:text-[#86efac]"><ClipboardList className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">Farmer orders</h2><p className="mt-1 text-sm text-[#667581]">Orders submitted from exact marketplace listings.</p></div></div>
        <button type="button" onClick={() => loadOrders().catch(() => undefined)} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border border-[#dce7e3] px-3 py-2 text-xs font-bold text-[#2d4d4b] disabled:opacity-50"><RefreshCcw className="h-3.5 w-3.5" /> Refresh</button>
      </div>
      {error && <p role="alert" className="mt-4 rounded-lg bg-[#fef2f2] p-3 text-sm text-[#b91c1c]">{error}</p>}
      <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[1050px] text-left text-sm"><thead className="text-[#84919c] dark:text-[#b9d7cb]"><tr><th className="pb-3">Product</th><th className="pb-3">Buyer</th><th className="pb-3">Seller</th><th className="pb-3">Quantity</th><th className="pb-3">Total</th><th className="pb-3">Status</th><th className="pb-3">Order details</th></tr></thead><tbody>{loading ? <tr><td colSpan={7} className="py-4 text-[#87939e]">Loading farmer orders...</td></tr> : orders.length ? orders.map((order) => <tr key={order.id} className="border-t border-[#edf0f4] dark:border-[#1d5743]"><td className="py-3"><p className="font-bold">{order.crop}</p><p className="text-xs text-[#87939e]">{order.district} · Listing {order.listingId}</p></td><td className="py-3"><p>{order.buyer}</p><p className="text-xs text-[#87939e]">{order.buyerEmail}</p></td><td className="py-3">{order.seller}</td><td className="py-3">{order.quantityKg} kg</td><td className="py-3 font-semibold">RWF {(order.price * order.quantityKg).toLocaleString()}</td><td className="py-3"><span className="rounded-full bg-[#fff4d6] px-2.5 py-1 text-xs font-bold text-[#9a6b0b]">{order.status}</span></td><td className="py-3 text-xs text-[#87939e]">{order.createdAt}</td></tr>) : <tr><td colSpan={7} className="py-8 text-center text-[#87939e]">No farmer orders yet.</td></tr>}</tbody></table></div>
    </article>
  );
}
