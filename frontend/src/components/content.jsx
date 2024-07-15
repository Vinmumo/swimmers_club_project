import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";

// import './Content.css';

function Content() {
  const [swimmers, setSwimmers] = useState([]);
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [currentTable, setCurrentTable] = useState(null);

  useEffect(() => {
    fetchSwimmers();
    fetchEvents();
    fetchTeams();
    fetchTrainingSessions();
    fetchCoaches();
  }, []);

  const fetchSwimmers = () => {
    fetch("http://localhost:5000/swimmers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setSwimmers(data))
      .catch((error) => console.error("Error fetching swimmers:", error));
  };

  const fetchEvents = () => {
    fetch("http://localhost:5000/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  };

  const fetchTeams = () => {
    fetch("http://localhost:5000/teams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  };

  const fetchTrainingSessions = () => {
    fetch("http://localhost:5000/training_sessions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTrainingSessions(data))
      .catch((error) =>
        console.error("Error fetching training sessions:", error)
      );
  };

  const fetchCoaches = () => {
    fetch("http://localhost:5000/coaches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCoaches(data))
      .catch((error) => console.error("Error fetching coaches:", error));
  };

  const renderTable = () => {
    switch (currentTable) {
      case "swimmers":
        return (
          <div className="swimmers-table-container">
            <h2>Swimmers List</h2>
            <table className="swimmers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Swimming Style</th>
                  <th>Best Lap</th>
                </tr>
              </thead>
              <tbody>
                {swimmers.map((swimmer) => (
                  <tr key={swimmer.id}>
                    <td>{swimmer.name}</td>
                    <td>{swimmer.swimming_style}</td>
                    <td>{swimmer.best_lap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "events":
        return (
          <div className="swimmers-table-container">
            <h2>Events List</h2>
            <table className="swimmers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Team ID</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.name}</td>
                    <td>{event.description}</td>
                    <td>{event.team_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "teams":
        return (
          <div className="swimmers-table-container">
            <h2>Teams List</h2>
            <table className="swimmers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.id}</td>
                    <td>{team.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "training_sessions":
        return (
          <div className="swimmers-table-container">
            <h2>Training Sessions List</h2>
            <table className="swimmers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Session Name</th>
                  <th>Date</th>
                  <th>Coach ID</th>
                </tr>
              </thead>
              <tbody>
                {trainingSessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.id}</td>
                    <td>{session.description}</td>
                    <td>{session.date}</td>
                    <td>{session.coach_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "coaches":
        return (
          <div className="swimmers-table-container">
            <h2>Coaches List</h2>
            <table className="swimmers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Expertise</th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((coach) => (
                  <tr key={coach.id}>
                    <td>{coach.name}</td>
                    <td>{coach.age}</td>
                    <td>{coach.expertise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="background2">
        <div className="row">
          <div className="col-6 hero">
            <div>
              <h2 className="h">
                Welcome Swimmers <br /> Your Journey begins here
              </h2>
            </div>
            <div>
              <p className="p text-white">
                We are thrilled to welcome you to our swimming community! We are
                passionate about swimming and dedicated to providing a
                supportive and inclusive environment for all members.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons-container">
        <button className="butt" onClick={() => setCurrentTable("swimmers")}>
          <span class="transition"></span>
          <span class="gradient"></span>
          <span class="label">View swimmers</span>
        </button>
        <button className="butt" onClick={() => setCurrentTable("events")}>
          <span class="transition"></span>
          <span class="gradient"></span>
          <span class="label">View events</span>
        </button>
        <button className="butt" onClick={() => setCurrentTable("teams")}>
          <span class="transition"></span>
          <span class="gradient"></span>
          <span class="label">View teams</span>
        </button>
        <button
          className="butt"
          onClick={() => setCurrentTable("training_sessions")}
        >
          <span class="transition"></span>
          <span class="gradient"></span>
          <span class="label">View Training Sessions</span>
        </button>
        <button className="butt" onClick={() => setCurrentTable("coaches")}>
          <span class="transition"></span>
          <span class="gradient"></span>
          <span class="label">View Coaches</span>
        </button>
      </div>
      {renderTable()}.
      <div className="header">
        <h1 className="h1">Upcoming Events</h1>
        <p className="p text-secondary">
          Check out some of our upcoming events.
        </p>
      </div>
      <section className="events-container">
        {events.map((event) => (
          <div key={event.id} className="card event-card">
            <img
              src={event.image_url}
              className="card-img-top"
              alt={event.name}
            />
            <div className="card-body">
              <div>
                <h4>{event.name}</h4>
              </div>
              <div>
                <p>July 27, 2024 | 10am - 4pm | Aqua Swimmers Club Pool</p>
              </div>
              <p className="card-text">{event.description}</p>
              <div>
                <Link to={`/events/${event.id}`} className="btn btn-primary">
                  Register
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}

export default Content;
