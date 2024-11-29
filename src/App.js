// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
// import { Page, Spinner } from '@shopify/polaris';
// import ContestTable from './components/ContestTable';
// import { fetchContests } from './services/codeforcesService';
// import FilterBar from './components/FilterBar';
// import ContestChart from './components/ContestChart';
import "./styles.css";  // Import the CSS styles

const ContestTable = ({ contests }) => {
  return (
    <div className="table-container">
      <h2 className="table-header">Upcoming Contests</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Contest Name</th>
            <th>Start Time</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, index) => (
            <tr key={index}>
              <td>{contest.name}</td>
              <td>{contest.startTime}</td>
              <td>{contest.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("https://codeforces.com/api/contest.list");
        const data = await response.json();
        setContests(data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contests:", error);
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-header">Codeforces Dashboard</h1>
      {loading ? (
        <div className="spinner" />
      ) : (
        <ContestTable contests={contests} />
      )}
    </div>
  );
};

export default App;
