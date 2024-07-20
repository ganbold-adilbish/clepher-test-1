import CandleStickChart from "@/components/CandlestickChart";

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
  )?.map(([date, value]) => ({
    x: date,
    y: Object.values(value as DataValue).slice(0, 4),
  }));
  const titleText = data?.["Meta Data"]["1. Information"];

  return <CandleStickChart seriesData={seriesData} titleText={titleText} />;
}
