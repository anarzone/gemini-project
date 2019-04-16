import React from "react";
import { Link } from "react-router-dom";


const ProjectCard = ({ category }) => {
  return (
    <Link to={`/projects/types/${category._id}`} className="myCard">
      <div className="bgOverlay"></div>
      <img
        src={`/assets/images/${category.bannerImage}`}
        alt="Project"
        className="image"
      />
      <div className="header">
        <div className="headerWrapper">
          <span className="headerSubtitle">{category.name.az}</span>
          <span className="headerTitle">{category.name.en}</span>
        </div>
      </div>
    </Link>
  )
};

export default ProjectCard;
