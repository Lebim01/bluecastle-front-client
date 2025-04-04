/* eslint-disable import/namespace */
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";
import useCountries from "@/hooks/useCountries";

const MexicoMap = () => {
  const countries = useCountries();
  const chartRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<{
    total: number;
    data: Record<string, number>;
  }>({ total: 0, data: {} });

  const dataWithNames = useMemo(
    () =>
      Object.keys(data.data).map((key) => ({
        name: countries.data
          ? countries.data.find((r: any) => r.value == key)?.label
          : key,
        value: data.data[key],
        country: key,
      })),
    [data.data, countries]
  );

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch("/public/countries.geo.json").then((r) =>
          r.json()
        );
        echarts.registerMap("Mexico", response);

        const newEcharts = echarts.getInstanceByDom(chartRef.current!);
        const myChart = newEcharts || echarts.init(chartRef.current);

        const option: echarts.EChartsOption = {
          height: "100%",
          visualMap: {
            left: "right",
            min: 0,
            max: data.total,
            inRange: {
              color: [
                "#313695",
                "#4575b4",
                "#74add1",
                "#abd9e9",
                "#e0f3f8",
                "#ffffbf",
                "#fee090",
                "#fdae61",
                "#f46d43",
                "#d73027",
                "#a50026",
              ],
            },
            text: ["High", "Low"],
            calculable: true,
          },
          bmap: {
            zoom: 5,
            roam: true,
          },
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              type: "map",
              map: "Mexico",
              scaleLimit: {
                min: 1,
                max: 1,
              },

              roam: false,
              label: {
                show: false,
              },
              data: dataWithNames,
            },
          ],
        };

        myChart.setOption(option as any);

        // Cleanup function to dispose the chart instance
        return () => {
          myChart.dispose();
        };
      } catch (error) {
        console.error("Error fetching the GeoJSON", error);
      }
    };

    fetchGeoJSON();
  }, [dataWithNames, countries]);

  return (
    <div>
      <div
        ref={chartRef}
        className="w-[100%] xl:min-h-[350px] xl:h-full pt-8"
        style={{ width: "100%", minHeight: "350px", height: "100%" }}
      ></div>
    </div>
  );
};

export default MexicoMap;
