import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  }, []); // Added empty dependency array to prevent re-fetching on every render

  return (
    <div>
      <div class="my-3 p-3 bg-body rounded shadow">
        <h3 class="border-bottom pb-2 mb-0">{props.heading}</h3>
        {recommendations.map((rec, index) => (

        
        <div class="d-flex text-body-secondary pt-3" key={index}>
          <i class="fa-solid fa-ellipsis-vertical fa-xl me-3 mt-3"></i>
          <p class="pb-3 mb-0 small lh-sm border-bottom">
            <strong class="d-block text-gray-dark">{rec.applianceName}</strong>
            {rec.recommendation}
          </p>
        </div>
        ))}
        <br/>
        <Link to="https://natural-resources.canada.ca/energy-efficiency/energy-star-canada/energy-star-products/list-energy-star-certified-products/13631"><i class="fa-solid fa-circle-question fa-lg me-2" style={{color: "#3F7E44"}}></i>Learn more</Link>
      </div>
      
    </div>
  );
};

export default RecommendationsComponent;
