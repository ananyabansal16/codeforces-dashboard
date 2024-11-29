import React from 'react';
import { DataTable, Card } from '@shopify/polaris';

const ContestTable = ({ contests }) => {
    const rows = contests.map((contest) => [
        contest.id,
        contest.name,
        contest.type,
        contest.phase,
        new Date(contest.startTimeSeconds * 1000).toLocaleString(),
        `${Math.floor(contest.durationSeconds / 3600)}h ${Math.floor((contest.durationSeconds % 3600) / 60)}m`,
    ]);

    return (
        <Card>
        <DataTable
            columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
            headings={['ID', 'Name', 'Type', 'Phase', 'Start Time', 'Duration']}
            rows={rows}
        />
        </Card>
    );
};

export default ContestTable;
