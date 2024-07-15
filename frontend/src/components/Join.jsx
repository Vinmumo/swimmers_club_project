import React from "react";
import { Link } from "react-router-dom";

function Join() {
  return (
    <div>
      <div className="header">
        <h1 className="h1">Join Our Club</h1>
        <p className="p text-secondary pjoin ">
          Whether you're a swimmer looking to improve your skills or a coach{" "}
          <br /> eager to share your expertise, we have a place for you at{" "}
          <br /> Aqua Swimmers Club.
        </p>
      </div>
      <div className="row">
        <div className="card join col-6" >
          <div className="card-body">
            <h4 className="card-title">Become a Swimmer</h4>
            
            <p className="p card-text text-secondary mt-4">
            Join our vibrant community of swimmers and take your aquatic skills to the next level. Our experienced coaches will help you reach your goals, whether you're a beginner or a seasoned competitor.
            </p>
            <div>
            <Link to="/swimmerslogin"  type="button" className="btn next re">Register as Swimmer</Link>
            </div>
          </div>
        </div>
        <div className="card join col-6" >
          <div className="card-body">
            <h5 className="card-title">Become a Coach</h5>
            
            <p className="card-text text-secondary mt-4">
            Share your passion for swimming and help shape the next generation of aquatic athletes. Our club is always looking for experienced coaches to join our team and guide our swimmers to success.
            </p>
            <div>
            <Link to="/coacheslogin"  type="button" className="btn next re ">Register as coach</Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default Join;
