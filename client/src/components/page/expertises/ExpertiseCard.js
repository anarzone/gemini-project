import React from "react";
import { Link } from "react-router-dom";


const ExpertiseCard = ({ expertise }) => {
  return (
    <Link to={`/expertises/${expertise._id}`} className="myCard">
      <div className="bgOverlay"></div>
      <img
        src={`/assets/images/${expertise.bannerImage}`}
        alt="Project"
        className="image"
      />
      <div className="header">
        <div className="headerWrapper">
          <span className="headerTitle">{expertise.name.az}</span>
        </div>
      </div>
    </Link>
  )
};

export default ExpertiseCard;
