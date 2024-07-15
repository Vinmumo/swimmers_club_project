import { NavLink } from "react-router-dom";
// import Navbar from "./Navbar";

export default function About() {
  return (
    <div className="">
      {/* <Navbar /> */}
      <div className="aboutcontainer">
        <h1 className="aboutus">ABOUT US</h1>
        <div className="aboutCard">
          <p className="paragraph">
            Our club is a place where swimmers of all ages and abilities can
            come together to share their love for the sport, learn new skills,
            and make lifelong friendships. Whether you're a competitive swimmer,
            a recreational swimmer, or just starting out, we have something for
            everyone. <br/>  Our mission is to foster a culture of excellence,
            sportsmanship, and camaraderie among our members. We believe that
            swimming is not just about winning or achieving personal bests, but
            about having fun, staying healthy, and building strong bonds with
            others who share our passion.
          </p>
        </div>
        <NavLink className="goback" to={`/`}>
          Back
        </NavLink>
      </div>
    </div>
  );
}
