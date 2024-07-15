import { useEffect, useState } from "react";

function Pastevents() {
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
    <div className="past">
      <div className="header">
        <h1 className="h1">Past Events</h1>
        <p className="p text-secondary">
          Check out some of our past events and their results.
        </p>
      </div>

      <section className="events-container">
          <div className="card event-card">
            <img
              src="https://wallpapercave.com/wp/wp2046112.jpg"
              className="card-img-top"
              alt="img"
            />
            <div className="card-body">
              <div>
                <h4>Nairobi Annual Swimfest</h4>
              </div>
              <p className="card-text">
                Endurance Competition
              </p>
              <div>
               <p>Alpha Team grabbed both gold and silver medals.Achieving the second fastet lap time in the competitions history</p>
              </div>
            </div>
          </div>
          <div className="card event-card">
            <img
              src="https://wallpapercave.com/wp/wp2046118.jpg"
              className="card-img-top"
              alt="img"
            />
            <div className="card-body">
              <div>
                <h4>Swimmersplash</h4>
              </div>
              <p className="card-text">
                Three day training and competition.
              </p>
              <div>
              <p>Bravo Team emerged victorious in both breaststroke and backstroke races </p>
              </div>
            </div>
          </div>
          <div className="card event-card">
            <img
              src="https://wallpapercave.com/wp/wp2046159.jpg"
              className="card-img-top"
              alt="img"
            />
            <div className="card-body">
              <div>
                <h4>Kitui Annual Swimfest</h4>
              </div>
              <p className="card-text">
                All Styles competition
              </p>
              <div>
              <p>Delta team broke the record for fastest lap time in the competition equalling their own club record </p>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}

export default Pastevents;
