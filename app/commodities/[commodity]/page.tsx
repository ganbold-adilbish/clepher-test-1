import LineChart from "@/components/LineChart";

type CommodityProps = {
  params: { commodity: string };
};

type DataItem = {
  date: string;
  value: string;
};

async function getData(commodity: string) {
  const result = await fetch(
    `https://www.alphavantage.co/query?function=${commodity.toUpperCase()}&interval=monthly&apikey=demo`
  );
  const data = await result.json();

  return data;
}

export default async function Commodity(props: CommodityProps) {
  const {
    params: { commodity },
  } = props;
  const data = await getData(commodity);
  const seriesData = data?.data?.map((item: DataItem) => ({
    x: item.date,
    y: parseFloat(item.value) || 0.0,
  }));
  const titleText = data?.name;
  const yAxisLabel = data?.unit;

  return (
    <LineChart
      seriesData={seriesData}
      titleText={titleText}
      yAxisLabel={yAxisLabel}
    />
  );
}
