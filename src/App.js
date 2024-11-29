import React, { useState, useEffect } from "react";
import ContestTable from "./components/ContestTable";
import ContestDetails from "./components/ContestDetailsPage.js";
import { AppProvider } from "@shopify/polaris";
import { Routes, Route } from "react-router-dom";
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
  const [favorites, setFavorites] = useState([]);

  // Fetch contests from API
  useEffect(() => {
    fetch("https://codeforces.com/api/contest.list")
      .then((response) => response.json())
      .then((data) => {
        const validContests = data.result.filter((contest) => contest.phase);
        setContests(validContests);
        setFilteredContests(validContests);
      });
  }, []);

  // Debounced search functionality
  useEffect(() => {
    const timer = setTimeout(() => {
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
    }, 300); // Debounce delay

    return () => clearTimeout(timer); // Cleanup on search term change
  }, [searchTerm, typeFilter, phaseFilter, contests]);

  // Pagination logic
  const paginatedContests = filteredContests.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Toggle favorite status
  const toggleFavorite = (contestId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(contestId)) {
        return prevFavorites.filter((id) => id !== contestId);
      } else {
        return [...prevFavorites, contestId];
      }
    });
  };

  return (
    <AppProvider>
      <div className="app-container">
        <h1 className="heading">Codeforces Contest Listing</h1>

        <Routes>
          {/* Contest Listing Page */}
          <Route
            path="/"
            element={
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
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          {/* Contest Details Page */}
          <Route
            path="/contest/:id"
            element={<ContestDetails contests={contests} />}
          />
        </Routes>
      </div>
    </AppProvider>
  );
};

export default App;
