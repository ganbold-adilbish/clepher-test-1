"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type SeriesPriceDataItem = {
  x: string;
  y: string[];
};

type SeriesVolumeDataItem = {
  x: string;
  y: string;
};

type MultipleYAxisCandlestickChartProps = {
  seriesPriceData: SeriesPriceDataItem[];
  seriesVolumeData: SeriesVolumeDataItem[];
  titleText: string;
};

export default function MultipleYAxisCandlestickChart({
  seriesPriceData,
  seriesVolumeData,
  titleText,
}: MultipleYAxisCandlestickChartProps) {
  const series = [
    {
      name: "Price",
      type: "candlestick",
      data: seriesPriceData,
    },
    {
      name: "Volume",
      type: "column",
      data: seriesVolumeData,
    },
  ];
  const options: ApexOptions = {
    chart: {
      type: "candlestick",
    },
    colors: ["#000000", "#008FFB"],
    title: {
      text: titleText,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        seriesName: "Price",
        labels: {
          style: {
            colors: "#000000",
          },
          formatter: function (value) {
            if (typeof value === "number") return value.toFixed(2);
            else return value;
          },
        },
        title: {
          text: "Price",
          style: {
            color: "#000000",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Volume",
        opposite: true,
        labels: {
          style: {
            colors: "#008FFB",
          },
          formatter: function (value) {
            if (typeof value === "number") return value.toFixed(2);
            else return value;
          },
        },
        title: {
          text: "Volume",
          style: {
            color: "#008FFB",
          },
        },
      },
    ],
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
