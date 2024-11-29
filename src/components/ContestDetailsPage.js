import React from "react";
import { useParams } from "react-router-dom";

const ContestDetails = ({ contests }) => {
    const { id } = useParams();
    const contest = contests.find((contest) => contest.id.toString() === id);

    if (!contest) {
        return <p>Contest not found!</p>;
    }

    return (
        <div>
        <h2>{contest.name}</h2>
        <p><strong>ID:</strong> {contest.id}</p>
        <p><strong>Type:</strong> {contest.type}</p>
        <p><strong>Phase:</strong> {contest.phase}</p>
        <p>
            <strong>Start Time:</strong>{" "}
            {new Date(contest.startTimeSeconds * 1000).toLocaleString()}
        </p>
        </div>
    );
};

export default ContestDetails;

