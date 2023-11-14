// RecommendationsComponent.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const RecommendationsComponent = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsCount, setRecommendationsCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/api/appliances/getrecommendations`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const recommendationList = response.data.recommendations.filter(rec => rec !== null);
        setRecommendations(recommendationList);
        setRecommendationsCount(recommendationList.length);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  });

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Number of Recommendations: {recommendationsCount}</p>

      {recommendations.map((rec, index) => {
        return (
          <ul className="list-group">
            <li
              className="list-group-item"
              key={index}
            >
              {rec}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default RecommendationsComponent;
