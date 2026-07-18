import Parse from "../../parse";
import { Download, Phone, RefreshCcw, Search, ShoppingCart, TrendingDown, TrendingUp, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { AreaChart as ReAreaChart, Area as ReArea, CartesianGrid, XAxis, YAxis, Tooltip as ReTooltip, ResponsiveContainer as ReContainer } from "recharts";
import { rwandaDistricts } from "../../data/homeData";
import { useMarketPrices } from "../../hooks/useMarketPrices";
import { Language, translations } from "../../lib/translations";

type MarketplacePageProps = {
  onOpenAuth: () => void;
  language: Language;
};

export function MarketplacePage({ onOpenAuth, language }: MarketplacePageProps) {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("__all");
  const [selectedListing, setSelectedListing] = useState<{ id: string; crop: string; district: string } | null>(null);
  const [contactMessage, setContactMessage] = useState("");
  const t = translations[language];
  const { rows, loading, lastUpdated } = useMarketPrices();

  const filteredListings = useMemo(() => {
    const normalized = search.toLowerCase();
    return rows.filter((listing) => {
      const byDistrict = district === "__all" || listing.district === district;
      const bySearch =
        listing.crop.toLowerCase().includes(normalized) || listing.district.toLowerCase().includes(normalized);
      return byDistrict && bySearch;
    });
  }, [district, rows, search]);

  const trendData = useMemo(
    () => filteredListings.slice(0, 10).map((item) => ({ district: item.district, price: item.price })),
    [filteredListings],
  );

  const requireUser = () => {
    const user = Parse.User.current();
    if (!user) {
      toast.error("Please login first.");
      onOpenAuth();
      return null;
    }
    return user;
  };

  const handleBuy = async (listing: { crop: string; district: string; price: number }) => {
    const user = requireUser();
    if (!user) return;

    const order = new Parse.Object("MarketplaceOrder");
    order.set("crop", listing.crop);
    order.set("district", listing.district);
    order.set("price", listing.price);
    order.set("quantityKg", 10);
    order.set("status", "pending");
    order.set("buyer", user);
    await order.save();
    toast.success(`Order request sent for ${listing.crop} from ${listing.district}.`);
  };

  const openContact = (listing: { id: string; crop: string; district: string }) => {
    const user = requireUser();
    if (!user) return;
    setSelectedListing(listing);
  };

  const handleSendContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedListing || !contactMessage.trim()) {
      toast.error("Please add your message.");
      return;
    }

    const user = Parse.User.current();
    if (!user) return;

    const inquiry = new Parse.Object("MarketplaceContact");
    inquiry.set("crop", selectedListing.crop);
    inquiry.set("district", selectedListing.district);
    inquiry.set("message", contactMessage.trim());
    inquiry.set("sender", user);
    inquiry.set("status", "new");
    await inquiry.save();

    setContactMessage("");
    setSelectedListing(null);
    toast.success("Contact message sent to farmer.");
  };

  const handleDownloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Marketplace Price Report - Rwanda Districts", 14, 15);
    doc.setFontSize(10);

    let y = 24;
    filteredListings.forEach((row, index) => {
      const line = `${index + 1}. ${row.crop} | ${row.district} | RWF ${row.price}/kg | ${row.availableKg}kg`;
      doc.text(line, 14, y);
      y += 6;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("marketplace-prices-rwanda.pdf");
    toast.success("PDF downloaded successfully.");
  };

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <section className="rounded-2xl border border-[#CBD5E1] bg-white p-6 dark:border-[#334155] dark:bg-[#0F172A]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">{t.marketplace.title}</h1>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#22C55E]/15 px-3 py-1 text-xs text-[#166534] dark:text-[#4ADE80]">
            <RefreshCcw className="h-3.5 w-3.5" /> Auto-updates from labour market every 15s • Last sync {new Date(lastUpdated).toLocaleTimeString()}
          </span>
        </div>
        <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">{t.marketplace.subtitle}</p>
        <div className="mt-4 grid gap-2 md:grid-cols-[1fr_220px_auto]">
          <label className="flex items-center gap-2 rounded-md border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 dark:border-[#334155] dark:bg-[#020617]">
            <Search className="h-4 w-4 text-[#22C55E]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent text-sm text-[#0F172A] outline-none dark:text-[#F8FAFC]"
              placeholder={t.marketplace.searchPlaceholder}
            />
          </label>

          <select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="cursor-pointer rounded-md border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-sm text-[#0F172A] dark:border-[#334155] dark:bg-[#020617] dark:text-[#F8FAFC]"
          >
            <option value="__all">{t.marketplace.allDistricts}</option>
            {rwandaDistricts.map((districtName) => (
              <option key={districtName}>{districtName}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-[#EAB308] px-4 py-2 text-sm font-semibold text-[#EAB308] transition-colors duration-200 hover:bg-[#EAB308] hover:text-[#1C1917]"
          >
            <Download className="h-4 w-4" /> {t.marketplace.downloadPdf}
          </button>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl border border-[#CBD5E1] bg-white p-5 dark:border-[#334155] dark:bg-[#0F172A]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">Live Labour Market Price Trend</h2>
            <span className="rounded-full bg-[#22C55E]/20 px-3 py-1 text-xs text-[#4ADE80]">Live</span>
          </div>
          <div className="h-64 w-full">
            <ReContainer width="100%" height="100%">
              <ReAreaChart data={trendData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="district" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <ReTooltip
                  contentStyle={{ background: "#020617", border: "1px solid #334155", color: "#F8FAFC" }}
                  formatter={(value) => [`RWF ${value}`, "Price"]}
                />
                <ReArea type="monotone" dataKey="price" stroke="#22C55E" fill="url(#priceGradient)" strokeWidth={2} />
              </ReAreaChart>
            </ReContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-[#CBD5E1] bg-white p-5 dark:border-[#334155] dark:bg-[#0F172A]">
          <h2 className="text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">Top District Summary</h2>
          <div className="mt-3 space-y-2">
            {filteredListings.slice(0, 6).map((row, index) => (
              <div key={row.id} className="rounded-md border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 dark:border-[#334155] dark:bg-[#020617]">
                <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{row.district} • {row.crop}</p>
                <p className={`inline-flex items-center gap-1 text-xs ${index % 2 === 0 ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
                  {index % 2 === 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  RWF {row.price}/kg • {row.availableKg}kg
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-[#CBD5E1] bg-white p-5 dark:border-[#334155] dark:bg-[#0F172A]">
        {loading ? (
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Loading live market prices...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#CBD5E1] text-[#64748B] dark:border-[#334155] dark:text-[#94A3B8]">
                  <th className="py-2">Crop</th>
                  <th className="py-2">District</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Availability</th>
                  <th className="py-2">Trend</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.map((row, index) => (
                  <tr key={row.id} className="border-b border-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC]">
                    <td className="py-2">{row.crop}</td>
                    <td className="py-2">{row.district}</td>
                    <td className="py-2">RWF {row.price}/kg</td>
                    <td className="py-2">{row.availableKg} kg</td>
                    <td className="py-2">
                      {index % 2 === 0 ? (
                        <span className="inline-flex items-center gap-1 text-[#22C55E]"><TrendingUp className="h-4 w-4" /> Rising</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[#EF4444]"><TrendingDown className="h-4 w-4" /> Falling</span>
                      )}
                    </td>
                    <td className="py-2">
                      <div className="inline-flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleBuy(row)}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-[#22C55E] px-2 py-1 text-xs font-semibold text-[#052E16]"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" /> {t.marketplace.buy}
                        </button>
                        <button
                          type="button"
                          onClick={() => openContact(row)}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-[#CBD5E1] px-2 py-1 text-xs text-[#334155] dark:border-[#334155] dark:text-[#CBD5E1]"
                        >
                          <Phone className="h-3.5 w-3.5" /> {t.marketplace.contact}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedListing && (
        <section className="rounded-2xl border border-[#CBD5E1] bg-white p-5 dark:border-[#334155] dark:bg-[#0F172A]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">Contact farmer</h2>
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{selectedListing.crop} • {selectedListing.district}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedListing(null)}
              aria-label="Close contact form"
              className="cursor-pointer rounded-md border border-[#CBD5E1] p-2 text-[#334155] dark:border-[#334155] dark:text-[#CBD5E1]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleSendContact} className="mt-3 space-y-3">
            <textarea
              value={contactMessage}
              onChange={(event) => setContactMessage(event.target.value)}
              rows={4}
              placeholder="Write your request message to the farmer"
              className="w-full rounded-md border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-sm text-[#0F172A] outline-none dark:border-[#334155] dark:bg-[#020617] dark:text-[#F8FAFC]"
            />
            <div className="flex gap-2">
              <button type="submit" className="cursor-pointer rounded-md bg-[#22C55E] px-4 py-2 text-sm font-semibold text-[#052E16]">
                {t.marketplace.sendMessage}
              </button>
              <button
                type="button"
                onClick={() => setSelectedListing(null)}
                className="cursor-pointer rounded-md border border-[#CBD5E1] px-4 py-2 text-sm text-[#334155] dark:border-[#334155] dark:text-[#CBD5E1]"
              >
                {t.marketplace.cancel}
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}
