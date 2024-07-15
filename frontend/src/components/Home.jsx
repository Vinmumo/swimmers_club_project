import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import UpcomingEvents from "./Upcomingevents";
import PastEvents from "./Pastevents";
import Join from "./Join";
import Footer from "./footer";


function Home(){
    return(
        <div>
            <Navbar/>
            <Hero/>
            <UpcomingEvents/>
            <PastEvents/>
            <Join/>
            <Footer/>
        </div>
    )
}
export default Home;