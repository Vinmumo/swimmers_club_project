import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Upcomingevents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/events', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setEvents(data))
    .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <>
    <div className="header">
      <h1 className="h1">Upcoming Events</h1>
      <p className="p text-secondary">
        Check out some of our upcoming events.
      </p>
    </div>

    <section className="events-container">
      {events.slice(0, 3).map((event) => (
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
            <p className="card-text">
              {event.description}
            </p>
            <div>
            <Link to={`/swimmerslogin`} className="btn btn-primary">
            Register
          </Link>
          {/* <Link to={`/events/${event.id}`} className="btn btn-primary">
            Register
          </Link> */}
            </div>
          </div>
        </div>
      ))}
    </section>
  </>
  );
}

export default Upcomingevents;
