import { Box, Stack } from "@mui/material";
import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";
import theme from "../theme";
import GameButton from "./gameButton";

const namesData = [
    { name: "Alice", value: 99 },
    { name: "Bob", value: 78 },
    { name: "Charlie", value: 75 },
    { name: "David", value: 85 },
    { name: "Emma", value: 88 },
    { name: "Frank", value: 87 },
    { name: "Grace", value: 99 },
    { name: "Hannah", value: 84 },
    { name: "Isaac", value: 88 },
    { name: "Jack", value: 81 },
];

const Graph: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [currentRound, setCurrentRound] = useState(1);

    useEffect(() => {
        if (!chartRef.current) return;
        const chartInstance = echarts.init(chartRef.current);

        const updateChart = () => {
            const sortedData = [...namesData]
                .sort((a, b) => a.value - b.value);
            
            chartInstance.setOption({
                title: { text: `Round: ${currentRound}`, left: "center" },
                grid: { top: 30, bottom: 40, left: 80, right: 20 },
                xAxis: { 
                    type: "value", 
                    max: 100,
                    axisLine: { lineStyle: { color: "#fff" } }
                },
                yAxis: { 
                    type: "category", 
                    data: sortedData.map((d) => d.name)
                },
                series: [
                    {
                        type: "bar",
                        data: sortedData.map((d) => d.value),
                        itemStyle: { color: theme.palette.primary.main },
                        label: { show: true, position: "right" },
                    },
                ],
            });
        };

        updateChart();
    }, [currentRound]);

    return (
        <Stack spacing={2} alignItems="center">
            <Box ref={chartRef} sx={{ width: "100%", height: 600 }} />

            <GameButton text="Next Round!" onClick={() => setCurrentRound((prev) => prev + 1)} />
        </Stack>
    );
};

export default Graph;
