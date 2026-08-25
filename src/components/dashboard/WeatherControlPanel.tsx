import Parse from "../../parse";
import { CloudSun, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DistrictWeather, fetchDistrictWeather, updateDistrictWeather } from "../../lib/weatherData";

type WeatherControlPanelProps = {
  isAdmin: boolean;
};

export function WeatherControlPanel({ isAdmin }: WeatherControlPanelProps) {
  const [rows, setRows] = useState<DistrictWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchDistrictWeather().then((data) => {
      if (!mounted) return;
      setRows(data);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleFieldChange = (id: string, field: keyof DistrictWeather, value: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: field === "condition" ? value : Number(value),
            }
          : row,
      ),
    );
  };

  const handleSave = async (row: DistrictWeather) => {
    if (!isAdmin) {
      toast.error("Only the 2 platform admins can update weather.");
      return;
    }

    setSavingId(row.id);
    try {
      const currentUser = Parse.User.current();
      const email = String(currentUser?.get("email") || currentUser?.getUsername() || "admin");
      await updateDistrictWeather(
        row.id,
        {
          temperatureC: row.temperatureC,
          humidity: row.humidity,
          rainChance: row.rainChance,
          condition: row.condition,
        },
        email,
      );
      toast.success(`${row.district} weather updated.`);
    } catch {
      toast.error("Could not update weather.");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Loading Rwanda district weather...</p>;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="inline-flex items-center gap-2 font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
          <CloudSun className="h-5 w-5 text-[#22C55E]" /> Rwanda Agriculture Weather Control
        </h3>
        {!isAdmin && <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">View only — admin required to edit</span>}
      </div>

      <div className="max-h-[420px] overflow-y-auto rounded-lg border border-[#CBD5E1] dark:border-[#334155]">
        <table className="w-full min-w-[980px] text-left text-base">
          <thead className="sticky top-0 bg-[#F8FAFC] dark:bg-[#0F172A]">
            <tr className="border-b border-[#CBD5E1] text-[#64748B] dark:border-[#334155] dark:text-[#94A3B8]">
              <th className="px-3 py-2">District</th>
              <th className="px-3 py-2">Temp (°C)</th>
              <th className="px-3 py-2">Humidity %</th>
              <th className="px-3 py-2">Rain %</th>
              <th className="px-3 py-2">Condition</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-[#E2E8F0] text-[#0F172A] dark:border-[#1E293B] dark:text-[#F8FAFC]">
                <td className="px-3 py-2">{row.district}</td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    disabled={!isAdmin}
                    value={row.temperatureC}
                    onChange={(event) => handleFieldChange(row.id, "temperatureC", event.target.value)}
                    className="w-20 rounded-md border border-[#CBD5E1] bg-white px-2 py-1 text-sm disabled:opacity-60 dark:border-[#334155] dark:bg-[#020617]"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    disabled={!isAdmin}
                    value={row.humidity}
                    onChange={(event) => handleFieldChange(row.id, "humidity", event.target.value)}
                    className="w-20 rounded-md border border-[#CBD5E1] bg-white px-2 py-1 text-sm disabled:opacity-60 dark:border-[#334155] dark:bg-[#020617]"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    disabled={!isAdmin}
                    value={row.rainChance}
                    onChange={(event) => handleFieldChange(row.id, "rainChance", event.target.value)}
                    className="w-20 rounded-md border border-[#CBD5E1] bg-white px-2 py-1 text-sm disabled:opacity-60 dark:border-[#334155] dark:bg-[#020617]"
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    disabled={!isAdmin}
                    value={row.condition}
                    onChange={(event) => handleFieldChange(row.id, "condition", event.target.value)}
                    className="rounded-md border border-[#CBD5E1] bg-white px-2 py-1 text-sm disabled:opacity-60 dark:border-[#334155] dark:bg-[#020617]"
                  >
                    {["Sunny", "Cloudy", "Light Rain", "Heavy Rain", "Windy"].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    disabled={!isAdmin || savingId === row.id}
                    onClick={() => handleSave(row)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-[#22C55E] px-2 py-1 text-xs font-semibold text-[#052E16] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save className="h-3.5 w-3.5" /> {savingId === row.id ? "Saving..." : "Save"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
