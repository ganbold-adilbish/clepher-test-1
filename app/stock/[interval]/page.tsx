import CandleStickChart from "@/components/CandlestickChart";

type StockProps = {
  params: { interval: string };
};

type DataValue = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
};

const intervalMap = {
  time_series_daily: "Time Series (Daily)",
  time_series_weekly: "Weekly Time Series",
  time_series_monthly: "Monthly Time Series",
};

async function getData(interval: string) {
  const result = await fetch(
    `${
      process.env.API_URL
    }/query?function=${interval.toUpperCase()}&symbol=IBM&apikey=${
      process.env.API_KEY
    }`
  );
  const data = await result.json();

  return data;
}

export default async function Stock(props: StockProps) {
  const {
    params: { interval },
  } = props;
  const data = await getData(interval);
  const seriesData = Object.entries(
    data?.[intervalMap[interval as keyof typeof intervalMap]]
  )?.map(([date, value]) => ({
    x: date,
    y: Object.values(value as DataValue).slice(0, 4),
  }));
  const titleText = data?.["Meta Data"]["1. Information"];

  return <CandleStickChart seriesData={seriesData} titleText={titleText} />;
}
