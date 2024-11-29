import React, { useEffect } from "react";
import { Card, TextField, Select, Pagination, Icon } from "@shopify/polaris";
import { Link } from "react-router-dom";
import { StarIcon } from '@shopify/polaris-icons'; // Import the correct icon
import "./ContestTable.css";

const ContestTable = ({
    contests,
    totalContests,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    currentPage,
    setCurrentPage,
    perPage,
    phaseFilter,
    setPhaseFilter,
    favorites,
    toggleFavorite, // New prop for toggling favorites
}) => {
    useEffect(() => {
        setCurrentPage(1); // Reset page when filters or search are updated
    }, [searchTerm, typeFilter, phaseFilter, setCurrentPage]);

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
    };

    const totalPages = Math.ceil(totalContests / perPage);

    return (
        <Card sectioned>
            {/* Filter Bar */}
            <div className="filter-bar">
                <TextField
                    label="Search by Name"
                    value={searchTerm}
                    onChange={(value) => setSearchTerm(value)}
                    placeholder="Type a contest name..."
                />
                <Select
                    label="Filter by Type"
                    options={[
                        { label: "All", value: "" },
                        { label: "ICPC", value: "ICPC" },
                        { label: "CF", value: "CF" },
                    ]}
                    value={typeFilter}
                    onChange={(value) => setTypeFilter(value)}
                />
                <Select
                    label="Filter by Phase"
                    options={[
                        { label: "All", value: "" },
                        { label: "Finished", value: "FINISHED" },
                        { label: "Before", value: "BEFORE" },
                        { label: "Coding", value: "CODING" },
                    ]}
                    value={phaseFilter}
                    onChange={(value) => setPhaseFilter(value)}
                />
            </div>

            {/* Contest Table */}
            <table className="contest-table">
                <thead>
                    <tr>
                        <th>Favorite</th> {/* Add a Favorite column */}
                        <th>Contest Name</th>
                        <th>Type</th>
                        <th>Phase</th>
                        <th>Duration (Hours)</th>
                    </tr>
                </thead>
                <tbody>
                    {contests.map((contest) => (
                        <tr key={contest.id}>
                            <td>
                                <button
                                    className="favorite-button"
                                    onClick={() => toggleFavorite(contest.id)}
                                >
                                    {/* Display filled or outlined star based on favorites */}
                                    <Icon
                                        source={StarIcon}
                                        className={`star-icon ${favorites.includes(contest.id) ? 'star-filled' : ''}`}
                                        //color={favorites.includes(contest.id) ? 'yellow' : 'base'} // Change color to simulate filled and outlined stars
                                    />
                                </button>
                            </td>
                            <td>
                                <Link to={`/contest/${contest.id}`}>{contest.name}</Link>
                            </td>
                            <td>{contest.type}</td>
                            <td>{contest.phase}</td>
                            <td>{(contest.durationSeconds / 3600).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                <Pagination
                    hasPrevious={currentPage > 1}
                    onPrevious={() => handlePageChange("previous")}
                    hasNext={currentPage * perPage < totalContests}
                    onNext={() => handlePageChange("next")}
                />
                <p className="page-info">
                    Page {currentPage} of {totalPages}
                </p>
            </div>
        </Card>
    );
};

export default ContestTable;
