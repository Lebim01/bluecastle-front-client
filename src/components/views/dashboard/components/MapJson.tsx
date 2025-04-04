"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import useAxios from "@/hooks/useAxios";
import axiosInstance from "@/services";

const MapJson = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchMapData = async () => {
      const response = await fetch("/world.json");
      const worldJson = await response.json();
      const countriesRes = await fetch("https://flagcdn.com/en/codes.json");
      const countriesWithCode = await countriesRes.json();

      const countriesResponse = await axiosInstance.get<Record<string, number>>(
        "countries"
      );
      const countriesData = countriesResponse.data;

      const data = Object.entries(countriesData).map(([code, value]) => ({
        name: countriesWithCode[code.toLowerCase()] || code,
        value: value,
      }));

      echarts.registerMap("USA", worldJson, {
        Alaska: { left: -131, top: 25, width: 15 },
        Hawaii: { left: -110, top: 28, width: 5 },
        "Puerto Rico": { left: -76, top: 26, width: 2 },
      });

      if (chartRef.current) {
        const myChart = echarts.init(chartRef.current);

        const option = {
          title: {
            text: "",
            subtext: "",
            sublink: "",
            left: "right",
          },
          tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            show: true,
          },
          visualMap: {
            left: "right",
            min: 100,
            max: 10000,
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
          toolbox: {
            show: false,
            left: "left",
            top: "top",
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          series: [
            {
              name: "Users by Countries",
              type: "map",
              roam: true,
              map: "USA",
              itemStyle: {
                // normal: {label: {show: true}}
              },
              emphasis: { label: { show: true } },
              data: data,
            },
          ],
        };

        myChart.setOption(option);

        return () => {
          myChart.dispose();
        };
      }
    };

    fetchMapData();
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default MapJson;
