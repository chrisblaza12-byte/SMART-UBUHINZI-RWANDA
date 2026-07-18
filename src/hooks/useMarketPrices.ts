import { useEffect, useRef, useState } from "react";
import { fetchMarketPrices, MarketPriceRow, simulateLabourMarketTick } from "../lib/marketPrices";

const REFRESH_INTERVAL_MS = 15000;

export function useMarketPrices() {
  const [rows, setRows] = useState<MarketPriceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const load = async () => {
      const data = await fetchMarketPrices();
      if (!isMounted.current) return;
      setRows(data);
      setLoading(false);
      setLastUpdated(Date.now());
    };

    load();

    const timer = window.setInterval(async () => {
      await simulateLabourMarketTick();
      const data = await fetchMarketPrices();
      if (!isMounted.current) return;
      setRows(data);
      setLastUpdated(Date.now());
    }, REFRESH_INTERVAL_MS);

    return () => {
      isMounted.current = false;
      window.clearInterval(timer);
    };
  }, []);

  return { rows, loading, lastUpdated };
}
