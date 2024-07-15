import App from "./App";
import Swimmerslogin from "./components/swimmers-reg";
import Coacheslogin from "./components/coaches-reg";
import Competitiveswimee from "./components/competitiveswimee";
import EventRegistration from "./components/Eventregistration";
import Members from "./components/members";
import About from "./components/About";
import Coaches from "./components/coaches";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/swimmerslogin",
        element: <Swimmerslogin />,
    },
    {
        path: "/coacheslogin",
        element: <Coacheslogin />,
    },
    {
        path: "/competitiveswimee",
        element: <Competitiveswimee />,
    },
    {
        path: "/events/:eventId",
        element: <EventRegistration />,
    },
    {
        path:"/members",
        element: <Members/>
    },
    {
        path:"/about",
        element: <About/>
    },
    {
        path:"/coaches",
        element: <Coaches/>
    }
];

export default routes;
