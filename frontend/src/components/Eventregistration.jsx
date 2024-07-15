import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"

function EventRegistration() {
  const { eventId } = useParams();
  const navigate = useNavigate(); // Get the navigation function
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    swimming_style: "",
    termsAccepted: false
  });

  useEffect(() => {
    fetch(`http://localhost:5000/events/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setEvent(data))
    .catch(error => console.error('Error fetching event:', error));
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/events/${eventId}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age),
        termsAccepted: formData.termsAccepted,
        event_id: eventId
      })
    })
    .then(response => {
      if (response.ok) {
        console.log("Registration successful");
        setFormData({
          name: "",
          email: "",
          age: "",
          swimming_style: "",
          termsAccepted: false
        });
        navigate('/members');
        alert("Registration successful")
      } else {
        throw new Error('Failed to register');
      }
    })
    .catch(error => console.error('Error registering:', error));
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="event-registration-container">
      <div className="event-details">
        <h1>{event.name}</h1>
        <p>{event.description}</p>
        <p>Fill out the form below to sign up for the {event.name}</p>
      </div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          required
        />

        <label htmlFor="swimming_style">Choose Swimming Style</label>
        <select
          id="swimming_style"
          name="swimming_style"
          value={formData.swimming_style}
          onChange={handleChange}
          required
        >
          <option value="">Select a swimming style</option>
          <option value="freestyle">Freestyle</option>
          <option value="butterfly">Butterfly</option>
          <option value="backstroke">Backstroke</option>
          <option value="breaststroke">Breaststroke</option>
        </select>

        <label className="terms-checkbox">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          /> I agree to the terms and conditions
        </label>

        <button type="submit" className="btn-register">Register</button>
      </form>
    </div>
    <button class="cta">
    <NavLink className="span" to={`/members`}>
                        Go Back
                    </NavLink>
  <svg width="15px" height="10px" viewBox="0 0 13 10">
    <path d="M1,5 L11,5"></path>
    <polyline points="8 1 12 5 8 9"></polyline>
  </svg>
</button>
</>
  );
}

export default EventRegistration;
