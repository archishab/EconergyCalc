// RecommendationsComponent.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const RecommendationsComponent = (props) => {
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
        const recommendationList = response.data.recommendations.filter(
          (rec) => rec !== null
        );
        setRecommendations(recommendationList);
        setRecommendationsCount(recommendationList.length);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  });

  return (
    <div>
      <div class="my-3 p-3 bg-body rounded shadow-sm">
        <h4 class="border-bottom pb-2 mb-0">{props.heading}</h4>
        {recommendations.map((rec, index) => {
        return (   
      <div class="d-flex text-body-secondary pt-3" key={index}>
          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div class="d-flex justify-content-between">
              <strong class="text-gray-dark">{rec}</strong>
            </div>
          </div>
        </div>
        );
      })}
      </div>
    </div>
  );
};

export default RecommendationsComponent;
