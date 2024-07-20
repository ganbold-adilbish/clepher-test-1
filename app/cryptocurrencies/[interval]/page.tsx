import MultipleYAxisCandlestickChart from "@/components/MultipleYAxisCandlestickChart";

type CryptoCurrenciesProps = {
  params: { interval: string };
};

type DataValue = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
};

const intervalMap = {
  digital_currency_daily: "Daily",
  digital_currency_weekly: "Weekly",
  digital_currency_monthly: "Monthly",
};

async function getData(interval: string) {
  const result = await fetch(
    `${
      process.env.API_URL
    }/query?function=${interval.toUpperCase()}&symbol=BTC&market=EUR&apikey=${
      process.env.API_KEY
    }`
  );
  const data = await result.json();

  return data;
}

export default async function CryptoCurrencies(props: CryptoCurrenciesProps) {
  const {
    params: { interval },
  } = props;
  const data = await getData(interval);
  const seriesData = Object.entries(
    data?.[
      `Time Series (Digital Currency ${
        intervalMap[interval as keyof typeof intervalMap]
      })`
    ]
  );
  const seriesPriceData = seriesData?.map(([date, value]) => ({
    x: date,
    y: Object.values(value as DataValue).slice(0, 4),
  }));
  const seriesVolumeData = seriesData?.map(([date, value]) => ({
    x: date,
    y: Object.values(value as DataValue).slice(-1)[0],
  }));
  const titleText = data?.["Meta Data"]["1. Information"];
  const baseCurrency = data?.["Meta Data"]["2. Digital Currency Code"];
  const quoteCurrency = data?.["Meta Data"]["4. Market Code"];
  const lastUpdatedAt =
    data?.["Meta Data"]["6. Last Refreshed"] +
    " " +
    data?.["Meta Data"]["7. Time Zone"];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div>
        <span className="font-bold">Digital Currency Pair:</span> {baseCurrency}
        /{quoteCurrency}
      </div>
      <div className="text-xs text-right w-[80%]">
        <span className="font-bold ">Last Updated At:</span> {lastUpdatedAt}
      </div>
      <MultipleYAxisCandlestickChart
        seriesPriceData={seriesPriceData}
        seriesVolumeData={seriesVolumeData}
        titleText={titleText}
      />
    </div>
  );
}
