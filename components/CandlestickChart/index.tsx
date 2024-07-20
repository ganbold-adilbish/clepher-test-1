"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type SeriesDataItem = {
  x: string;
  y: string[];
};

type CandleStickChartProps = {
  seriesData: SeriesDataItem[];
  titleText: string;
};

export default function CandleStickChart({
  seriesData,
  titleText,
}: CandleStickChartProps) {
  const series = [
    {
      data: seriesData,
    },
  ];
  const options: ApexOptions = {
    chart: {
      type: "candlestick",
    },
    title: {
      text: titleText,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (value) {
          return value.toFixed(2);
        },
      },
    },
  };

  return (
    <div className="w-[80%]">
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={450}
        width={"100%"}
      />
    </div>
  );
}
