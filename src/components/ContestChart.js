import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ContestChart = ({ contests }) => {
    const data = contests.map((contest) => ({
        name: contest.name,
        duration: contest.durationSeconds / 3600,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Duration (hours)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="duration" fill="#007ace" />
        </BarChart>
        </ResponsiveContainer>
    );
};

export default ContestChart;
