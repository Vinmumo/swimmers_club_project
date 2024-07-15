import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";

function Coachcontent() {
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
    fetch('http://localhost:5000/swimmers', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setSwimmers(data))
    .catch(error => console.error('Error fetching swimmers:', error));
  };

  const fetchEvents = () => {
    fetch('http://localhost:5000/events', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setEvents(data))
    .catch(error => console.error('Error fetching events:', error));
  };

  const fetchTeams = () => {
    fetch('http://localhost:5000/teams', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setTeams(data))
    .catch(error => console.error('Error fetching teams:', error));
  };

  const fetchTrainingSessions = () => {
    fetch('http://localhost:5000/training_sessions', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setTrainingSessions(data))
    .catch(error => console.error('Error fetching training sessions:', error));
  };

  const fetchCoaches = () => {
    fetch('http://localhost:5000/coaches', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setCoaches(data))
    .catch(error => console.error('Error fetching coaches:', error));
  };

  const deleteRecord = (table, id) => {
    fetch(`http://localhost:5000/${table}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      switch(table) {
        case 'swimmers': fetchSwimmers(); break;
        case 'events': fetchEvents(); break;
        case 'teams': fetchTeams(); break;
        case 'training_sessions': fetchTrainingSessions(); break;
        case 'coaches': fetchCoaches(); break;
        default: break;
      }
    })
    .catch(error => console.error(`Error deleting ${table} record:`, error));
  };

  const renderTable = () => {
    switch(currentTable) {
      case 'swimmers':
        return (
          <div className="swimmers-table-container">
            <h2>Swimmers List</h2>
            <table className="swimmers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Swimming Style</th>
                  <th>Best Lap</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {swimmers.map((swimmer) => (
                  <tr key={swimmer.id}>
                    <td>{swimmer.name}</td>
                    <td>{swimmer.swimming_style}</td>
                    <td>{swimmer.best_lap}</td>
                    <td>
                      <button className="del" onClick={() => deleteRecord('swimmers', swimmer.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'events':
        return (
          <div className="swimmers-table-container">
            <h2>Events List</h2>
            <table className="swimmers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Team ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.name}</td>
                    <td>{event.description}</td>
                    <td>{event.team_id}</td>
                    <td>
                      <button className="del" onClick={() => deleteRecord('events', event.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'teams':
        return (
          <div className="swimmers-table-container">
            <h2>Teams List</h2>
            <table className="swimmers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.id}</td>
                    <td>{team.name}</td>
                    <td>
                      <button className="del" onClick={() => deleteRecord('teams', team.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'training_sessions':
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainingSessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.id}</td>
                    <td>{session.description}</td>
                    <td>{session.date}</td>
                    <td>{session.coach_id}</td>
                    <td>
                      <button className="del"  onClick={() => deleteRecord('training_sessions', session.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'coaches':
        return (
          <div className="swimmers-table-container">
            <h2>Coaches List</h2>
            <table className="swimmers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Expertise</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((coach) => (
                  <tr key={coach.id}>
                    <td>{coach.name}</td>
                    <td>{coach.age}</td>
                    <td>{coach.expertise}</td>
                    <td>
                      <button className="del" onClick={() => deleteRecord('coaches', coach.id)}>Delete</button>
                    </td>
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
              <h2 className="h">Hello Coach <br/>Welcome to Aqua Swimming Club</h2>
            </div>
            <div>
              <p className="p text-white">We are thrilled to welcome you to our swimming community! We are passionate about swimming and dedicated to providing a supportive and inclusive environment for all members.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons-container">
        <button className="butt" onClick={() => setCurrentTable('swimmers')}>
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="label">View swimmers</span>
        </button>
        <button className="butt" onClick={() => setCurrentTable('events')}>
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="label">View events</span>
        </button>
        <button className="butt" onClick={() => setCurrentTable('teams')}>
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="label">View teams</span>
        </button>
        <button className="butt" onClick={() => setCurrentTable('training_sessions')}>
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="label">View Training Sessions</span>
        </button>
        <button className="butt" onClick={() => setCurrentTable('coaches')}>
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="label">View Coaches</span>
        </button>
      </div>

      <div className="table-container">
        {renderTable()}
      </div>

      <Footer />
    </>
  );
}

export default Coachcontent;
