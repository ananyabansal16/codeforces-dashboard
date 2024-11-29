import React, { useState, useEffect } from "react";
import ContestTable from "./components/ContestTable";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import "./App.css";

const App = () => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    // Fetch contests from API
    fetch("https://codeforces.com/api/contest.list")
      .then((response) => response.json())
      .then((data) => {
        const validContests = data.result.filter((contest) => contest.phase);
        setContests(validContests);
        setFilteredContests(validContests);
      });
  }, []);

  // Apply filtering dynamically
  useEffect(() => {
    let filtered = contests;

    if (searchTerm) {
      filtered = filtered.filter((contest) =>
        contest.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((contest) => contest.type === typeFilter);
    }

    if (phaseFilter) {
      filtered = filtered.filter((contest) => contest.phase === phaseFilter);
    }

    setFilteredContests(filtered);
  }, [searchTerm, typeFilter, phaseFilter, contests]);

  // Pagination logic
  const paginatedContests = filteredContests.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <AppProvider>
      <div className="app-container">
      <h1 className="heading">Codeforces Contest Listing</h1>
        <ContestTable
          contests={paginatedContests}
          totalContests={filteredContests.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          phaseFilter={phaseFilter}
          setPhaseFilter={setPhaseFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
        />
      </div>
    </AppProvider>
  );
};

export default App;
