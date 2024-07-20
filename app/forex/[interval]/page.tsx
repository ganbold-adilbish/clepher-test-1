import CandleStickChart from "@/components/CandlestickChart";

type ForexProps = {
  params: { interval: string };
};

type DataValue = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
};

const intervalMap = {
  fx_daily: "Daily",
  fx_weekly: "Weekly",
  fx_monthly: "Monthly",
};

async function getData(interval: string) {
  const result = await fetch(
    `${
      process.env.API_URL
    }/query?function=${interval.toUpperCase()}&from_symbol=EUR&to_symbol=USD&apikey=${
      process.env.API_KEY
    }`
  );
  const data = await result.json();

  return data;
}

export default async function Forex(props: ForexProps) {
  const {
    params: { interval },
  } = props;
  const data = await getData(interval);
  const seriesData = Object.entries(
    data?.[
      `Time Series FX (${intervalMap[interval as keyof typeof intervalMap]})`
    ]
  )?.map(([date, value]) => ({
    x: date,
    y: Object.values(value as DataValue),
  }));
  const titleText = data?.["Meta Data"]["1. Information"];
  const baseCurrency = data?.["Meta Data"]["2. From Symbol"];
  const quoteCurrency = data?.["Meta Data"]["3. To Symbol"];
  const lastUpdatedAt =
    data?.["Meta Data"][`${interval === "fx_daily" ? 5 : 4}. Last Refreshed`] +
    " " +
    data?.["Meta Data"][`${interval === "fx_daily" ? 6 : 5}. Time Zone`];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div>
        <span className="font-bold">Currency Pair:</span> {baseCurrency}/
        {quoteCurrency}
      </div>
      <div className="text-xs text-right w-[80%]">
        <span className="font-bold ">Last Updated At:</span> {lastUpdatedAt}
      </div>
      <CandleStickChart seriesData={seriesData} titleText={titleText} />
    </div>
  );
}
