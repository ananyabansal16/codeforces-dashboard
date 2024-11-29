import React from "react";
import { Card } from "@shopify/polaris";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ContestChart = ({ contests }) => {
    const chartData = contests.map((contest) => ({
        name: contest.name,
        duration: contest.durationSeconds,
    }));

    return (
        <Card title="Contest Duration Visualization">
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="duration" fill="#4caf50" />
            </BarChart>
        </ResponsiveContainer>
        </Card>
    );
};

export default ContestChart;
