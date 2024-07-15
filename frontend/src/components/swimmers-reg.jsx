import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import bcrypt from 'bcryptjs';

function Swimmerslogin() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    swimming_style: '',
    best_lap: '',   
    experience: '',   
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
    
      const endpoint = isRegistering ? 'http://localhost:5000/swimmers' : 'http://localhost:5000/swimmers/login';
      const dataToSend = isRegistering ? {
        name: formData.fullName,
        age: formData.age,
        swimming_style: formData.swimming_style,
        best_lap: formData.best_lap,
        experience: formData.experience,      
        password: formData.password
      } : {
        name: formData.fullName,
        password: formData.password
      };

      console.log("Data to Send:", dataToSend); // Debugging line

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
        navigate('/members'); 
      } else {
        console.error('Submission failed');
        const errorData = await response.json();
        setError(errorData.message);
      }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
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
              name="swimming_style"
              placeholder="Swimming style *"
              value={formData.swimming_style}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="best_lap"
              placeholder="Best Lap(seconds) *"
              value={formData.best_lap}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience(years) *"
              value={formData.experience}
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

export default Swimmerslogin;
