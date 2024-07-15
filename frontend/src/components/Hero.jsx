import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'; // Importing ChevronLeft and ChevronRight icons from React Icons
import { Link } from "react-router-dom";

function Hero(){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "https://images.pexels.com/photos/1263425/pexels-photo-1263425.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=600", 
        "https://images.pexels.com/photos/3775158/pexels-photo-3775158.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load", 
        "https://images.pexels.com/photos/2062703/pexels-photo-2062703.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    ];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return(
        <div className="background ">
            <div className="row">
                <div className="col-6 hero">
                    <div >
                        <h2 className="h">Welcome to Aqua Swimmers <br/> Club</h2>
                    </div>
                    <div>
                        <p className="p text-white">Dive into a world of aquatic excellence at our premier swimming club. Offering top-notch facilities, expert coaching, and a vibrant community of swimmers and enthusiasts.</p>
                    </div>
                    <div>
                    <Link to={`/swimmerslogin`} className="btn btn-primary">
            Login
          </Link>
                    </div>
                </div>
                <div className="col-5 gallery">
                    <div className="row">
                        <div className="col-2 gallery-container ">
                            <FaChevronLeft className="slide-icon" onClick={prevImage} />
                            <img src={images[currentImageIndex]} alt="" className="gallery-image" />
                            <FaChevronRight className="slide-icon left" onClick={nextImage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;
