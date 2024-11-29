import React from 'react';
import { TextField, Select } from '@shopify/polaris';

const FilterBar = ({ search, setSearch, type, setType }) => {
    const typeOptions = [
        { label: 'All', value: '' },
        { label: 'ICPC', value: 'ICPC' },
        { label: 'CF', value: 'CF' },
    ];

    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
            label="Search Contests"
            value={search}
            onChange={(value) => setSearch(value)}
            autoComplete="off"
        />
        <Select
            label="Contest Type"
            options={typeOptions}
            value={type}
            onChange={(value) => setType(value)}
        />
        </div>
    );
};

export default FilterBar;
