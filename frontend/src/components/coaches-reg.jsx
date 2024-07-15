import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import bcrypt from 'bcryptjs';

function Coacheslogin() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    experience: '',
    expertise: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const endpoint = isRegistering ? 'http://localhost:5000/coaches' : 'http://localhost:5000/coaches/login';
    const dataToSend = isRegistering ? {
      name: formData.fullName,
      age: formData.age,
      experience: formData.experience,
      expertise: formData.expertise,
      password: formData.password
    } : {
      name: formData.fullName,
      password: formData.password
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        const responseData = {message: "Registration successful"}
        console.log(responseData.message); // Handle success message
        navigate('/coaches'); 
      } else {
        console.error('Submission failed');
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="formm">
        {isRegistering ? (
          <form className="register-formm" method="POST" onSubmit={handleSubmit}>
            <h2><i className="fas fa-lock"></i> Register</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="age"
              placeholder="Age *"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience *"
              value={formData.experience}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="expertise"
              placeholder="Expertise *"
              value={formData.expertise}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className='button'>create</button>
            <p className="message">
              Already registered? <a href="#" onClick={() => setIsRegistering(false)}>Sign In</a>
            </p>
          </form>
        ) : (
          <form className="login-form" method="POST" onSubmit={handleSubmit}>
            <h2><i className="fas fa-lock"></i> Login</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className='button'>login</button>
            <p className="message">
              Not registered? <a href="#" onClick={() => setIsRegistering(true)}>Create an account</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Coacheslogin;
