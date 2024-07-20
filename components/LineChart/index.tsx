"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type SeriesDataItem = {
  x: string;
  y: number;
};

type LineChartProps = {
  seriesData: SeriesDataItem[];
  titleText: string;
  yAxisLabel: string;
};

export default function LineChart({
  seriesData,
  titleText,
  yAxisLabel,
}: LineChartProps) {
  const series = [
    {
      name: "",
      data: seriesData,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: titleText,
      align: "left",
    },
    xaxis: {
      type: "datetime",
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toFixed(2);
        },
      },
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy",
      },
      y: {
        formatter: function (value) {
          return `${value} ${yAxisLabel}`;
        },
      },
    },
  };

  return (
    <div className="w-[80%]">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={450}
        width={"100%"}
      />
    </div>
  );
}
